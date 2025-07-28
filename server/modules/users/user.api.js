// const router = require("express").Router();
// const {
//   registerValidationSchema,
//   loginValidationSchema,
//   editProfileValidation,
//   changePasswordValidation,
// } = require("./user.validation");
// const userController = require("./user.controller");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const userModel = require("./user.model");
// const isValidMongoId = require("../../middleware/validateMongoID");

// // router.get("/", (req, res) => {
// //   res.json({ msg: "Api is working" });
// // });

// router.post("/register", async (req, res, next) => {
//   try {
//     const userData = req.body;
//     const validateDate = await registerValidationSchema.validate(userData);
//     const existedUser = await userController.findByEmail({
//       email: req.body.email,
//     });
//     if (existedUser) throw new Error("User existed");
//     const result = await userController.register(validateDate);
//     res.json({ msg: "User is registered successfully", data: result });
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("/login", async (req, res, next) => {
//   try {
//     const userData = req.body;
//     const validateData = await loginValidationSchema.validate(userData);
//     const result = await userController.login(validateData);
//     const token = await jwt.sign(
//       { email: req.body.email },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_DURATION,
//       }
//     );
//     res.json({ msg: "Login Successful", data: result, token });
//   } catch (e) {
//     next(e);
//   }
// });
// //-----------admin login------------//
// // router.post("/admin/login", async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;
// //     // Retrieve admin credentials from environment variables
// //     const adminEmail = process.env.ADMIN_EMAIL;
// //     const adminPassword = process.env.ADMIN_PASSWORD;
// //     // Validate admin credentials
// //     if (email !== adminEmail || password !== adminPassword) {
// //       throw new Error("Invalid admin credentials");
// //     }
// //     // Generate admin token
// //     const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });
// //     res.json({ msg: "Admin login successful", role: "admin", token });
// //   } catch (e) {
// //     next(e);
// //   }
// // });
// //----------------edit user profile(first name, last name and profile picture )----------------//
// router.put(
//   "/editProfile/:id",
//   async (req, res, next) => {
//     try {
//       const authorization = req.headers.authorization;
//       const splittedValue = authorization?.split(" ");
//       const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
//       if (!token) throw new Error("Unauthorized");
//       const payload = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await userController.findByEmail({ email: payload.email });
//       if (!user) throw new Error("User not found");
//       if (user.role !== "user") throw new Error("Unauthorized");
//       req.loggedInId = user?._id;

//       next();
//     } catch (e) {
//       next(e);
//     }
//   },
//   async (req, res, next) => {
//     try {
//       const newData = req.body;
//       const validateData = await editProfileValidation.validate(newData);
//       const { firstName, lastName, profilePicture } = validateData;
//       // const hashedPassword = await bcrypt.hash(
//       //   password,
//       //   +process.env.SALT_ROUND
//       // );
//       const user = await userModel.findOneAndUpdate(
//         req.loggedInId,
//         {
//           firstName,
//           lastName,
//           profilePicture,
//         },
//         { new: true }
//       );
//       res.json({ message: "Profile updated successfully", user });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
// //-----------change password---------//
// router.put(
//   "/changePassword/:id",
//   isValidMongoId,
//   async (req, res, next) => {
//     try {
//       const authorization = req.headers.authorization;
//       const splittedValue = authorization?.split(" ");
//       const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
//       if (!token) throw new Error("Unauthorized");
//       const payload = jwt.verify(token, "shhhhh");
//       const user = await userController.findByEmail({ email: payload.email });
//       if (!user) throw new Error("User not found");
//       if (user.role !== "user") throw new Error("Unauthorized");
//       req.loggedInId = user?._id;

//       next();
//     } catch (e) {
//       next(e);
//     }
//   },
//   async (req, res, next) => {
//     try {
//       const { oldPassword, newPassword } = req.body;
//       const validateData = await changePasswordValidation.validate({
//         oldPassword,
//         newPassword,
//       });
//       const user = await userController.changePassword(
//         req.loggedInId,
//         oldPassword,
//         newPassword
//       );
//       res.json({ message: "Password is changed successfully", data: user });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
// //--------find user by id-----------//
// router.post(
//   "/user-detail/:id",
//   isValidMongoId,
//   async (req, res, next) => {
//     try {
//       const authorization = req.headers.authorization;
//       const splittedValue = authorization?.split(" ");
//       const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
//       if (!token) throw new Error("Unauthorized");
//       const payload = jwt.verify(token, "shhhhh");
//       const user = await userController.findByEmail({ email: payload.email });
//       if (!user) throw new Error("User not found");
//       if (user.role !== "user") throw new Error("Unauthorized");
//       req.loggedInId = user?._id;

//       next();
//     } catch (e) {
//       next(e);
//     }
//   },
//   async (req, res, next) => {
//     try {
//       const user = await userController.findById({ id: req.loggedInId });
//       if (!user) throw new Error("User not found");
//       res.json({ msg: "Success", data: user });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
// module.exports = router;
const router = require("express").Router();
const {
  registerValidationSchema,
  loginValidationSchema,
  editProfileValidation,
  changePasswordValidation,
} = require("./user.validation");
const userController = require("./user.controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("./user.model");
const isValidMongoId = require("../../middleware/validateMongoID");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user exists
 */
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

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful with token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res, next) => {
  try {
    const userData = req.body;
    const validateData = await loginValidationSchema.validate(userData);
    const result = await userController.login(validateData);
    const token = await jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_DURATION,
      }
    );
    res.json({ msg: "Login Successful", data: result, token });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /user/editProfile/{id}:
 *   put:
 *     summary: Edit user profile (first name, last name, profile picture)
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Profile fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/editProfile/:id",
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
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
      const { firstName, lastName, profilePicture } = validateData;
      const user = await userModel.findOneAndUpdate(
        req.loggedInId,
        {
          firstName,
          lastName,
          profilePicture,
        },
        { new: true }
      );
      res.json({ message: "Profile updated successfully", user });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @swagger
 * /user/changePassword/{id}:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Old and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/changePassword/:id",
  isValidMongoId,
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
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
      const { oldPassword, newPassword } = req.body;
      const validateData = await changePasswordValidation.validate({
        oldPassword,
        newPassword,
      });
      const user = await userController.changePassword(
        req.loggedInId,
        oldPassword,
        newPassword
      );
      res.json({ message: "Password is changed successfully", data: user });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @swagger
 * /user/user-detail/{id}:
 *   post:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/user-detail/:id",
  isValidMongoId,
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
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
      const user = await userController.findById({ id: req.loggedInId });
      if (!user) throw new Error("User not found");
      res.json({ msg: "Success", data: user });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
