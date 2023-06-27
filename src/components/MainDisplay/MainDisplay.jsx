import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// https://github.com/tjallingt/react-youtube



function MainDisplay(){
	const dispatch = useDispatch()

	    useEffect(() => {
			dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });
			dispatch({ type: "FETCH_QUEUE", payload: user.id });
		}, []);
		const seshInfo = useSelector((store) => store.seshInfo);
		const queue = useSelector((store) => store.queue);
		const user = useSelector((store) => store.user);

	const onDeck = queue[1]
	const videoId = queue[0].url


	const handlePlay = (event) =>{
		console.log('playing');
		// event.target.playVideo();

	}
	const handleReady = (event) =>{
		console.log('ready');
		// dispatch({ type: "FETCH_QUEUE", payload: user.id });
		// event.target.pauseVideo();

	}
	const handleEnd = (event) =>{
		console.log('ended')
		dispatch({type:'REMOVE_FROM_QUEUE', payload: queue[0]})
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
	console.log(queue[0].url);
	if (!queue[0].url) {

		return (
			<Container maxWidth="md">
				<h1>Join code: {seshInfo.sesh_code}</h1>
				<div>
					<YouTube
						videoId={videoId}
						opts={options}
						onReady={handleReady}
						onPlay={handlePlay}
						onEnd={handleEnd}
					/>
				</div>
				<div>
					<h2>
						ON DECK: {onDeck && onDeck.user_id} with{" "}
						{onDeck && onDeck.title} by
						{onDeck && onDeck.artist}
					</h2>
				</div>
			</Container>
		);

	} else {
		return (
			<Container maxWidth="md">
				<h1>Join code: {seshInfo.sesh_code}</h1>
				<div>
					<YouTube
						videoId={videoId}
						opts={options}
						onReady={handleReady}
						onPlay={handlePlay}
						onEnd={handleEnd}
					/>
				</div>
				<div>
					<h2>
						ON DECK: {onDeck && onDeck.user_id} with{" "}
						{onDeck && onDeck.title} by
						{onDeck && onDeck.artist}
					</h2>
				</div>
			</Container>
		);
	}











}

export default MainDisplay

// 