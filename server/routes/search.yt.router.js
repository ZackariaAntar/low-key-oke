const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const pool = require("../modules/pool");


router.post(`/`, async (req, res) => {

	try{
        const { sesh_code, user_id, name, title, artist } = req.body;
        const ytResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&channelId=UCYi9TC1HC_U2kaRAK6I4FSQ&part=snippet&maxResults=2&q=""&q=${title} ${artist}`)

        console.log('REQ BODY', req.body);
        console.log('ytrespsonse dot data', ytResponse.data);


        if (ytResponse.data.pageInfo.totalResults == 0){
            res.sendStatus(500)
        }else{
            let ytSearch = ytResponse.data.items[0].snippet.title;
            console.log("YT RESPONSE DATA ITEMS 0 SNIPPET TITLE", ytSearch);
                if (
					ytSearch
						.toLowerCase()
						.includes(title.toLowerCase() && artist.toLowerCase())
				) {
					const videoId = ytResponse.data.items[0].id.videoId;
					let addToQueueQuery = `
		                INSERT INTO queue ("current_sesh_id","user_id", "name", "title","artist","url")
		                VALUES($1,$2,$3,$4,$5,$6);`;
					pool.query(addToQueueQuery, [
						sesh_code,
						user_id,
						name,
						title,
						artist,
						videoId,
					])
						.then((response) => {
							console.log(
								"SUCCESSFUL POST TO QUEUE TABLE",
								response
							);
							res.sendStatus(201);
						})
						.catch((err) => {
							console.log(
								"PROBLEM POSTING TO THE QUEUE TABLE",
								err
							);
							res.sendStatus(500);
						});
				} else {
					res.sendStatus(500);
				}
            }
        }catch(error){
			console.log("ERROR WITH ORIGNAL API POST on server", error);
			res.sendStatus(500)
		};
});

module.exports = router;
