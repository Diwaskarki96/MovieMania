const mongoose = require("mongoose");

const isValidMongoId = (req, res, next) => {
  try {
    const id = req.params.id;
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new Error("Invalid mongo Id");
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isValidMongoId;
