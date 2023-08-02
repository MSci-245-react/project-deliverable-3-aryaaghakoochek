// import mysql from 'mysql';
// import config from './config.js';
// import fetch from 'node-fetch';
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import bodyParser from 'body-parser';
// import { error } from 'console';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const port = process.env.PORT || 5000;
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.static(path.join(__dirname, "client/build")));

// app.post('/api/loadUserSettings', (req, res) => {
//     let connection = mysql.createConnection(config);
//     let userID = req.body.userID;

//     let sql = `SELECT mode FROM user WHERE userID = ?`;
//     let data = [userID];

//     connection.query(sql, data, (error, results, fields) => {
//         if (error) {
//             return console.error(error.message);
//         }

//         let string = JSON.stringify(results);
//         res.send({ express: string });
//     });
//     connection.end();
// });

// app.post('/api/getMovies', (req, res) => {
//     let sql = "SELECT * FROM movies";
//     let connection = mysql.createConnection(config);

//     connection.query(sql, (error, results) => {
//         if (error) {
//             return console.error(error.message);
//         }
//         let string = JSON.stringify(results);
//         res.send({ express: string });
//     });
//     connection.end();
// });

// app.post('/api/addReview', (req, res) => {
//     let movieID = req.body.movieID;
//     let reviewTitle = req.body.reviewTitle;
//     let reviewContent = req.body.reviewContent;
//     let reviewScore = req.body.reviewScore;
//     let userID = req.body.userID;

//     let sql = `INSERT INTO aaghakoo.Review (movieID, reviewTitle, reviewContent, reviewScore, userID) VALUES (${movieID}, "${reviewTitle}", "${reviewContent}", ${reviewScore}, ${userID});`
//     let connection = mysql.createConnection(config);

//     connection.query(sql, (error, results) => {
//         if (error) {
//             res.send(error);
//         }
//         let string = JSON.stringify(results);
//         res.send({ express: string });
//     });
//     connection.end();
// });

// app.post('/api/findMovie', (req, res) => {
//     let connection = mysql.createConnection(config);
//     let movieSearchTerm = req.body.movieSearchTerm;
//     let actorSearchTerm = req.body.actorSearchTerm;
//     let directorSearchTerm = req.body.directorSearchTerm;

//     let sql = `SELECT DISTINCT m.name AS movie_name, CONCAT(d.first_name, ' ', d.last_name) AS director_name, r.reviewContent AS review_content, r.reviewScore AS review_score
//                 FROM movies AS m
//                 INNER JOIN movies_directors AS md ON m.id = md.movie_id
//                 INNER JOIN directors AS d ON md.director_id = d.id
//                 INNER JOIN roles AS ro ON m.id = ro.movie_id
//                 INNER JOIN actors AS a ON ro.actor_id = a.id
//                 LEFT JOIN Review AS r ON m.id = r.movieID
//                 WHERE`;

//     let data = [];

//     if (movieSearchTerm) {
//         sql += ` m.name = ?`;
//         data.push(movieSearchTerm);
//     }
//     if (actorSearchTerm) {
//         if (data.length > 0) sql += ' AND';
//         sql += ` CONCAT(a.first_name, ' ', a.last_name) = ?`;
//         data.push(actorSearchTerm);
//     }
//     if (directorSearchTerm) {
//         if (data.length > 0) sql += ' AND';
//         sql += ` CONCAT(d.first_name, ' ', d.last_name) = ?`;
//         data.push(directorSearchTerm);
//     }

//     sql += ';';

//     connection.query(sql, data, (error, results, fields) => {
//         if (error) {
//             return console.error(error.message);
//         }

//         let string = JSON.stringify(results);
//         res.send({ express: string });
//     });
//     connection.end();
// });

// app.listen(port, () => console.log(`Listening on port ${port}`)); // for the dev version


import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { error } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {
    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

    let sql = `SELECT mode FROM user WHERE userID = ?`;
    let data = [userID];

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }

        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

app.post('/api/addToWatchLater', (req, res) => {
    const movieID = req.body.movieID;
    const userID = req.body.userID; // Assuming you have userID in the request body
  
    const sql = `INSERT INTO watch_later_movies (movieID, userID) VALUES (?, ?)`;
    const data = [movieID, userID];
  
    const connection = mysql.createConnection(config);
  
    connection.query(sql, data, (error, results) => {
      if (error) {
        console.error('Error adding to Watch Later:', error.message);
        res.send({ success: false, error: error.message });
      } else {
        res.send({ success: true });
      }
    });
  
    connection.end();
  });
  
  app.post('/api/getWatchLaterList', (req, res) => {
    const userID = req.body.userID; // Assuming you have userID in the request body
  
    const sql = `SELECT movies.name FROM watch_later_movies
                 INNER JOIN movies ON watch_later_movies.movieID = movies.id
                 WHERE watch_later_movies.userID = ?`;
  
    const connection = mysql.createConnection(config);
  
    connection.query(sql, [userID], (error, results) => {
      if (error) {
        console.error('Error fetching Watch Later list:', error.message);
        res.send({ success: false, error: error.message });
      } else {
        res.send({ success: true, watchLaterList: results });
      }
    });
  
    connection.end();
  });


app.post('/api/getMovies', (req, res) => {
    let sql = "SELECT * FROM movies";
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results) => {
        if (error) {
            return console.error(error.message);
        }
        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

app.post('/api/addReview', (req, res) => {
    let movieID = req.body.movieID;
    let reviewTitle = req.body.reviewTitle;
    let reviewContent = req.body.reviewContent;
    let reviewScore = req.body.reviewScore;
    let userID = req.body.userID;

    let sql = `INSERT INTO aaghakoo.Review (movieID, reviewTitle, reviewContent, reviewScore, userID) VALUES (${movieID}, "${reviewTitle}", "${reviewContent}", ${reviewScore}, ${userID});`
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results) => {
        if (error) {
            res.send(error);
        }
        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

app.post('/api/findMovie', (req, res) => {
    let connection = mysql.createConnection(config);
    let movieSearchTerm = req.body.movieSearchTerm;
    let actorSearchTerm = req.body.actorSearchTerm;
    let directorSearchTerm = req.body.directorSearchTerm;

    let sql = `SELECT DISTINCT m.name AS movie_name, CONCAT(d.first_name, ' ', d.last_name) AS director_name, r.reviewContent AS review_content, r.reviewScore AS review_score
                FROM movies AS m
                INNER JOIN movies_directors AS md ON m.id = md.movie_id
                INNER JOIN directors AS d ON md.director_id = d.id
                INNER JOIN roles AS ro ON m.id = ro.movie_id
                INNER JOIN actors AS a ON ro.actor_id = a.id
                LEFT JOIN Review AS r ON m.id = r.movieID
                WHERE`;

    let data = [];

    if (movieSearchTerm) {
        sql += ` m.name = ?`;
        data.push(movieSearchTerm);
    }
    if (actorSearchTerm) {
        if (data.length > 0) sql += ' AND';
        sql += ` CONCAT(a.first_name, ' ', a.last_name) = ?`;
        data.push(actorSearchTerm);
    }
    if (directorSearchTerm) {
        if (data.length > 0) sql += ' AND';
        sql += ` CONCAT(d.first_name, ' ', d.last_name) = ?`;
        data.push(directorSearchTerm);
    }

    sql += ';';

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }

        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
