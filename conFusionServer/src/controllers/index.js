function index(req, res, next) {
  res.render('index', { title: 'Express' });
  return next();
}

module.exports = { index };
