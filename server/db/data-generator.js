const fs = require('fs');
const faker = require('faker');

const generated = 10000000;
let movieIdCounter = 0;
let castIdCounter = -1;

const movieCSV = fs.createWriteStream(
  '/Users/dfuent/Desktop/SDC MODULE/castphotos/movies.csv',
  {
    encoding: 'utf8'
  }
);

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

generator();
