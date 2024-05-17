const movieModel = require("./movie.model");

const add = async (payload) => {
  return await movieModel.create(payload);
};
const findId = async ({ id }) => {
  return await movieModel.findById({ _id: id });
};
const updateById = async (id, payload) => {
  return await movieModel.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const remove = async ({ id }) => {
  return await movieModel.deleteOne({ _id: id });
};
module.exports = { add, findId, updateById, remove };
