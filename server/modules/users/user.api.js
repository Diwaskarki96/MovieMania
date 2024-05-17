const router = require("express").Router();
const {
  registerValidationSchema,
  loginValidationSchema,
  editProfileValidation,
} = require("./user.validation");
const userController = require("./user.controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("./user.model");

router.get("/", (req, res) => {
  res.json({ msg: "Api is working" });
});

router.post("/register", async (req, res, next) => {
  try {
    const userData = req.body;
    const validateDate = await registerValidationSchema.validate(userData);
    const existedUser = await userController.findByEmail({
      email: req.body.email,
    });
    if (existedUser) throw new Error("User existed");
    const result = await userController.register(validateDate);
    res.json({ msg: "User is registered successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const userData = req.body;
    const validateData = await loginValidationSchema.validate(userData);
    const result = await userController.login(validateData);
    const token = await jwt.sign({ email: req.body.email }, "shhhhh");
    res.json({ msg: "Login Successful", data: result, token });
  } catch (e) {
    next(e);
  }
});

router.post("/admin/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Retrieve admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    // Validate admin credentials
    if (email !== adminEmail || password !== adminPassword) {
      throw new Error("Invalid admin credentials");
    }
    // Generate admin token
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ msg: "Admin login successful", role: "admin", token });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/editProfile/:id",
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, "shhhhh");
      const user = await userController.findByEmail({ email: payload.email });
      if (!user) throw new Error("User not found");
      if (user.role !== "user") throw new Error("Unauthorized");
      req.loggedInId = user?._id;

      next();
    } catch (e) {
      next(e);
    }
  },
  async (req, res, next) => {
    try {
      const newData = req.body;
      const validateData = await editProfileValidation.validate(newData);
      const { firstName, lastName, password } = validateData;
      const hashedPassword = await bcrypt.hash(
        password,
        +process.env.SALT_ROUND
      );
      const user = await userModel.findOneAndUpdate(
        req.loggedInId,
        {
          firstName,
          lastName,
          password: hashedPassword,
        },
        { new: true }
      );
      res.json({ message: "Profile updated successfully", user });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
