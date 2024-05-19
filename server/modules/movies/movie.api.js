const router = require("express").Router();
const isValidMongoId = require("../../middleware/validateMongoID");
const movieController = require("./movie.controller");
const movieModel = require("./movie.model");

const movieValidationSchema = require("./movie.validation");

router.get("/", async (req, res, next) => {
  try {
    res.json({ msg: "movie api is working" });
  } catch (e) {
    next(e);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const newData = req.body;
    const validateData = await movieValidationSchema.validate(newData);
    const role = validateData.role;
    if (role === "user") throw new Error("Admin is needed");
    const movieDetail = await movieController.add(validateData);
    res.json({ msg: "Movie is added successfully", data: movieDetail });
  } catch (e) {
    next(e);
  }
});

router.post("/list/user", async (req, res, next) => {
  try {
    const { page, limit } = req.body;
    const skip = (page - 1) * limit;
    let match = {};
    const movies = await movieModel.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },

      {
        $project: {
          title: 1,
          genre: 1,
          cast: 1,
          director: 1,
          rating: 1,
          description: 1,
          releaseDate: 1,
          image: 1,
        },
      },
    ]);
    const totalMovie = await movieModel.find(match).countDocuments();
    const totalPage = Math.ceil(totalMovie / limit);
    res.json({ msg: "success", movieDetail: movies, totalPage });
  } catch (e) {
    next(e);
  }
});
router.get("/details/:id", isValidMongoId, async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await movieController.findId({ id: movieId });
    if (!movie) throw new Error("No Product Found");
    res.json({ msg: "Success", movieDetail: movie });
  } catch (e) {
    next(e);
  }
});
//------edut movie detail---------//
router.put("/edit/:id", isValidMongoId, async (req, res, next) => {
  try {
    const newData = req.body;
    const validateData = await movieValidationSchema.validate(newData);
    const movieId = req.params.id;
    const role = validateData.role;
    if (role === "user") throw new Error("Admin is needed");
    const movieDetail = await movieController.updateById(
      movieId,
      validateData,
      {
        new: true,
      }
    );
    res.json({ msg: "Movie is edited successfully", data: movieDetail });
  } catch (e) {
    next(e);
  }
});

//-------------delete movie--------------//
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await movieController.findId({ id: movieId });
    if (!movie) throw new Error("Movie Not Found");
    const result = await movieController.remove({ id: movieId });
    res.json({ msg: "Movie is deleted successfully", data: result });
  } catch (e) {
    next(e);
  }
});
// TODO:,search,filter,proper admin,confirm password (while changing password)
module.exports = router;
