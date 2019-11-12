const fs = require('fs');
const faker = require('faker');

const generated = 10000000;
let movieIdCounter = 0;
let castIdCounter = -1;

// const movieCSV = fs.createWriteStream(
//   '/Users/dfuent/Desktop/SDC MODULE/castphotos/movies.csv',
//   {
//     encoding: 'utf8'
//   }
// );

// POSTGRESQL REFACTORS FOR DATA-GEN
// const movieTable = fs.createWriteStream(
//   '/Users/dfuent/Desktop/SDC MODULE/castphotos/moviesTable.csv',
//   {
//     encoding: 'utf8'
//   }
// );

const castsTable = fs.createWriteStream(
  '/Users/dfuent/Desktop/SDC MODULE/castphotos/castsTable.csv',
  {
    encoding: 'utf8'
  }
);

// const junctionTable = fs.createWriteStream(
//   '/Users/dfuent/Desktop/SDC MODULE/castphotos/junctionTable.csv',
//   {
//     encoding: 'utf8'
//   }
// );

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generator = () => {
  (async () => {
    movieCSV.write('movie_id,cast_id,actor,character,image_url,role\n');
    for (var i = 0; i < generated; i += 1) {
      if (i % 24 === 0) {
        movieIdCounter += 1;
        castIdCounter = -1;
      }
      castIdCounter++;
      const movie_id = movieIdCounter;
      const cast_id = castIdCounter;
      const actor = faker.name.findName();
      const character = faker.name.findName();
      const image_url = faker.image.imageUrl();
      const role = getRandomInt(3, 1);
      const movieToWrite = `${movie_id},${cast_id},${actor},${character},${image_url},${role}`;
      if (!movieCSV.write(movieToWrite + '\n', { flag: 'r+' })) {
        await new Promise(resolve => movieCSV.once('drain', resolve));
      }
    }
  })();
};

const movieTableGen = () => {
  (async () => {
    movieTable.write('movie_id,character_id,character\n');
    for (var i = 0; i < generated; i += 1) {
      if (i % 24 === 0) {
        movieIdCounter += 1;
      }
      const movie_id = movieIdCounter;
      const character_id = i;
      const character = faker.name.findName();
      const movieToWrite = `${movie_id},${character_id},${character}`;
      if (!movieTable.write(movieToWrite + '\n', { flag: 'r+' })) {
        await new Promise(resolve => movieTable.once('drain', resolve));
      }
    }
  })();
};

const castTableGen = () => {
  (async () => {
    castsTable.write('actor_id,image_url,actor,role\n');
    for (var i = 0; i < 416668; i += 1) {
      const actor_id = i;
      const image_url = faker.image.imageUrl();
      const actor = faker.name.findName();
      const role = getRandomInt(3, 1);
      const movieToWrite = `${actor_id},${image_url},${actor},${role}`;
      if (!castsTable.write(movieToWrite + '\n', { flag: 'r+' })) {
        await new Promise(resolve => castsTable.once('drain', resolve));
      }
    }
  })();
};

const junctionTableGen = () => {
  (async () => {
    junctionTable.write('character_id,actor_id\n');
    for (var i = 0; i < generated; i += 1) {
      const character_id = i;
      const actor_id = faker.random.number({ min: 0, max: 416667 });
      const movieToWrite = `${character_id},${actor_id}`;
      if (!junctionTable.write(movieToWrite + '\n', { flag: 'r+' })) {
        await new Promise(resolve => junctionTable.once('drain', resolve));
      }
    }
  })();
};

// generator();
// movieTableGen();
castTableGen();
// junctionTableGen();
