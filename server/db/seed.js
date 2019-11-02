/** Create mock data */

const movieTitles = [
  'Squirrel Man',
  'Roht: Korangar',
  'Revengers: Short Battle',
  'Doctor Familiar',
  'Guardians of Wu Dao Kou'
];
const actorFirst = [
  'Jenna',
  'Steve',
  'John',
  'Rainn',
  'Angela',
  'Ed',
  'Mindy',
  'BJ',
  'Brian',
  'Ellie',
  'Phyllis',
  'Leslie',
  'Oscar',
  'Kate',
  'Creed',
  'Paul',
  'Craig',
  'Melora',
  'Rashida'
];
const actorLast = [
  'Fischer',
  'Carell',
  'Krasinski',
  'Wilson',
  'Kinsey',
  'Helms',
  'Kaling',
  'Novak',
  'Baumgartner',
  'Kemper',
  'Smith',
  'Baker',
  'Nunez',
  'Flannery',
  'Bratton',
  'Lieberstein',
  'Robinson',
  'Hardin',
  'Jones'
];
const characterFirst = [
  'Pam',
  'Michael',
  'Jim',
  'Dwight',
  'Angela',
  'Andy',
  'Kelly',
  'Ryan',
  'Kevin',
  'Erin',
  'Phyllis',
  'Stanley',
  'Oscar',
  'Meredith',
  'Creed',
  'Toby',
  'Darryl',
  'Jan',
  'Karen'
];
const characterLast = [
  'Beesly',
  'Scott',
  'Halpert',
  'Schrute',
  'Martin',
  'Bernard',
  'Kapoor',
  'Howard',
  'Malone',
  'Hannon',
  'Vance',
  'Hudson',
  'Martinez',
  'Palmer',
  'Bratton',
  'Flenderson',
  'Philbin',
  'Levison',
  'Filippelli'
];

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let castId = 1;
function Cast() {
  this.castId = castId;
  this.actor = `${actorFirst[getRandomInt(actorFirst.length - 1, 0)]} ${
    actorLast[getRandomInt(actorLast.length - 1, 0)]
  }`;
  this.character = `${
    characterFirst[getRandomInt(characterFirst.length - 1, 0)]
  } ${characterLast[getRandomInt(characterLast.length - 1, 0)]}`;
  this.imageUrl = `https://castphotos.s3-us-west-1.amazonaws.com/${getRandomInt(
    40,
    0
  )}.png`;
  this.role = getRandomInt(3, 1);
  castId += 1;
}

let movieId = 1;
function Movie() {
  this.movieId = movieId;
  this.movieName = movieTitles[getRandomInt(movieTitles.length - 1, 0)];
  this.casts = [];
  movieId += 1;
}

function populateMovieData() {
  const movieData = [];

  for (let i = 0; i < 1000; i += 1) {
    const someMovie = new Movie();
    for (let k = 0; k < getRandomInt(30, 20); k += 1) {
      const someCast = new Cast();
      someMovie.casts.push(someCast);
    }
    movieData.push(someMovie);
  }

  return movieData;
}

/** Seed database */
const movieData = populateMovieData();

const Console = console;
const db = require('./index.js');
const mongoose = require('mongoose');

Console.log('Seed file is running');

db.MovieModel.insertMany(movieData, (err, _docs) => {
  if (err) console.error("can't add movie data -->", err);
  else {
    mongoose.disconnect();
    Console.log('connection closed');
  }
});
