const Movie = require('../models/movie')
const Performer = require('../models/performer')

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
      res.redirect(`/movies/${movie._id}`);
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

// function show(req, res, next) {
//     Movie.findById(req.params.id, function (err, movie) {
//         res.render('movies/show', {movie, title: movie.title})
//     })
// }

function show(req, res, next) {
    Movie.findById(req.params.id)
        .populate('cast')
        .then(movie => {
            //accessing all performers for the dropdown
            Performer.find({_id: {$nin: movie.cast}}, function(err, performers) {
                res.render('movies/show', {title: 'Movie Detail', movie, performers})
            })
        })
}