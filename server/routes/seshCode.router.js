const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
	let queryText = `SELECT * FROM sesh;`;
	pool.query(queryText)
		.then((result) => {
			console.log(
				"REQUEST FOR ALL OF THE SESSION CODES FROM sesh TABLE",
				result.rows
			);
			res.send(result.rows);
		})
		.catch((err) => {
			console.log(
				"PROBLEM GETTING ALL SESSION CODES FROM sesh TABLE",
				err
			);
			res.sendStatus(500);
		});
});

router.get("/current/:id", (req, res) => {
	const user_id = req.params.id;

	let queryText = `SELECT "sesh_junction"."sesh_code"
	FROM "sesh_junction"
    JOIN "sesh" ON "sesh_junction"."sesh_code" = "sesh"."join_code"
	WHERE "sesh_junction"."user_id" = $1
	ORDER BY "sesh"."created_at" DESC
	LIMIT 1;`;
	pool.query(queryText, [user_id])
		.then((result) => {
			console.log(
				"REQUEST FOR ALL OF THE SESSION CODES FROM sesh TABLE",
				result.rows
			);
			res.send(result.rows);
		})
		.catch((err) => {
			console.log(
				"PROBLEM GETTING CURRENT SESSION CODES FROM sesh_junction TABLE",
				err
			);
			res.sendStatus(500);
		});
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
	const { newCode, host_id } = req.body;
	let queryText = `
      INSERT INTO sesh ("join_code", "host_user_id")
      VALUES ($1, $2);`;
	pool.query(queryText, [newCode, host_id])
	.then(() => {
		console.log("SUCCESSFULLY ADDED TO THE sesh TABLE");

		let junctionQuery = `
    				INSERT INTO sesh_junction ("sesh_code", "user_id")
   					VALUES ($1, $2);`;
		pool.query(junctionQuery, [newCode, host_id])
		.then(() => {
			res.sendStatus(201);
			})
			.catch((error) => {
				console.log("PROBLEM WITH ADDING SESH CODE AND HOST ID TO THE JUNCTION TABLE AFTER ADDING IT TO THE sesh TABLE", error);
				res.sendStatus(500);
				});
		})
		.catch((err) => {
			console.log("problem CREATING HOST INSTANCE",err);
			res.sendStatus(500);
		});

	// POST route code here
});

router.post("/guest", (req, res) => {
	const { sesh_code, user_id } = req.body;
	let junctionQuery = `
    INSERT INTO sesh_junction ("sesh_code", "user_id")
    VALUES ($1, $2);`;
	pool.query(junctionQuery, [sesh_code, user_id])
	.then(() => {

		console.log("SUCCESSFULLY ADDED guest TO THE sesh_junction TABLE")
		res.sendStatus(201);
	})
		.catch((error) => {
			console.log(
				"PROBLEM WITH ADDING guest TO THE JUNCTION TABLE",
				error
			);
			res.sendStatus(500);
		});
});

module.exports = router;
