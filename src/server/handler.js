const predictClassification = require("../services/inference");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const getCollection = require("../services/getCollection");

const getHistories = async (request, h) => {
  const predictions = await getCollection();
  return h.response({
    status: "success",
    data: predictions.docs.map((doc) => doc.data()),
  });
};

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(
    model,
    image
  );

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };
  await storeData(id, data);

  const response = h.response({
    status: "success",
    message:
      confidenceScore > 99
        ? "Model is predicted successfully."
        : "Model is predicted successfully but under threshold. Please use the correct picture",
    data,
  });
  response.code(201);
  return response;
};
module.exports = { getHistories, postPredictHandler };
