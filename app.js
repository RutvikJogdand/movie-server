const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config()

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { movie: null, error: null });
});

app.post('/search', async (req, res) => {
    const movieName = req.body.movieName;
    const apiKey = process.env.MOVIE_KEY;
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const movie = response.data;

        if (movie.Response === 'False') {
            res.render('index', { movie: null, error: 'Movie not found!' });
        } else {
            res.render('index', { movie, error: null });
        }
    } catch (error) {
        res.render('index', { movie: null, error: 'Error, please try again!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
