exports = module.exports = function notFound(req, res, next) {
  res.json(404, { error: new NotFound() });
};
