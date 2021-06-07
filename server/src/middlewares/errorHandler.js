const errorHandler = (err, req, res, next) => {
  console.log("something went wrong", err);
  res.status(400).send({
    message: err.message,
  });
};

module.exports = errorHandler;
