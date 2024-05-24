const {
  adminRegisterValidationSchema,
  adminLoginValidationSchema,
} = require("./admin.validation");

const router = require("express").Router();
const adminController = require("../Admin/admin.controller");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const userData = req.body;
    const validateDate = await adminRegisterValidationSchema.validate(userData);
    const existedUser = await adminController.findByEmail({
      email: req.body.email,
    });
    if (existedUser) throw new Error("User existed");
    const result = await adminController.register(validateDate);
    res.json({ msg: "Admin is registered successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const userData = req.body;
    const validateData = await adminLoginValidationSchema.validate(userData);
    const result = await adminController.login(validateData);
    const token = await jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_DURATION,
      }
    );
    res.json({ msg: "Admin Login Successful", data: result, token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
