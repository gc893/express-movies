const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Performer = require('../models/performer')

const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}
}, {
    timestamps: true
});

const movieSchema = new Schema({
    title: String,
    releaseYear: {type:Number, default:function() {
                    return new Date().getFullYear();
                    },
                min: 1927},
    mpaaRating: {type: String, enum: ['G','PG','PG-13', 'R']},
    nowShowing: {type: Boolean, default: false},
    reviews: [reviewSchema],
    cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);