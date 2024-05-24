const YUP = require("yup");

exports.adminRegisterValidationSchema = YUP.object({
  email: YUP.string()
    .required("Email is required")
    .min(5, "Email must be atleast 5 character ")
    .max(40, "Email must be under 40 charcters")
    .trim()
    .lowercase()
    .email("Invalid Email"),
  password: YUP.string().required("Password is required"),
});

exports.adminLoginValidationSchema = YUP.object({
  email: YUP.string()
    .required("Email is required")
    .min(5, "Email must be atleast 5 character ")
    .max(40, "Email must be under 40 charcters")
    .trim()
    .lowercase()
    .email("Invalid Email"),
  password: YUP.string().required("Password is required"),
});
