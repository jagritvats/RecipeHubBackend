const mongoose = require('mongoose');

// recipe schema
const recipeSchema = new mongoose.Schema({
	title: {
		type:String,
		required: true,
	},
	level: String,
	ingredients: {
		type: Array,
		default: [],
	},
	cuisine: String,
	dishType: String,
	description: {
		type:String,
		required: true,
	},
	image: String,
	imageSrc: {
		type:String,
		required: true,
	},
	duration: Number,
	author: String,
	isPrivate: {
		type: Boolean,
		default: false,
	},
	category: {
		type: String,
	},
	created: Date,
});


// recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
