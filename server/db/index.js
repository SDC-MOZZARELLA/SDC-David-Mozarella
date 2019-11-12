require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => console.error(err));

const MovieSchema = new mongoose.Schema({
  movieId: { type: Number, unique: false },
  movieName: String,
  casts: Array
});

const MovieModel = mongoose.model('Movie', MovieSchema);

const getCasts = movieId => MovieModel.find({ movieId }).exec();

const getMovies = () => {
  MovieModel.find({}).exec();
};

const deleteMovie = data => {
  let movieId = Number(data);
  MovieModel.find({ movieId: movieId })
    .remove()
    .exec();
};

const modifyMovie = data => {
  let movieId = Number(data.id);
  MovieModel.findOneAndUpdate(
    { movieId: movieId },
    { $set: { movieName: data.movieName } },
    { upsert: true },
    (err, doc) => {
      if (err) {
        return console.error(err);
      } else {
        console.log('updated!');
      }
    }
  );
};

const saveMovie = data => {
  let movie = new MovieModel({
    movieId: data.movieId,
    movieName: data.movieName,
    casts: data.casts
  });

  movie.save((err, movie) => {
    if (err) {
      return console.error(err);
    } else {
      console.log('saved to collection!');
    }
  });
};

module.exports = {
  getCasts,
  MovieModel,
  getMovies,
  saveMovie,
  deleteMovie,
  modifyMovie
};
