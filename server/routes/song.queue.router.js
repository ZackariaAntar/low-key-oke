const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
	let queryText = `
	SELECT * FROM "session_queue"
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
	// POST route code here
});

module.exports = router;
