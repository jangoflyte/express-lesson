const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

const movies = [
        {
            "id": 1,
            "title": "Midnight In Paris",
            "runtime": 96,
            "release_year": 2011,
            "director": "Woody Allen",
        },
        {
            "id": 2,
            "title": "Titanic",
            "runtime": 210,
            "release_year": 1997,
            "director": "James Cameron",
        },
        {
            "id": 3,
            "title": "From Paris With Love",
            "runtime": 94,
            "release_year": 2010,
            "director": "Pierre Morel",
        },
   ]

app.get('/movies', (req, res) => {
    let {runtime} = req.query;
    if (runtime !== undefined) {
        console.log(`This the runtime: ${runtime}`);
        let myMovie = movies.filter(movie => {
            console.log(movie.runtime, parseInt(runtime));
            console.log(movie)
            return movie.runtime === parseInt(runtime)
            // if (movie.runtime > 90) {
            //     myMovie.push(movie)
            // } else {
            //     myMovie.push(movie);
            // }
            
        });
        console.log(myMovie)
        res.status(200).send(myMovie);
    } else {
        res.status(200).send(movies);
    }
    
});


app.post('/movies', (req, res) => {
    let myMovie = req.body;
    console.log(myMovie) // Access the body of the request - known as the payload
    
    const {title, runtime, release_year, director} = req.body;
    const newMovie = ({
        id: movies.length + 1,
        title, 
        runtime,
        release_year,
        director
    });
    movies.push(newMovie)
    res.status(201).send(`${title} added to library.`)
});

app.patch('/movies', (req, res) => {
    let foundFlag = false;
    let foundMovie = {};
    movies.forEach(movie => {
        if (movie.id === req.body.id) {
            foundFlag = true;
            movie.title = req.body.title
            foundMovie = movie;
        }
    })
    if (foundFlag) {
        res.status(200).send(foundMovie)
    } else {
        res.status(404).send("Movie not in library.")
    }
    
});

app.put('/movies/:movieId', (req, res) => {
    var { movieId } = req.params;
    console.log(`This is the current id ${movieId}`);

    let movieIndex = movies.findIndex(index => {
        return index.id === parseInt(movieId);
    })

    if (movieIndex < 0) {
        res.status(404).send(`Movie ID ${movieId} not in library`)
    } else {
        let myMovie = req.body;
        movies[movieIndex].title = myMovie.title
        movies[movieIndex].runtime = myMovie.runtime;
        movies[movieIndex].release_year = myMovie.release_year;
        movies[movieIndex].director = myMovie.director;
        res.status(204).send(`${movies[movieIndex]} added to library`)
    }
});

app.get('/movies/:movieId', (req, res) => {
    var {movieId} = req.params;
    console.log(`This is the current id ${movieId}`)
    var myMovie = movies.find(movie => {
        console.log(movie.id, movieId)
        return movie.id === parseInt(movieId);
    })
    console.log(`Here is the movie ${myMovie}`)
    res.status(200).send(myMovie)
})

// app.delete('/movies', (req, res) => {
//     res.send("Resource has been deleted.");
// });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));