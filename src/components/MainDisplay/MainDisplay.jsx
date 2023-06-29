import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Skeleton, Box } from "@mui/material";
// https://github.com/tjallingt/react-youtube

function MainDisplay() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "FETCH_QUEUE", payload: user.id });
		dispatch({type: "FETCH_CURRENT_SESSION", payload: user.id});
	}, []);

	const seshInfo = useSelector((store) => store.seshInfo);
	const queue = useSelector((store) => store.queue);
	const user = useSelector((store) => store.user);

	const [nextSong, setNextSong] = useState(false);

	const fetchQueue = () => {
		console.log('fetch queue');
		const fetchUserQueue = () => {
			dispatch({ type: "FETCH_QUEUE", payload: user.id });
		};

		useEffect(() => {
			const timer = setInterval(fetchUserQueue, 5000);

			return () => clearInterval(timer);
		}, [dispatch, user]);
	};

	fetchQueue(user);

	const handlePlay = (event) => {
		console.log("playing");
		dispatch({ type: "FETCH_QUEUE", payload: user.id });


		// event.target.playVideo();
	};
	const handleReady = (event) => {
		console.log("ready");
		// dispatch({ type: "FETCH_QUEUE", payload: user.id });
		// event.target.pauseVideo();
		setNextSong(!nextSong);
	};
	const handleEnd = () => {
		console.log("ended");
		dispatch({ type: "MARK_SONG_AS_COMPLETED", payload: queue[0]});
		setNextSong(!nextSong);
		// event.target.pauseVideo()
	};


	const options = {
		height: "548",
		width: "900",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
			controls: 1,
		},
	};

	if (!queue[0]) {
		return (
			<Container maxWidth={"md"} sx={{ pt: 3 }}>
				<h1>Join code: {seshInfo.sesh_code}</h1>
				<Box
					sx={{ height: 550, width: "900", boxShadow: 19 }}
				>
					<Skeleton
						sx={{
							height: 550,
							width: "900",

						}}
						animation="wave"
						variant="rectangular"
					/>
				</Box>
				<h1>WAITING FOR PLAYERS TO JOIN</h1>
			</Container>
		);
	} else {
		return (
			<Container maxWidth={"md"} sx={{ pt: 3 }}>
				<h1>Join code: {seshInfo.sesh_code}</h1>
				{nextSong ? (
					<div>
						<YouTube
							videoId={queue[0]?.url}
							opts={options}
							onReady={handleReady}
							onPlay={handlePlay}
							onEnd={handleEnd}
						/>
					</div>
				) : (
					<div>
						<YouTube
							videoId={queue[0]?.url}
							opts={options}
							onReady={handleReady}
							onPlay={handlePlay}
							onEnd={handleEnd}
						/>
					</div>
				)}

				{queue[1] ? (
					<div>
						<h2>
							{queue[1].name} with {queue[1].title} by
							{queue[1].artist}
						</h2>
					</div>
				) : (
					<h1>WAITING FOR MORE PLAYERS</h1>
				)}
			</Container>
		);
	}
}

export default MainDisplay;

