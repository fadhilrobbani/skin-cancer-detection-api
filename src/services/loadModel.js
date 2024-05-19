const tf = require("@tensorflow/tfjs-node");

const loadModel = async () => tf.loadGraphModel(process.env.MODEL_URL);

module.exports = loadModel;
