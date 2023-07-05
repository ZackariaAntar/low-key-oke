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
		dispatch({ type: "FETCH_QUEUE", payload: user.id });
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
				maxWidth={"lg"}
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
						bgcolor: "#4b00a1",
						mb: 5,
						borderRadius: 8,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
							my: 5,
						}}
					>
						<Typography variant="h2" fontWeight={"bolder"}>
							Join Code: {seshInfo.sesh_code}
						</Typography>
					</CardContent>
				</Card>

					<iframe
						src="https://app.vectary.com/p/60KYJOcTemYivf16kgsiUw"
						frameborder="0"
						width="100%"
						height="550"
					></iframe>


				<Card
					elevation={10}
					sx={{
						bgcolor: "#4b00a1",
						mt: 5,
						px: 8,
						py: 4,
						borderRadius: 8,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
						}}
					>
						<Typography variant="h3" fontWeight={"bolder"}>
							No songs in the queue
						</Typography>
					</CardContent>
				</Card>
			</Container>
		);
	} else {
		return (
			<Container
				maxWidth={"lg"}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					pt: 1,
				}}
			>
				<Card
					elevation={10}
					sx={{
						bgcolor: "#4b00a1",
						mb: 5,
						borderRadius: 8,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
							px: 10,
							my: 5,
						}}
					>
						<Typography variant="h2" fontWeight={"bolder"}>
							Join Code: {seshInfo.sesh_code}
						</Typography>
					</CardContent>
				</Card>
				<Box>
					<YouTube
						key={nextSong}
						videoId={queue[0]?.url}
						opts={options}
						onReady={handleReady}
						onPlay={handlePlay}
						onEnd={handleEnd}
					/>
				</Box>

				{queue[1] ? (
					<Card
						elevation={20}
						sx={{
							bgcolor: "#4b00a1",
							mt: 5,
							px: 8,
							py: 4,
							borderRadius: 8,
						}}
					>
						<CardContent
							sx={{
								textAlign: "center",
								color: "#F2F2F2",
							}}
						>
							<Typography variant="h3" fontWeight={"bolder"}>
								{`${queue[1].name}'s on deck with "${queue[1].title}"`}
							</Typography>
						</CardContent>
					</Card>
				) : (
					<Card
						elevation={10}
						sx={{
							bgcolor: "#4b00a1",
							mt: 5,
							px: 8,
							py: 4,
							borderRadius: 8,
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

