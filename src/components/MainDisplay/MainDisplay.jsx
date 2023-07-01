import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import {
	Container,
	Button,
	Skeleton,
	Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	CardActions,
} from "@mui/material";
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

	const [nextSong, setNextSong] = useState(0);

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
		// setNextSong(!nextSong);
	};
	const handleEnd = () => {
		console.log("ended");
		dispatch({ type: "MARK_SONG_AS_COMPLETED", payload: queue[0]});
		setNextSong(nextSong+1);
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
			<Container
				maxWidth={"md"}
				ssx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					pt: 1,
				}}
			>
				<Card
					elevation={10}
					sx={{
						alignSelf: "center",
						bgcolor: "#4b00a1",
						my: 3,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
						}}
					>
						<Typography variant="h3" fontWeight={"bolder"}>
							Join Code: {seshInfo.sesh_code}
						</Typography>
					</CardContent>
				</Card>
				<Box sx={{ height: 550, width: "900", boxShadow: 19 }}>
					<Skeleton
						sx={{
							height: 550,
							width: "900",
						}}
						animation="wave"
						variant="rectangular"
					/>
				</Box>
				<Card
					elevation={10}
					sx={{
						alignSelf: "center",
						bgcolor: "#4b00a1",
						my: 3,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
						}}
					>
						<Typography variant="h1" fontWeight={"bolder"}>
							WAITING FOR PLAYERS TO JOIN
						</Typography>
					</CardContent>
				</Card>
			</Container>
		);
	} else {
		return (
			<Container
				maxWidth={"md"}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					pt: 1,
				}}
			>
				<Card
					elevation={10}
					sx={{
						alignSelf: "center",
						bgcolor: "#4b00a1",
						my: 3,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
						}}
					>
						<Typography variant="h3" fontWeight={"bolder"}>
							Join Code: {seshInfo.sesh_code}
						</Typography>
					</CardContent>
				</Card>
				<div>
					<YouTube
						key={nextSong}
						videoId={queue[0]?.url}
						opts={options}
						onReady={handleReady}
						onPlay={handlePlay}
						onEnd={handleEnd}
					/>
				</div>
				{queue[1] ? (
					<Card
						elevation={10}
						sx={{
							alignSelf: "center",
							bgcolor: "#4b00a1",
							my: 3,
						}}
					>
						<CardContent
							sx={{
								textAlign: "center",
								color: "#F2F2F2",
							}}
						>
							<Typography variant="h4" fontWeight={"bolder"}>
								{`${queue[1].name} is on deck with "${queue[1].title}" by ${queue[1].artist}`}
							</Typography>
						</CardContent>
					</Card>
				) : (
					<Card
						elevation={10}
						sx={{
							alignSelf: "center",
							bgcolor: "#4b00a1",
							my: 3,
						}}
					>
						<CardContent
							sx={{
								textAlign: "center",
								color: "#F2F2F2",
							}}
						>
							<Typography variant="h3" fontWeight={"bolder"}>
								Nobody's on deck 😢
							</Typography>
						</CardContent>
					</Card>
				)}
			</Container>
		);
	}
}

export default MainDisplay;

// {
// 	nextSong ? (
// 		<div>
// 			<YouTube
// 				key={nextSong}
// 				videoId={queue[0]?.url}
// 				opts={options}
// 				onReady={handleReady}
// 				onPlay={handlePlay}
// 				onEnd={handleEnd}
// 			/>
// 		</div>
// 	) : (
// 		<div>
// 			<YouTube
// 				videoId={queue[0]?.url}
// 				opts={options}
// 				onReady={handleReady}
// 				onPlay={handlePlay}
// 				onEnd={handleEnd}
// 			/>
// 		</div>
// 	);
// }