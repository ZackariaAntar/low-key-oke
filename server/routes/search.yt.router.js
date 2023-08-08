const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const pool = require("../modules/pool");
const {rejectUnauthenticated} = require("../modules/authentication-middleware");


router.post(`/`, rejectUnauthenticated, async (req, res) => {

	try{
        const {title} = req.body;
        const ytResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&channelId=UCYi9TC1HC_U2kaRAK6I4FSQ&part=snippet&maxResults=20&q=${title}`)

        console.log('REQ BODY', req.body);
        console.log('ytrespsonse dot data', ytResponse.data);
        let optionsArr = []
        if (ytResponse.data.pageInfo.totalResults == 0){
            res.sendStatus(500)
        }else{
            // let ytSearch = ytResponse.data.items[0].snippet.title;
            let ytResults = ytResponse.data.items
            console.log('DOT DATA DOT ITEMS',ytResults);
            for (let item of ytResults){
                console.log('ITEM',item);
                let bestOf = item.snippet.title
					.toLowerCase()
					.includes("best of");
                let andMore = item.snippet.title
					.toLowerCase()
					.includes("'& more'");
                let atSR = item.snippet.title
					.toLowerCase()
					.includes("@");
                let atSR2 = item.snippet.title
					.toLowerCase()
					.includes("@stingraykaraoke");
                let withLead = item.snippet.title
					.toLowerCase()
					.includes("(with lead vocal)");
				let nonStop = item.snippet.title
					.toLowerCase()
					.includes("non stop");
				let vol = item.snippet.title
					.toLowerCase()
					.includes("(vol. ");
				let topHits = item.snippet.title
					.toLowerCase()
					.includes("25 hits");
				let megaHits = item.snippet.title
					.toLowerCase()
					.includes("mega hits");
				let andMore2 = item.snippet.title
					.toLowerCase()
					.includes("more!");
				let oneHour = item.snippet.title
					.toLowerCase()
					.includes("1 hour");
				let twoHour = item.snippet.title
					.toLowerCase()
					.includes("2 hour");
				let bestKaraoke = item.snippet.title
					.toLowerCase()
					.includes("best karaoke");
				let bestKaraoke2 = item.snippet.title
					.toLowerCase()
					.includes("best hits");
				let bestSongs = item.snippet.title
					.toLowerCase()
					.includes("best songs");
				let era = item.snippet.title
					.toLowerCase()
					.includes("80s");
				let era2 = item.snippet.title
					.toLowerCase()
					.includes("90s");
				let mashup = item.snippet.title
					.toLowerCase()
					.includes("mashup");
				let shorts = item.snippet.title
					.toLowerCase()
					.includes("#shorts");



                if(!bestSongs && !bestKaraoke && !bestKaraoke2 && !bestOf && !nonStop && !andMore && !atSR && !atSR2 && !withLead && !vol && !andMore2 && !topHits && !megaHits && !oneHour && !twoHour && !shorts && !era && !era2 && !mashup){

                        if (item.id.videoId) {
                            let betterTitle = item.snippet.title;
                            for (let i = 0; i < 1; i++) {
                                if (betterTitle.includes("&quot;")) {
                                    betterTitle = betterTitle.replaceAll(
                                        "&quot;",
                                        ""
                                    );
                                    // optionsArr.push({
                                    // 	videoId: item.id.videoId,
                                    // 	title: betterTitle,
                                    // 	pic: item.snippet.thumbnails.high.url,
                                    // });
                                    i--;
                                } else if (betterTitle.includes("&#39;")) {
                                    betterTitle = betterTitle.replaceAll(
                                        "&#39;",
                                        "'"
                                    );
                                    // optionsArr.push({
                                    // 	videoId: item.id.videoId,
                                    // 	title: betterTitle,
                                    // 	pic: item.snippet.thumbnails.high.url,
                                    // })
                                    i--;
                                } else if (betterTitle.includes("&amp;")) {
                                    betterTitle = betterTitle.replaceAll(
                                        "&amp;",
                                        "&"
                                    );
                                    // optionsArr.push({
                                    // 	videoId: item.id.videoId,
                                    // 	title: betterTitle,
                                    // 	pic: item.snippet.thumbnails.high.url,
                                    // });
                                    i--;
                                } else {
                                    optionsArr.push({
                                        videoId: item.id.videoId,
                                        title: betterTitle,
                                        pic: item.snippet.thumbnails.high.url,
                                    });
                                }
                            }
                            console.log("OPTIONS ARR", optionsArr);
                        }

				}

                }




            res.send(optionsArr)




            // console.log("YT RESPONSE DATA ITEMS 0 SNIPPET TITLE", ytSearch);
            //     if (
			// 		ytSearch
			// 			.toLowerCase()
			// 			.includes(title.toLowerCase() && artist.toLowerCase())
			// 	) {
			// 		const videoId = ytResponse.data.items[0].id.videoId;
			// 		let addToQueueQuery = `
		    //             INSERT INTO queue ("current_sesh_id","user_id", "name", "title","artist","url")
		    //             VALUES($1,$2,$3,$4,$5,$6);`;
			// 		pool.query(addToQueueQuery, [
			// 			sesh_code,
			// 			user_id,
			// 			name,
			// 			title,
			// 			artist,
			// 			videoId,
			// 		])
			// 			.then((response) => {
			// 				console.log(
			// 					"SUCCESSFUL POST TO QUEUE TABLE",
			// 					response
			// 				);
			// 				res.sendStatus(201);
			// 			})
			// 			.catch((err) => {
			// 				console.log(
			// 					"PROBLEM POSTING TO THE QUEUE TABLE",
			// 					err
			// 				);
			// 				res.sendStatus(500);
			// 			});
			// 	} else {
			// 		res.sendStatus(500);
			// 	}
            }
        }catch(error){
			console.log("ERROR WITH ORIGNAL API POST on server", error);
			res.sendStatus(500)
		};
});



