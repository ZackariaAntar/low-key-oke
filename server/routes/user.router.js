const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Axios request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('TESTING TO SEE IF WE MAKE IT HERE OK COOL THANKS!');
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});
router.post('/premium/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const premium = req.body.premium
  console.log(req.body);

  const queryText = `INSERT INTO "user" (username, password, premium)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, premium])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/verify', async (req, res, next) => {
  const homie = req.body.homie
  const verifyHomies = 'SELECT * FROM homies'
  const client = await pool.connect();
  try {
		await client.query("BEGIN");
		const checkStatus = await client.query(verifyHomies);
    if (homie === checkStatus.rows[0].in_the_know) {
      await client.query("COMMIT");
      res.sendStatus(200);
		}else{
      res.sendStatus(500)
    }
  } catch (error) {
		await client.query("ROLLBACK");
		console.log("Not a homie", error);
		res.sendStatus(500);
   }finally {
		client.release();
   }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('LOGIN POST');
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {

  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
