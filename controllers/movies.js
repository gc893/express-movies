const Movie = require('../models/movie')

module.exports = {
    new: newMovie,
    create,
    index,
    show
};

function newMovie(req, res ,next) {
    res.render('movies/new', {title: 'New Movie'});
};

function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];}
  Movie.create(req.body)
  .then(movie => {
      console.log(movie);
      res.redirect('/movies');
  })
  .catch( err => {
      console.log(err);
      res.redirect('/movies/new');
  })
}

function index(req, res) {
    Movie.find({}, function (err, movies) {
        res.render('movies/index', {movies, title: 'All Movies'});
    })
}

function show(req, res, next) {
    Movie.findById(req.params.id, function (err, movie) {
        res.render('movies/show', {movie, title: movie.title})
    })
}