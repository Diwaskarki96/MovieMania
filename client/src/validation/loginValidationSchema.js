import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .min(5, "Email must be atleast 5 character ")
    .max(40, "Email must be under 40 charcters")
    .trim()
    .lowercase()
    .email("Invalid Email"),
  password: Yup.string().required("Password is required"),
});
