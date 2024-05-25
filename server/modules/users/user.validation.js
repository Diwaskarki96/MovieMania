const YUP = require("yup");

exports.registerValidationSchema = YUP.object({
  firstName: YUP.string()
    .required("First Name is required")
    .min(3, "First Name must be atleast 3 character ")
    .max(15, "First Name must be under 15 charcters")
    .trim()
    .lowercase(),
  lastName: YUP.string()
    .required("Last Name is required")
    .min(3, "Last Name must be atleast 3 character ")
    .max(15, "Last Name must be under 15 charcters")
    .trim()
    .lowercase(),
  email: YUP.string()
    .required("Email is required")
    .min(5, "Email must be atleast 5 character ")
    .max(40, "Email must be under 40 charcters")
    .trim()
    .lowercase()
    .email("Invalid Email"),
  password: YUP.string().required("Password is required"),
  role: YUP.string()
    .oneOf(["user", "admin"], "Role must be user or admin")
    .default("user")
    .required("Role is required"),
  profilePicture: YUP.string().nullable(),
});

exports.loginValidationSchema = YUP.object({
  email: YUP.string()
    .required("Email is required")
    .min(5, "Email must be atleast 5 character ")
    .max(40, "Email must be under 40 charcters")
    .trim()
    .lowercase()
    .email("Invalid Email"),
  password: YUP.string().required("Password is required"),
  role: YUP.string()
    .oneOf(["user", "admin"], "Role must be user or admin")
    .default("user"),
  profilePicture: YUP.string().nullable(),
});

exports.editProfileValidation = YUP.object({
  firstName: YUP.string()
    .required("First Name is required")
    .min(3, "First Name must be atleast 3 character ")
    .max(15, "First Name must be under 15 charcters")
    .trim()
    .lowercase(),
  lastName: YUP.string()
    .required("Last Name is required")
    .min(3, "Last Name must be atleast 3 character ")
    .max(15, "Last Name must be under 15 charcters")
    .trim()
    .lowercase(),
  profilePicture: YUP.string().nullable(),
});

exports.changePasswordValidation = YUP.object({
  oldPassword: YUP.string().required("Old Password is required"),
  newPassword: YUP.string().required("New Password is required"),
});
