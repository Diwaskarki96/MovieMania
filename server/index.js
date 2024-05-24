require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./modules/users/user.api");
const movieRouter = require("./modules/movies/movie.api");
const adminRouter = require("./modules/Admin/admin.api");
const { errorHandler } = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is connected...");
});

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/admin", adminRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