const exampleJson = {
	kind: "youtube#searchListResponse",
	etag: "9jk5R79mcb63V7YShmeW6dGG5Yw",
	nextPageToken: "CDIQAA",
	regionCode: "US",
	pageInfo: {
		totalResults: 284,
		resultsPerPage: 50,
	},
	items: [
		{
			kind: "youtube#searchResult",
			etag: "anOX4KhtoHZRmNdRUNughMI0DIg",
			id: {
				kind: "youtube#video",
				videoId: "oBylG_0sL-U",
			},
			snippet: {
				publishedAt: "2023-02-10T11:00:40Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Never Gonna Not Dance Again - P!NK | KARAOKE WITH LYRICS",
				description:
					"Sing your favorite songs in Karaoke right here on Stingray Karaoke! SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/oBylG_0sL-U/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/oBylG_0sL-U/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/oBylG_0sL-U/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2023-02-10T11:00:40Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "nqxblb6Sqk41_3duzSszo6kooH4",
			id: {
				kind: "youtube#video",
				videoId: "5bCwue1d9Js",
			},
			snippet: {
				publishedAt: "2021-01-17T17:00:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Rick Astley - Never Gonna Give You Up (Karaoke With Lyrics)",
				description:
					'Sing "Never Gonna Give You Up" by Rick Astley in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/5bCwue1d9Js/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/5bCwue1d9Js/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/5bCwue1d9Js/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-01-17T17:00:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "Ea5QhP1n6qY48H4F3isBpmM7frE",
			id: {
				kind: "youtube#video",
				videoId: "fm_K45p7EKo",
			},
			snippet: {
				publishedAt: "2016-04-14T20:05:59Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Never Gonna Give You Up in the style of Rick Astley | Karaoke with Lyrics",
				description:
					'Download "Never Gonna Give You Up" in the style of Rick Astley in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/fm_K45p7EKo/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/fm_K45p7EKo/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/fm_K45p7EKo/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2016-04-14T20:05:59Z",
			},
		},
	],
};

module.exports = router;
