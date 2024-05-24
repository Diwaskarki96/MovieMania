const adminModel = require("./admin.model");
const bcrypt = require("bcryptjs");
const register = async (payload) => {
  const salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
  payload.password = await bcrypt.hash(payload.password, salt);
  return await adminModel.create(payload);
};
const findByEmail = async ({ email }) => {
  return await adminModel.findOne({ email });
};
const login = async ({ email, password }) => {
  const user = await adminModel.findOne({ email });
  if (!user) throw new Error("User not Found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Credentials");
  return user;
};
const editProfile = async () => {};

const findById = async ({ id }) => {
  return await adminModel.findById({ _id: id });
};
module.exports = { login, register, findByEmail, findById };
