const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "sesh";`

  pool.query(queryText).then((result)=>{
    console.log('Successful response', result.rows);
    res.send(result.rows)
  }).catch((error)=>{
    console.log('Problems with getting session data',error);
    res.sendStatus(500)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const {
          newCode,
          user,
        } = req.body;
  let queryText = `INSERT INTO "sesh" (join_code, user_id) VALUES ($1, $2);`
  
  pool.query(queryText, [newCode, user]).then((response)=>{
    console.log('SESSION CODE POST SUCCESS',response);
    res.sendStatus(201)

  }).catch((error)=>{
    console.log('SESSION CODE POST FAILED', error);
    res.sendStatus(500)

  })
});




module.exports = router;