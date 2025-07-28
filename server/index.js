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
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

mongoose.connect(DB_URL).then(() => {
  console.log("Database is connected...");
});

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.json({ msg: "Api is working" });
});
app.use(errorHandler);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my project",
    },
  },
  apis: ["./modules/users/user.api.js"], // adjust path(s) where you want to add swagger comments
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
