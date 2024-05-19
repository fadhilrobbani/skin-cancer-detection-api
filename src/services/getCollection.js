const { Firestore } = require("@google-cloud/firestore");

const getCollection = async () => {
  const db = new Firestore();

  try {
    const predictions = await db.collection("predictions").get();
    return predictions;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

module.exports = getCollection;
