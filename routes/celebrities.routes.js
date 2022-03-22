const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const celebrities = await Celebrity.find();
  console.log(celebrities);
  res.render("celebrities/celebrities", { celebrities });
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = {
      name,
      occupation,
      catchPhrase,
    };
    Celebrity.create(newCelebrity);
    res.redirect("/celebrities");
  } catch {
    next();
  }
});

module.exports = router;
