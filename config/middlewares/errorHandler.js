exports = module.exports = function errorHandler(err, req, res, next) {
  res.json(500, { status: 500, message: err.message || err });
};
