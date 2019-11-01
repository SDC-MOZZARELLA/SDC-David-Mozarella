const fs = require('fs');
const faker = require('faker');
const writer = require('csv-write-stream');
const csv = writer();

const generated = 10000000;
let movieIdCounter = 1;
let castIdCounter = -1;

const movieCSV = fs.createWriteStream(
  '/Users/dfuent/Desktop/SDC MODULE/castphotos/movies.csv',
  {
    encoding: 'utf8'
  }
);

const generator = () => {
  (async () => {
    movieCSV.write('movie_id,cast_id, actor, character, image_url, role\n');
    for (var i = 0; i < generated; i++) {
      if (i % 24 === 0) {
        movieIdCounter++;
        castIdCounter = -1;
      }
      castIdCounter++;
      const movie_id = movieIdCounter;
      const cast_id = castIdCounter;
      const actor = faker.name.findName();
      const character = faker.name.findName();
      const image_url = faker.image.imageUrl();
      const role = faker.random.number();
      const movieToWrite = `${movie_id},${cast_id},${actor},${character},${image_url},${role}`;
      if (!movieCSV.write(movieToWrite + '\n', { flag: 'r+' })) {
        await new Promise(resolve => movieCSV.once('drain', resolve));
      }
    }
  })();
};

// const generator = () => {
//   csv.pipe(fs.createWriteStream('generated.csv'));
//   for (var i = 0; i < generated; i++) {
//     // if (i % 23 === 0) {
//     //   movieIdCounter++;
//     //   castIdCounter = -1;
//     // }
//     // castIdCounter++;
//     csv.write({
//       movie_id: movieIdCounter,
//       cast_id: castIdCounter,
//       actor: faker.name.findName(),
//       character: faker.name.findName(),
//       image_url: faker.image.imageUrl(),
//       role: faker.random.number()
//     });
//   }
//   csv.end();
//   console.log('success!');
// };

generator();
