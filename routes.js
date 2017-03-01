const express = require('express');
const router = express.Router();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/db.json', {
  storage: fileAsync
});

// nodemon app.js (type in command line to start local server)

// READ ALL MOVIES
router.get('/movies', (req, res) => {
  const movies = db.get('movies')
  res.send(movies)
})

// READ ONE BY ID
router.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id)
  const movie = db.get('movies').find({id: movieId})
  res.send(movie)
})

// READ ONE BY TITLE
router.get('/movies/:title', (req, res) => {
  const movieTitle = req.params.title
  const movie = db.get('movies').find({title: movieTitle})
  res.send(movie)
})

// READ ONE BY DIRECTOR
router.get('/movies/:director', (req, res) => {
  const movieDirector = req.params.director
  const movie = db.get('movies').find({director: movieDirector})
  res.send(movie)
})

// READ ONE BY YEAR
router.get('/movies/:year', (req, res) => {
  const movieYear = parseInt(req.params.year)
  const movie = db.get('movies').find({year: movieYear})
  res.send(movie)
})


// READ ONE BY RATING
router.get('/movies/:rating', (req, res) => {
  const movieRating = parseInt(req.params.rating)
  const movie = db.get('movies').find({year: movieRating})
  res.send(movie)
})

// CREATE NEW MOVIE
router.post('/movies', (req, res) => {
  console.log(req.body);
  db.get('movies')
    .push(req.body)
    .write()
    .then(newMovie => {
      res.status(201).send(newMovie)
    })
    .catch(err => {
      console.log(err);
    })
})


// UPDATE ONE BY TITLE
router.put('/movies/:title', (req, res) => {
  console.log(req.params);
  const movieTitle = req.params.title
  db.get('movies')
    .find({title: movieTitle})
    .assign(req.body)
    .write()
    .then(updatedMovie => {
      res.status(200).send(updatedMovie)
    })
    .catch(err => {
      console.log(err);
    })
})


// DESTROY ONE
router.delete('/movies/:title', (req, res) => {
  console.log(req.params.title);
  const movieTitle = req.params.title
  db.get('movies')
  .remove({title: movieTitle})
  .write()
  .then(deletedMovie => {
    res.status(204).send()
  })
  .catch(err => {
    console.log(err);
  })
})

// http localhost:3000/movies
// http localhost:3000/movies/1   <= number equals the id of the movie
// http POST localhost:3000/movies id:=3 name='Max' breed='???' age:=3
// http PUT localhost:3000/movies/1 name='Lord Cyrus of Puppington' breed='Mutt' age:=4
// http DELETE localhost:3000/movies/2

module.exports = router;
