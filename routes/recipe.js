const router = require('express').Router();
const Recipe = require('../models/recipe');

router.get('/', async (req, res) => {
	const recipes = await Recipe.find({isPrivate:false});
	res.json(recipes);
});

// get recipes where the user is author
router.get('/author/:author/private', async (req, res) => {
	
	const recipes = await Recipe.find({ author: req.params.author, isPrivate:true });
	res.json(recipes);
});

// get non private recipes where user is the author 
router.get('/author/:author/public', async (req, res) => {
	const recipes = await Recipe.find({ author: req.params.author, isPrivate: false });
	res.json(recipes);
});


router.post('/', async (req, res) => {
	// validate
	if (!req.body.title || !req.body.description || !req.body.imageSrc || !req.body.author) {
		return res.status(400).json({msg:'Fields are required'});
	}

	const recipe = new Recipe({
		title: req.body.title,
		level: req.body.level,
		ingredients: req.body.ingredients,
		isPrivate: req.body.isPrivate,
		cuisine: req.body.cuisine,
		dishType: req.body.dishType,
		description: req.body.description,
		image: req.body.image,
		imageSrc: req.body.imageSrc,
		duration: req.body.duration,
		author: req.body.author,
		created: req.body.created,
	});
	const newrecipe = await recipe.save();
	res.status(201).json(newrecipe);
});

// get a specific recipe

router.get('/:id', async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({
			success: false,
			messsage: 'Provide Recipe ID',
		});
	}
	const rec = await Recipe.findOne({ _id: req.params.id });

	res.json(rec);
});

// delete a recipe by id
router.delete('/:id', async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({
			success: false,
			messsage: 'Provide Recipe ID',
		});
	}
	try {
		console.log('deleting ', req.params.id);
		await Recipe.findByIdAndDelete(req.params.id);
	} catch (err) {
		res.status(500).json({ success: false, message: JSON.stringify(err) });
	}

	res.status(204).json({
		success: true,
		message: 'Deleted Successfully',
	});
});

module.exports = router;
