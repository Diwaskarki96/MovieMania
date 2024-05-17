const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, min: 3, maxlength: 60 },
    genre: {
      type: String,
      tim: true,
      enum: [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Sci-Fi",
        "Thriller",
        "Other",
      ],
      required: true,
    },
    cast: { type: String, required: true, min: 5, maxlength: 1000 },
    director: { type: String, required: true, min: 5, maxlength: 20 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    description: { type: String, required: true, min: 5, maxlength: 1000 },
    image: { type: String, required: false, default: null },
    releaseDate: { type: Number, required: false },
    trailer: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      trim: true,
      default: "user",
    },
  },

  {
    timestamps: true,
  }
);
const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel;
