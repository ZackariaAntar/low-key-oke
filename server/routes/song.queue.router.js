const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
	let queryText = `
	SELECT * FROM "queue"
	JOIN
	WHERE sesh_code = $1
    	AND in_queue = true
	ORDER BY queue_order ASC;
	`;
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
	const title = req.body.title
	const artist = req.body.artist
	const url = req.body.url
	const user_id = req.body.user_id
	const code = req.body.sesh_code
	console.log(req.body);

	let queryText = `
		SELECT "sesh"."join_code" FROM "sesh"
		JOIN "user" ON "sesh"."user_id" = "user"."id"
		ORDER BY "sesh"."created_at" DESC LIMIT 1
		AND
		INSERT INTO queue (title, artist, url, user_id, sesh_code)
		VALUES ($1, $2, $3, $4, $5);`;

	let queryValues = [title, artist, url, user_id];
	console.log(queryValues);
	pool.query(queryText, queryValues).then((response)=>{
		console.log(response);
		res.sendStatus(201)
	}).catch((err)=>{
		console.log(err);
		res.sendStatus(500)
	})

	// POST route code here
});

module.exports = router;

// "id"
// "title"
// "artist
// "url"
// "user_id"
// "sesh_code"
// "in_queue"
// "queue_order"
// "favorited