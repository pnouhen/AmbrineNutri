const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    date: {type: Date, required: true},
    name:{type: String, required: true},
    comment:{type: String, required: true},
    rating:{type: Number, required: true}
})

module.exports = mongoose.model('Review', reviewSchema)
