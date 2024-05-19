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
    const probability = score[0];
    const confidenceScore = probability * 100;

    const classes = ["Cancer", "Non-cancer"];
    const label = probability > 0.5 ? classes[0] : classes[1];
    let suggestion;

    if (label === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    }

    if (label === "Non-cancer") {
      suggestion =
        "Terdeteksi sebagai bukan kanker. Selamat! Anda dapat melakukan kegiatan sehari-hari seperti berolahraga.";
    }
    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
};

module.exports = predictClassification;
