const express = require('express');
require('dotenv').config();

const cors = require('cors');
const { connectDB } = require('./models');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Server root');
});

connectDB();

app.use('/api/recipes', require('./routes/recipe'));

app.listen(5000, () => {
	console.log('Server is running on port 5000');
});
