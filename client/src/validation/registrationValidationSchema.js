import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be atleast 3 character ")
    .max(15, "First Name must be under 15 charcters")
    .trim()
    .lowercase(),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be atleast 3 character ")
    .max(15, "Last Name must be under 15 charcters")
    .trim()
    .lowercase(),
  email: Yup.string()
    .required("Email is required")
    .min(5, "Email must be atleast 5 character ")
    .max(40, "Email must be under 40 charcters")
    .trim()
    .lowercase()
    .email("Invalid Email"),
  password: Yup.string().required("Password is required"),
});
