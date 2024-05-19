const { Firestore } = require("@google-cloud/firestore");

const storeData = async (id, data) => {
  const db = new Firestore();

  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);
};

module.exports = storeData;
