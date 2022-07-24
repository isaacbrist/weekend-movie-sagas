const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});
//get all of the details of the movie
// `SELECT * FROM "movies_genres"
//   JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
//   JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
//   WHERE "movies"."id" = ${movieId};`;
router.get('/:id', (req, res) => {
  movieId = req.params.id;
  console.log('Here is the movieId in router.get', movieId);
  const queryText = `SELECT "movies".title, "movies".poster, "movies".description, ARRAY_AGG("genres".name) AS "genres" FROM "movies"
  JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
  JOIN "genres" ON "movies_genres".genre_id = "genres".id
  WHERE "movies".id = $1
  GROUP BY "movies".title, "movies".poster, "movies".description;`;
  pool
    .query(queryText, [movieId])
    .then((result) => {
      console.log('Here are the rows from the database', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all details', err);
      res.sendStatus(500);
    });
});

//posting a new movie to the database
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
