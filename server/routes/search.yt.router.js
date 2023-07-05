const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const pool = require("../modules/pool");


router.post(`/`, async (req, res) => {

	try{
        const { sesh_code, user_id, name, title, artist } = req.body;
        const ytResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&channelId=UCYi9TC1HC_U2kaRAK6I4FSQ&part=snippet&maxResults=5&q=${title}`)

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
                if (item.id.videoId){
                    let betterTitle = "";
                    if (item.snippet.title.includes("&quot;")) {
                        betterTitle = item.snippet.title.replaceAll("&quot;", "");
                        optionsArr.push({
							videoId: item.id.videoId,
							title: betterTitle,
							pic: item.snippet.thumbnails.high.url,
						});
					}else{
                        optionsArr.push({
							videoId: item.id.videoId,
							title: item.snippet.title,
							pic: item.snippet.thumbnails.high.url,
						});

                    }

					console.log("OPTIONS ARR", optionsArr);
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
		{
			kind: "youtube#searchResult",
			etag: "82sVDHGRvKR809ol8rnAgELwpOk",
			id: {
				kind: "youtube#video",
				videoId: "vI_Zc6Ngmgg",
			},
			snippet: {
				publishedAt: "2009-07-13T14:18:08Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Elton John - Sorry Seems To Be The Hardest Word (Karaoke With Lyrics)",
				description:
					'Sing "Sorry Seems To Be The Hardest Word" by Elton John now! This is the karaoke video you were looking for. For more karaoke ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/vI_Zc6Ngmgg/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/vI_Zc6Ngmgg/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/vI_Zc6Ngmgg/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2009-07-13T14:18:08Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "agVGvFrKYkFBBrGaMipyvynlX4o",
			id: {
				kind: "youtube#video",
				videoId: "P9UUrX4lwPk",
			},
			snippet: {
				publishedAt: "2011-02-09T19:22:48Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Creedence Clearwater Revival - Have You Ever Seen The Rain (Karaoke with Lyrics)",
				description:
					"SEE THE NEW KARAOKE WITH LYRICS VERSION HERE: https://youtu.be/9L5CUU0sUtI . This is the karaoke video you were ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/P9UUrX4lwPk/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/P9UUrX4lwPk/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/P9UUrX4lwPk/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2011-02-09T19:22:48Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "1ftGFYZwPKY7N7Z8fQ3_qB0Jqog",
			id: {
				kind: "youtube#video",
				videoId: "d_WmEOIP42Y",
			},
			snippet: {
				publishedAt: "2011-05-20T19:44:02Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Don&#39;t It Make My Brown Eyes Blue in the Style of &quot;Crystal Gayle&quot; karaoke with lyrics (no lead vocal)",
				description:
					'Download "Don\'t It Make My Brown Eyes Blue" in the style of Crystal Gayle in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/d_WmEOIP42Y/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/d_WmEOIP42Y/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/d_WmEOIP42Y/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2011-05-20T19:44:02Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "QMSr9ucty9gWYhN_L_t7I9dPlzo",
			id: {
				kind: "youtube#video",
				videoId: "grPxTMCGjRQ",
			},
			snippet: {
				publishedAt: "2020-11-14T18:30:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Toni Basil, Bonnie Tyler, Cyndi Lauper, Rick Astley",
				description:
					"Sing the Top 80's Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/grPxTMCGjRQ/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/grPxTMCGjRQ/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/grPxTMCGjRQ/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-14T18:30:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "aUPcOYzEcnnRNHvMqyLRi8sY6LI",
			id: {
				kind: "youtube#video",
				videoId: "za8tMANFyXI",
			},
			snippet: {
				publishedAt: "2011-02-09T17:41:40Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Michael Jackson - You Are Not Alone (Karaoke With Lyrics)",
				description:
					'Download "You Are Not Alone" in the style of Michael Jackson in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/za8tMANFyXI/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/za8tMANFyXI/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/za8tMANFyXI/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2011-02-09T17:41:40Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "jEaCSXoi3XT4c5A1b8SzsW-v7g4",
			id: {
				kind: "youtube#video",
				videoId: "tlnN0vRLNeA",
			},
			snippet: {
				publishedAt: "2013-10-28T14:58:52Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Don&#39;t in the Style of &quot;Elvis Presley&quot; karaoke video with lyrics (no lead vocal)",
				description:
					'Download "Don\'t" in the style of Elvis Presley in MP4 or MP3+G formats available here: https://karaoke.stingray.com/search/song?',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/tlnN0vRLNeA/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/tlnN0vRLNeA/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/tlnN0vRLNeA/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2013-10-28T14:58:52Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "zQHCnU-8m_uivLAmtW3LVjeMggc",
			id: {
				kind: "youtube#video",
				videoId: "iCOiaVKD21M",
			},
			snippet: {
				publishedAt: "2009-07-13T14:21:58Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Jennifer Hudson - And I Am Telling You I&#39;m Not Going (Karaoke with Lyrics)",
				description:
					"Sing And I Am Telling You I'm Not Going by Jennifer Hudson now! This is the karaoke video you were looking for. For more ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/iCOiaVKD21M/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/iCOiaVKD21M/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/iCOiaVKD21M/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2009-07-13T14:21:58Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "1huuI1UKh2xKbzsqOKUlUEGiaSo",
			id: {
				kind: "youtube#video",
				videoId: "9YXs5qMahQ0",
			},
			snippet: {
				publishedAt: "2009-07-13T14:20:58Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Like You&#39;ll Never See Me Again in the style of Alicia Keys karaoke version with lyrics",
				description:
					'Download "Like You\'ll Never See Me Again" in the style of Alicia Keys in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/9YXs5qMahQ0/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/9YXs5qMahQ0/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/9YXs5qMahQ0/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2009-07-13T14:20:58Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "NJ6fxgEYQBhUoUs7xsIyysTGqyo",
			id: {
				kind: "youtube#video",
				videoId: "LxKPsEefblc",
			},
			snippet: {
				publishedAt: "2011-08-03T20:50:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "The Carpenters - Top Of The World (Karaoke With Lyrics)",
				description:
					'Sing "Top Of The World" by The Carpenters now on Stingray Karaoke! For more karaoke songs with lyrics, subscribe to the ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/LxKPsEefblc/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/LxKPsEefblc/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/LxKPsEefblc/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2011-08-03T20:50:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "3q50KmzgACTJrNVCIf565GS86jY",
			id: {
				kind: "youtube#video",
				videoId: "KTl8hqgnODo",
			},
			snippet: {
				publishedAt: "2021-01-24T19:00:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "1 HOUR NON STOP BEST OF &#39;80s MUSIC  - KARAOKE WITH LYRICS",
				description:
					"Sing your favorite Hits from the 1980s in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/KTl8hqgnODo/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/KTl8hqgnODo/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/KTl8hqgnODo/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-01-24T19:00:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "ZLd7ql-_VuL6IxZEefQzie3qVCY",
			id: {
				kind: "youtube#video",
				videoId: "gbLH2fx22XE",
			},
			snippet: {
				publishedAt: "2013-02-15T22:38:42Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "We Are Never Ever Getting Back Together in the Style of &quot;Taylor Swift&quot; karaoke lyrics",
				description:
					'Download "We Are Never Ever Getting Back Together" in the style of Taylor Swift in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/gbLH2fx22XE/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/gbLH2fx22XE/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/gbLH2fx22XE/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2013-02-15T22:38:42Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "-jJsUX2ShmriPMSn0HGALeKLAFU",
			id: {
				kind: "youtube#video",
				videoId: "YhV-SF8jeHc",
			},
			snippet: {
				publishedAt: "2009-09-02T21:36:05Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Alicia Keys - If I Ain&#39;t Got You (Karaoke with Lyrics)",
				description:
					'Sing "If I Ain\'t Got You" by Alicia Keys now! This is the karaoke video you were looking for. For more karaoke songs with lyrics, ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/YhV-SF8jeHc/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/YhV-SF8jeHc/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/YhV-SF8jeHc/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2009-09-02T21:36:05Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "VxNeDcd4C-6xdewpMzncA0DAzrg",
			id: {
				kind: "youtube#video",
				videoId: "WP8_6jlOVJ8",
			},
			snippet: {
				publishedAt: "2021-10-17T02:00:08Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST KARAOKE SONGS OF ALL TIME (VOL. 1): BEST MUSIC from the &#39;70s, &#39;80s&#39;, &#39;90s &amp; Y2K by Stingray",
				description:
					"In the mood for some Karaoke but not quite sure what to sing? @StingrayKaraoke has put together a Top 15 Most Popular ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/WP8_6jlOVJ8/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/WP8_6jlOVJ8/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/WP8_6jlOVJ8/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-10-17T02:00:08Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "-g4C2JO6MOhbS9tTNEkBWVwqH3k",
			id: {
				kind: "youtube#video",
				videoId: "LyiJLus0yrI",
			},
			snippet: {
				publishedAt: "2023-05-20T20:00:07Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF 1980s KARAOKE WITH LYRICS (1 HOUR): Cher, Bonnie Tyler, Cyndi Lauper, Rick Astley",
				description:
					"Sing your favorite songs in Karaoke right here on Stingray Karaoke! SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/LyiJLus0yrI/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/LyiJLus0yrI/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/LyiJLus0yrI/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2023-05-20T20:00:07Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "PTV5P7mkOdhCQJ9_xvuQOsyCqJQ",
			id: {
				kind: "youtube#video",
				videoId: "qlyLqkQlZT8",
			},
			snippet: {
				publishedAt: "2020-12-27T12:00:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s MUSIC - 3 HOURS NON STOP - KARAOKE WITH LYRICS",
				description:
					"Sing the Top Hits from the 1980s in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/qlyLqkQlZT8/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/qlyLqkQlZT8/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/qlyLqkQlZT8/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-12-27T12:00:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "kN0sn1V4FIB306LzCEbsRz-iqDo",
			id: {
				kind: "youtube#video",
				videoId: "JNctDfC6JgE",
			},
			snippet: {
				publishedAt: "2021-01-31T18:00:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "George Michael - Faith (Karaoke With Lyrics)",
				description:
					'Sing "Faith" by George Michaels in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/JNctDfC6JgE/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/JNctDfC6JgE/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/JNctDfC6JgE/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-01-31T18:00:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "OcNRGpozDB09J9G4w3lSDIoz3w8",
			id: {
				kind: "youtube#video",
				videoId: "s8lPbGlWd8A",
			},
			snippet: {
				publishedAt: "2009-07-13T14:18:38Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Frank Sinatra - New York, New York (Karaoke with Lyrics)",
				description:
					'Sing "New York, New York" by Frank Sinatra now! This is the karaoke video you were looking for. For more karaoke songs with ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/s8lPbGlWd8A/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/s8lPbGlWd8A/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/s8lPbGlWd8A/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2009-07-13T14:18:38Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "CEncOyjIBL-LCG9VGOk1WCqzPsU",
			id: {
				kind: "youtube#video",
				videoId: "xEYd27snxCg",
			},
			snippet: {
				publishedAt: "2012-04-05T14:53:30Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Your Man - Josh Turner (Karaoke video with lyrics- No Lead Vocal)",
				description:
					'WATCH THE NEW VERSION OF "YOUR MAN" by Josh Turner HERE: https://youtu.be/ErcIZmfq3r0 . For more Stingray Karaoke ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/xEYd27snxCg/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/xEYd27snxCg/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/xEYd27snxCg/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2012-04-05T14:53:30Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "FlgkhacPVXvIJiL8vNAYxIiWhI4",
			id: {
				kind: "youtube#video",
				videoId: "2zOqnB2RPCc",
			},
			snippet: {
				publishedAt: "2021-01-31T16:00:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Paula Abdul - Straight Up (Karaoke with Lyrics)",
				description:
					'Sing the legendary Paula Abdul\'s Mega Hit "Straight up" in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/2zOqnB2RPCc/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/2zOqnB2RPCc/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/2zOqnB2RPCc/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-01-31T16:00:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "6ga0zoZzlFeyqYVanjnk8pkAAwg",
			id: {
				kind: "youtube#video",
				videoId: "-J0n4Pju-oU",
			},
			snippet: {
				publishedAt: "2021-01-16T02:00:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "&#39;80s MUSIC KARAOKE CHALLENGE 🎤 FRIDAY NIGHT KARAOKE PARTY 🎶 BEST OF &#39;80s KARAOKE WITH LYRICS",
				description:
					"Which of these 1980's top hits can you sing to perfection? Challenge your friends to a Karaoke competition and let us know below ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/-J0n4Pju-oU/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/-J0n4Pju-oU/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/-J0n4Pju-oU/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-01-16T02:00:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "DAYa80Ict9uQlVd74YbhrqtQQxk",
			id: {
				kind: "youtube#video",
				videoId: "sYaoPD92Q-M",
			},
			snippet: {
				publishedAt: "2020-11-20T23:15:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Madonna, Whitney Houston, Cyndi Lauper",
				description:
					"Sing the Top 10 '80s Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/sYaoPD92Q-M/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/sYaoPD92Q-M/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/sYaoPD92Q-M/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-20T23:15:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "S3WAPOFY9Q0RZjkjKf7MNZUMvTg",
			id: {
				kind: "youtube#video",
				videoId: "rFwd9ezIi98",
			},
			snippet: {
				publishedAt: "2020-11-15T18:00:07Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Starship, Cher, Air Supply, Bill Medley &amp; Jennifer Warnes",
				description:
					"Sing the Top 10 Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/rFwd9ezIi98/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/rFwd9ezIi98/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/rFwd9ezIi98/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-15T18:00:07Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "ZwK7Xds1wqkKcl6L8nrv076Q4lE",
			id: {
				kind: "youtube#video",
				videoId: "plcIjgA-M_4",
			},
			snippet: {
				publishedAt: "2020-11-22T19:30:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Queen, Billy Joel, Survivor",
				description:
					"Sing the Top '80s Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/plcIjgA-M_4/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/plcIjgA-M_4/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/plcIjgA-M_4/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-22T19:30:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "71H7GcooTw6eYyIVZiyBPwxNxPE",
			id: {
				kind: "youtube#video",
				videoId: "Hjv5e3GLmj8",
			},
			snippet: {
				publishedAt: "2020-11-22T01:00:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Stevie Wonder, Lionel Ritchie, Rick James",
				description:
					"Sing the Top Hits from the '80s in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/Hjv5e3GLmj8/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/Hjv5e3GLmj8/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/Hjv5e3GLmj8/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-22T01:00:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "IlEmmLw_8SrC0UD6KL3XAZC8m48",
			id: {
				kind: "youtube#video",
				videoId: "n7Nos4pyx4Y",
			},
			snippet: {
				publishedAt: "2022-02-06T02:30:11Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "TOP 10 BEST LOVE SONGS FROM THE &#39;80s | Karaoke with Lyrics @StingrayKaraoke",
				description:
					"With Valentine's Day right around the corner, sing the most popular love songs in the world from the '90ss in Karaoke version on ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/n7Nos4pyx4Y/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/n7Nos4pyx4Y/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/n7Nos4pyx4Y/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2022-02-06T02:30:11Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "Yc0Qh1P1lMit9TaeDR1go3YS0SM",
			id: {
				kind: "youtube#video",
				videoId: "AAPRtwEp82c",
			},
			snippet: {
				publishedAt: "2013-09-07T05:00:18Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Scorpions - Wind Of Change (Karaoke With Lyrics)",
				description:
					'Sing "WIND OF CHANGE" By the Scorpions right now here on Stingray Karaoke! For more karaoke songs with lyrics, ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/AAPRtwEp82c/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/AAPRtwEp82c/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/AAPRtwEp82c/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2013-09-07T05:00:18Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "YcbzTdcWo56bmK5wjk5AzwOWlI4",
			id: {
				kind: "youtube#video",
				videoId: "qJiG89HJj6k",
			},
			snippet: {
				publishedAt: "2014-09-17T13:03:39Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "It&#39;s Gonna Take A Miracle in the Style of &quot;Deniece Williams&quot; with lyrics (no lead vocal)",
				description:
					'Download "It\'s Gonna Take A Miracle" in the style of Deniece Williams in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/qJiG89HJj6k/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/qJiG89HJj6k/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/qJiG89HJj6k/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2014-09-17T13:03:39Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "HAJqTDt9jnsA_SjGr2oBrarmQ0M",
			id: {
				kind: "youtube#video",
				videoId: "tU1aEoA7eCs",
			},
			snippet: {
				publishedAt: "2011-12-02T00:53:42Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "I&#39;m Gonna Miss Her in the Style of &quot;Brad Paisley&quot; karaoke video with lyrics (no lead vocal)",
				description:
					'Download "I\'m Gonna Miss Her" in the style of Brad Paisley in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/tU1aEoA7eCs/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/tU1aEoA7eCs/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/tU1aEoA7eCs/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2011-12-02T00:53:42Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "cYHayBOQeSfVB-syHV7Ehbsct-0",
			id: {
				kind: "youtube#video",
				videoId: "eYh9DhmQMKI",
			},
			snippet: {
				publishedAt: "2020-09-10T12:32:20Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Nobody&#39;s Love : Maroon 5 | Karaoke with Lyrics",
				description:
					"Sing Nobody's Love by Maroon 5 now! This is the karaoke video you were looking for. For more karaoke songs with lyrics, ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/eYh9DhmQMKI/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/eYh9DhmQMKI/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/eYh9DhmQMKI/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-09-10T12:32:20Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "No_-3sWPow8AouR2lnH5iIVaQUs",
			id: {
				kind: "youtube#video",
				videoId: "ot_XW1HBSy4",
			},
			snippet: {
				publishedAt: "2019-08-01T16:57:33Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "You&#39;ll Never Find Another Love Like Mine : Lou Rawls | Karaoke with Lyrics",
				description:
					"Sing You'll Never Find Another Love Like Mine : Lou Rawls wherever you go with the Stingray Karaoke mobile app. Download ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/ot_XW1HBSy4/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/ot_XW1HBSy4/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/ot_XW1HBSy4/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2019-08-01T16:57:33Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "TS2ZTSd_2ODhts_Kr2SqFc-qwHg",
			id: {
				kind: "youtube#video",
				videoId: "ZWPV1bhStt4",
			},
			snippet: {
				publishedAt: "2020-11-26T23:15:08Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Rick James, The B-52&#39;S, The Bangles, The Romantics",
				description:
					"Sing the Top '80s Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/ZWPV1bhStt4/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/ZWPV1bhStt4/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/ZWPV1bhStt4/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-26T23:15:08Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "xDd19N_j2EghfUKNVZ6VBWgUSCA",
			id: {
				kind: "youtube#video",
				videoId: "TYRmby4CZWs",
			},
			snippet: {
				publishedAt: "2020-11-27T23:15:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Culture Club, Toni Basil, Tiffany, Dexys Midnight Runners",
				description:
					"Sing the Top 80's Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/TYRmby4CZWs/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/TYRmby4CZWs/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/TYRmby4CZWs/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-27T23:15:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "fHZW1mTCCvyZfTwqCLsnYtVoAMM",
			id: {
				kind: "youtube#video",
				videoId: "8itnqKa_9uA",
			},
			snippet: {
				publishedAt: "2021-08-21T03:00:11Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "TOP 10 BEST KARAOKE WITH LYRICS from the &#39;80s &amp; &#39;90s by @StingrayKaraoke",
				description:
					"1 Hour Karaoke medley featuring the best hit songs from the 1980's and the 1990's only here on @Stingray Karaoke SUBSCRIBE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/8itnqKa_9uA/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/8itnqKa_9uA/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/8itnqKa_9uA/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-08-21T03:00:11Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "epNmdt3DJgXi6z_sI4AmwNdSL7w",
			id: {
				kind: "youtube#video",
				videoId: "M5wdPxjOAh8",
			},
			snippet: {
				publishedAt: "2020-11-21T17:00:09Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: a-ha, The Romantics, Pat Benatar, Poison",
				description:
					"Sing the Top 10 Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/M5wdPxjOAh8/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/M5wdPxjOAh8/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/M5wdPxjOAh8/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-21T17:00:09Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "OTkvqeVSe7kxYVlAPp79B7975L8",
			id: {
				kind: "youtube#video",
				videoId: "AXUuoIHym0M",
			},
			snippet: {
				publishedAt: "2014-02-26T18:37:44Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Head First in the Style of &quot;The Babys&quot; with lyrics (no lead vocal) karaoke video",
				description:
					'Download "Head First" in the style of The Babys in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/AXUuoIHym0M/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/AXUuoIHym0M/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/AXUuoIHym0M/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2014-02-26T18:37:44Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "Na1AOjAwbwRWSdvo_Pr_9-F7xGk",
			id: {
				kind: "youtube#video",
				videoId: "aJjoCrF5w_w",
			},
			snippet: {
				publishedAt: "2020-09-11T11:33:43Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "I Should Probably Go To Bed : Dan + Shay | Karaoke with Lyrics",
				description:
					"Sing I Should Probably Go To Bed by Dan + Shay now! This is the karaoke video you were looking for. For more karaoke songs ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/aJjoCrF5w_w/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/aJjoCrF5w_w/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/aJjoCrF5w_w/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-09-11T11:33:43Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "q7L-B2OyNM5bKyoeuaoEgLsbEiU",
			id: {
				kind: "youtube#playlist",
				playlistId: "PLLFS4jqFaVsDdfQI_MwsTtoiWa8sfXCAv",
			},
			snippet: {
				publishedAt: "2020-09-28T20:22:21Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "&#39;80s Karaoke Party | Stingray Karaoke",
				description: "Go back to the 80s with these timeless classics!",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/ytRWEdjf9lk/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/ytRWEdjf9lk/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/ytRWEdjf9lk/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-09-28T20:22:21Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "ThinUzBsZR-FGHoOMuYgbibSccM",
			id: {
				kind: "youtube#video",
				videoId: "SzqjH2gJzUw",
			},
			snippet: {
				publishedAt: "2020-11-29T18:00:41Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Bon Jovi, David Bowie, REO Speedwagon, Bryan Adams, Joan Jett",
				description:
					"Sing the Top '80s Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/SzqjH2gJzUw/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/SzqjH2gJzUw/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/SzqjH2gJzUw/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-29T18:00:41Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "HiW39X7SPojJyhc8hWCjql8eMkI",
			id: {
				kind: "youtube#playlist",
				playlistId: "PLLFS4jqFaVsBHFArkmSsLAyQcgs2_myhC",
			},
			snippet: {
				publishedAt: "2022-09-28T18:30:51Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "POP KARAOKE 🎶",
				description: "",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/_AtO50HYg3c/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/_AtO50HYg3c/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/_AtO50HYg3c/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2022-09-28T18:30:51Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "YMOuzPgT9-ujrsxOwsWTGy_99to",
			id: {
				kind: "youtube#video",
				videoId: "xGa6OVctmu0",
			},
			snippet: {
				publishedAt: "2019-09-19T13:33:23Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "I&#39;m Gonna Wash That Man Right Outa My Hair : South Pacific (Movie Version) | Karaoke with Lyrics",
				description:
					"Sing I'm Gonna Wash That Man Right Outa My Hair : South Pacific (Movie Version) wherever you go with the Stingray Karaoke ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/xGa6OVctmu0/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/xGa6OVctmu0/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/xGa6OVctmu0/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2019-09-19T13:33:23Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "63pmcKEhgti8J8qMc4UAg3WY9qU",
			id: {
				kind: "youtube#video",
				videoId: "Kb67-boAjXM",
			},
			snippet: {
				publishedAt: "2020-04-16T19:16:53Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Forever And Ever, Amen : Randy Travis | Karaoke with Lyrics",
				description:
					"Sing Forever And Ever, Amen : Randy Travis wherever you go with the Stingray Karaoke mobile app. Download Stingray Karaoke ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/Kb67-boAjXM/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/Kb67-boAjXM/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/Kb67-boAjXM/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-04-16T19:16:53Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "EdvbASJ_ThJELmou-Yclf1A-nbo",
			id: {
				kind: "youtube#video",
				videoId: "lXXVGhF9dl4",
			},
			snippet: {
				publishedAt: "2020-11-28T17:00:10Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "BEST OF &#39;80s KARAOKE WITH LYRICS: Toto, Kenny Loggins, The Police, Phil Collins",
				description:
					"Sing the Top '80s Hits in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/lXXVGhF9dl4/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/lXXVGhF9dl4/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/lXXVGhF9dl4/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-11-28T17:00:10Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "kemDO6mNOlXH7N8s2ycSNWnlOJM",
			id: {
				kind: "youtube#video",
				videoId: "vXfMfBY0QVI",
			},
			snippet: {
				publishedAt: "2011-12-02T00:52:18Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "I&#39;m Gonna Miss Her in the Style of &quot;Brad Paisley&quot; karaoke video with lyrics (with lead vocal)",
				description:
					'Download "I\'m Gonna Miss Her" in the style of Brad Paisley in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/vXfMfBY0QVI/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/vXfMfBY0QVI/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/vXfMfBY0QVI/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2011-12-02T00:52:18Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "2-R3pBm9pVBLuMecYjjTo-mAI18",
			id: {
				kind: "youtube#video",
				videoId: "tRvwO-TcTA8",
			},
			snippet: {
				publishedAt: "2021-02-14T17:00:14Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "❤️ LOVE SONGS from the &#39;80s, 90s, 2000&#39;s and Today / 1 HOUR Non Stop Karaoke With Lyrics",
				description:
					"Sing the most popular love songs of all time in Karaoke Version right here in Stingray Karaoke. SUBSCRIBE HERE ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/tRvwO-TcTA8/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/tRvwO-TcTA8/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/tRvwO-TcTA8/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2021-02-14T17:00:14Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "O9rWZyHryH12HZdJ6jR5r4Lvhp0",
			id: {
				kind: "youtube#video",
				videoId: "pPXBbDCRAh0",
			},
			snippet: {
				publishedAt: "2022-01-13T22:00:08Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Alesso, Katy Perry - When I&#39;m Gone (Karaoke With Lyrics)",
				description:
					'Sing "When I\'m Gone" by The Weeknd in Karaoke Version right here on @StingrayKaraoke. SUBSCRIBE HERE ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/pPXBbDCRAh0/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/pPXBbDCRAh0/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/pPXBbDCRAh0/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2022-01-13T22:00:08Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "cnJE98zeK7MKvETG1plaDXjSrOw",
			id: {
				kind: "youtube#video",
				videoId: "9V5lMk3TeZc",
			},
			snippet: {
				publishedAt: "2020-10-09T10:59:42Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "Arizona Zervas - ROXANNE (Karaoke with Lyrics)",
				description:
					"Sing Roxanne by Arizona Zervas now! For more karaoke songs with lyrics, subscribe to the Stingray Karaoke Youtube channel: ...",
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/9V5lMk3TeZc/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/9V5lMk3TeZc/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/9V5lMk3TeZc/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2020-10-09T10:59:42Z",
			},
		},
		{
			kind: "youtube#searchResult",
			etag: "v8guYsVRIKfppfbpCrAy__Cv9eE",
			id: {
				kind: "youtube#video",
				videoId: "ikNTCUkSJIE",
			},
			snippet: {
				publishedAt: "2014-08-11T13:07:06Z",
				channelId: "UCYi9TC1HC_U2kaRAK6I4FSQ",
				title: "So What (Radio Version) in the Style of &quot;Pink&quot; with lyrics (no lead vocal)",
				description:
					'Download "So What (Radio Version)" in the style of Pink in MP4 or MP3+G formats available here: ...',
				thumbnails: {
					default: {
						url: "https://i.ytimg.com/vi/ikNTCUkSJIE/default.jpg",
						width: 120,
						height: 90,
					},
					medium: {
						url: "https://i.ytimg.com/vi/ikNTCUkSJIE/mqdefault.jpg",
						width: 320,
						height: 180,
					},
					high: {
						url: "https://i.ytimg.com/vi/ikNTCUkSJIE/hqdefault.jpg",
						width: 480,
						height: 360,
					},
				},
				channelTitle: "Stingray Karaoke",
				liveBroadcastContent: "none",
				publishTime: "2014-08-11T13:07:06Z",
			},
		},
	],
};

module.exports = router;
