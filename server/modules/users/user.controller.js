const userModel = require("./user.model");
const bcrypt = require("bcryptjs");
const register = async (payload) => {
  const salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
  payload.password = await bcrypt.hash(payload.password, salt);
  return await userModel.create(payload);
};
const findByEmail = async ({ email }) => {
  return await userModel.findOne({ email });
};
const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not Found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Credentials");
  return user;
};
const editProfile = async () => {};
module.exports = { login, register, findByEmail };
