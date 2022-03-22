//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = {
  title: { type: String, unique: true },
  genre: { type: String },
  plot: { type: String },
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
};

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
