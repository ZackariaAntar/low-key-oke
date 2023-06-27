const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/host/view/:id", (req, res) => {
	let host_id = req.params.id;
	let queryText = `
		SELECT * FROM "queue"
		JOIN "sesh_junction" ON "sesh_junction"."sesh_code" = "queue"."current_sesh_id" AND "sesh_junction"."user_id" = "queue"."user_id"
		JOIN "sesh" ON "sesh"."join_code" = "sesh_junction"."sesh_code" AND "sesh"."host_user_id" = $1
		WHERE "queue"."in_queue" = true
		ORDER BY "queue"."queue_order" ASC;`;

	pool.query(queryText, [host_id])
		.then((result) => {
			console.log(
				"SUCCESSFUL QUEUE QUERY QUEUE DATA BEING SENT BACK TO HOST:",
				result.rows
			);
			res.send(result.rows);
		})
		.catch((err) => {
			console.log("PROBLEM GETTING QUEUE DATA BACK TO THE HOST", err);
			res.sendStatus(500);
		});
});

router.get("/guest/current/:id", (req, res) => {
	let user_id = req.params.id;

	let queryText = `
		SELECT * FROM queue
		JOIN "sesh_junction" ON "sesh_junction"."sesh_code" = "queue"."current_sesh_id" AND "sesh_junction"."user_id" = "queue"."user_id"
		WHERE "queue"."user_id" = $1
		ORDER BY "queue"."queue_order" ASC`;
	pool.query(queryText, [user_id])
		.then((result) => {
			console.log(
				"SUCCESS IN GETTING MY USER CURRENT SESSION QUEUE SONGS DATA:",
				result.rows
			);
			res.send(result.rows);
		})
		.catch((err) => {
			console.log(
				"PROBLEM WITH GETTING MY USER CURRENT SESSION DATA",
				err
			);
			res.sendStatus(500);
		});
});
router.get("/guest/all/history/:id", (req, res) => {
	let user_id = req.params.id;

	let queryText = `
		SELECT * FROM queue
		WHERE user_id = $1`;
	pool.query(queryText, [user_id])
		.then((result) => {
			console.log(
				"SUCCESS IN GETTING MY USER HISTORY DATA:",
				result.rows
			);
			res.send(result.rows);
		})
		.catch((err) => {
			console.log("PROBLEM WITH GETTING MY USER HISTORY DATA", err);
			res.sendStatus(500);
		});
});

router.put("/remove/:id", (req, res) => {
	let queueRowID = req.params.id;

	let queryText = `
		UPDATE queue SET in_queue = false
		WHERE id = $1;`;
	pool.query(queryText, [queueRowID])
		.then((response) => {
			console.log("SUCCESS IN REMOVING SONG FROM QUEUE ", response);
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log("PROBLEM WITH REMOVING SONG FROM QUEUE ", err);
			res.sendStatus(500);
		});
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
	const { sesh_code, user_id, title, artist, url } = req.body;
	let addToQueueQuery = `
		INSERT INTO queue ("current_sesh_id","user_id","title","artist","url")
		VALUES($1,$2,$3,$4,$5);`;
	pool.query(addToQueueQuery, [sesh_code, user_id, title, artist, url])
		.then((response) => {
			console.log("SUCCESSFUL POST TO QUEUE TABLE", response);
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log("PROBLEM POSTING TO THE QUEUE TABLE", err);
			res.sendStatus(500);
		});
	// POST route code here
});

module.exports = router;
