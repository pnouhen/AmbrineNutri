const moongose = require('mongoose')

const recipeSchema = new moongose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    vegetarien: {type: String, required: true},
    categorie: {type: Object, required: true},
    duration: {type: String, required: true},
    ingredients: {type: Array, required: true},
    ustensils: {type: Array, required: true},
})

module.exports = moongose.model('Recipe', recipeSchema)