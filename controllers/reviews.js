const Movie = require('../models/movie')

module.exports = {
    review
}

function review(req, res) {
    Movie.findById(req.params.id, function(err, movie){
        movie.reviews.push(req.body);
        movie.save(function(err){
            res.redirect(`/movies/${req.params.id}`)
        })
    })
}