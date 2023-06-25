import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// https://github.com/tjallingt/react-youtube



function MainDisplay(){
	const dispatch = useDispatch()
	const sessionQueue = useSelector((store)=>store.queue)
	const [count, setCount] = useState(0)
    const dummyCode = 'xyz123'
    const dummyUrls = [{ url: "p_ebEqfDby8" }, { url: "PKmUKpfJ-uc" }]
	const queue = [
		{
			username: "Goober",
			id: 1,
			title: "Wouldn't I do it for you",
			artist: "Miss Piggy",
			url: "p_ebEqfDby8",
			user_id: "3",
			sesh_code: "xyz123",
			in_queue: true,
			queue_order: 1,
			favorited: false,
		},
		{
			username: "doober",
			id: 2,
			title: "Titanium",
			artist: "David Guetta and that other lady",
			url: "p_ebEqfDby8",
			user_id: "3",
			sesh_code: "xyz123",
			in_queue: true,
			queue_order: 2,
			favorited: false,
		},
	];

	const onDeck = queue[1]


	const handlePlay = (event) =>{
		console.log('playing');
		// event.target.playVideo();

	}
	const handleReady = (event) =>{
		console.log('ready');
		// event.target.pauseVideo();

	}
	const handleEnd = (event) =>{
		console.log('ended')
		dispatch({type:'NEXT_SONG', payload: queue[0]})
		// event.target.pauseVideo()


	}

    const options = {
		height: "548",
		width: "900",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
            controls: 1,

		},
	};


    return (
		<Container maxWidth="md">
			<h1>Join code: {onDeck.sesh_code}</h1>
			<div>
				{queue[0].in_queue === true ? (
					<YouTube
						videoId={queue[0].url}
						opts={options}
						onReady={handleReady}
						onPlay={handlePlay}
						onEnd={handleEnd}
					/>
				) : (
					<h1>Waiting for Players to join</h1>
				)}
			</div>
			<div>
				<h2>
					ON DECK: {onDeck.username} with {onDeck.title} by
					{onDeck.artist}
				</h2>
			</div>
		</Container>
	);
}

export default MainDisplay

