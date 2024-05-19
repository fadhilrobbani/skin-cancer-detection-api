const predictClassification = require("../services/inference");
const crypto = require("crypto");

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
    confidenceScore: confidenceScore,
    createdAt: createdAt,
  };

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
module.exports = postPredictHandler;
