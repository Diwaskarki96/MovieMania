import * as Yup from "yup";

const movieValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(60, "Title must be under 60 characters"),
  genre: Yup.string()
    .required("Genre is required")
    .trim()
    .oneOf(
      ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Thriller", "Other"],
      "Invalid genre"
    ),
  cast: Yup.string()
    .required("Cast is required")
    .min(5, "Cast must be at least 5 characters")
    .max(1000, "Cast must be under 1000 characters"),
  director: Yup.string()
    .required("Director is required")
    .min(5, "Director must be at least 5 characters")
    .max(20, "Director must be under 20 characters"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description must be under 1000 characters"),
  image: Yup.string().nullable(),
  releaseDate: Yup.number().nullable(),
  trailer: Yup.string().nullable(),
  role: Yup.string()
    .oneOf(["user", "admin"], "Role must be user or admin")
    .default("user"),
});

export default movieValidationSchema;
