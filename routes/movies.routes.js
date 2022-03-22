// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", { movie });
  } catch {
    next();
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch {
    next();
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { title, plot, genre, cast } = req.body;
    const newMovie = {
      title,
      plot,
      genre,
      cast,
    };
    await Movie.create(newMovie);

    res.redirect("/movies");
  } catch {
    next();
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.render("movies/edit-movie", { movie, celebrities });
  } catch {
    next();
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, plot, genre, cast } = req.body;
    const newMovie = {
      title,
      plot,
      genre,
      cast,
    };
    await Movie.findByIdAndUpdate(id, newMovie);
    res.redirect(`/movies/${id}`);
  } catch {
    next();
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch {
    next();
  }
});

module.exports = router;
