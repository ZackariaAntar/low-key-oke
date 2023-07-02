const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();

router.post(`/`, (req, res) => {
	console.log("req.params.search is:", req.body);
	const {title, artist} = req.body;
	axios
		.get(
			`https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&channelId=UCYi9TC1HC_U2kaRAK6I4FSQ&part=snippet&maxResults=2&q=""&q=${title} ${artist}`

		)
		.then((response) => {
			res.send(response.data);
			// res.sendStatus(200);
		})
		.catch((error) => {
			console.log("error getting on server", error);
			res.sendStatus(500);
		});
});

module.exports = router;
