exports.errorHandler = (err, req, res, next) => {
  const error = err
    ? err.toString().split("Error: ")[1]
    : "Something went wrong";
  res.status(401).json({ data: "", msg: error });
};
