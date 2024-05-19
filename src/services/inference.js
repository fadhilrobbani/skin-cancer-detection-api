const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

const predictClassification = async (model, image) => {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = await model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ["Cancer", "Non-cancer"];
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let suggestion;

    if (label === "Cancer") {
      suggestion =
        "Terdeteksi sebagai kanker. Segera konsultasi dengan dokter terdekat untuk meminimalisasi penyebaran kanker.";
    }

    if (label === "Non-cancer") {
      suggestion =
        "Terdeteksi sebagai bukan kanker. Selamat! Anda dapat melakukan kegiatan sehari-hari seperti berolahraga.";
    }
    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
};

module.exports = predictClassification;
