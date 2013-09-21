exports = module.exports = function clientError(err, req, res, next) {
  if (err.status) {
    res.json(err.status, { error: err });
  } else {
    next(err);
  }
};
