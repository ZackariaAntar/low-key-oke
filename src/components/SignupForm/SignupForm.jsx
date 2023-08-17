import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import getYouTubeID from "get-youtube-id";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	CardMedia,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BottomNav from "../BottomNav/BottomNav";

function SignupForm() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);
	const seshInfo = useSelector((store) => store.seshInfo);
	const loading = useSelector((store) => store.loading);

	useEffect(() => {
		dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });
		dispatch({ type: "FETCH_QUEUE", payload: user.id });
	}, [loading]);

	const [title, setTitle] = useState("");
	const [songInfo, setSongInfo] = useState("");
	const [url, setUrl] = useState("");
	const [open, setOpen] = useState(false);

	const waitForSuccess = (e) => {
		e.preventDefault();
		if (title && title !== " ") {
			setOpen(!open);
			const queueItem = {
				title: title,
			};
			dispatch({ type: "SEARCH_YOUTUBE", payload: queueItem });

		}
	};

	const postToQueue = (vid) =>{
		if(user.premium){
			const queueItem = {
				sesh_code: seshInfo.sesh_code,
				user_id: user.id,
				name: user.username,
				title: vid.title,
				url: vid.videoId,
			};
			dispatch({
				type: "POST_TO_QUEUE",
				payload: queueItem,
			});
			setTitle("");
			setArtist("");
		}

	}

	const simplePost = (info, vid) =>{
		const vidId = getYouTubeID(vid)
			const queueItem = {
				sesh_code: seshInfo.sesh_code,
				user_id: user.id,
				name: user.username,
				title: info,
				url: vidId,
			}
			dispatch({
				type: "POST_TO_QUEUE",
				payload: queueItem
			});

			setSongInfo("");
			setUrl("");
		}


	return (
		<Container
			maxWidth={"sm"}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Card
				elevation={19}
				sx={{
					mb: 2,
					bgcolor: "#F2F2F2",
					color: "#4b00a1",
					borderRadius: 4,
				}}
			>
				<CardContent>
					<CardHeader sx={{mt:-3}} title={"Sign-up to sing!"} align={"center"} />
					<Typography sx={{ ml: 1 }} align={"center"}>
						What's it going to be, {user.username}?
					</Typography>
					{user.premium ? (
						<Box
							component="form"
							onSubmit={waitForSuccess}
							sx={{ mt: 1 }}
							autoComplete="off"
						>
							<TextField
								placeholder="Search for a song title or artist"
								required
								name="title"
								// error={!title}
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="Search"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<Button
								type="submit"
								sx={{ m: 2 }}
								variant="contained"
								size="large"
							>
								search
							</Button>
						</Box>
					) : (
						<Box
							sx={{ mt: 1 }}
							component={"form"}
							autoComplete="off"
						>
							<TextField
								placeholder="eg: Title by Artist"
								required
								name="song info"
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="Title & Artist"
								value={songInfo}
								onChange={(e) => setSongInfo(e.target.value)}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								sx={{ bgcolor: "white" }}
								type="url"
								placeholder="eg: https://youtu.be/xxxxxxxxxxx"
								required
								margin="normal"
								fullWidth
								id="password"
								label="Direct URL from Stingray Karaoke on YouTube"
								value={url}
								onChange={(e) => {
									setUrl(e.target.value);
								}}
								InputLabelProps={{ shrink: true }}
							/>
							<Typography ml paragraph variant="body">
								{`1) Find your song on YouTube`} {<br />}
								{`2) Click on the share icon`} {<br />}
								{`3) Click copy link`} {<br />}
								{`4) Paste link above`}
							</Typography>
							<Button
								id="simplePost"
								onClick={() => simplePost(songInfo, url)}
								sx={{ m: 2 }}
								variant="contained"
								size="large"
								component={Link}
								to="/my-queue"
							>
								Add to Queue
							</Button>
						</Box>
					)}
				</CardContent>
			</Card>
			<Dialog
				open={open}
				onClose={() => setOpen(!open)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					align="center"
					id="alert-dialog-title"
					sx={{ p: 2 }}
				>
					<DialogContent>
						<IconButton
							aria-label="close"
							onClick={() => setOpen(!open)}
							size="large"
							sx={{
								position: "absolute",
								right: 4,
								top: 4,
								color: "black",
							}}
						>
							<CloseOutlinedIcon />
						</IconButton>
					</DialogContent>
					{loading.blurb}
				</DialogTitle>
				{loading.loading ||
				loading.blurb ===
					"Sorry, we couldn't find the song you were looking for, please try again." ? (
					<DialogContent
						align="center"
						sx={{
							my: 1,
						}}
					>
						<ScaleLoader
							loading={loading.loading}
							color="#4b00a1"
							height={75}
							margin={4}
							radius={4}
							speedMultiplier={0.5}
							width={6}
						/>
					</DialogContent>
				) : (
					<DialogContent align="center">
						<DialogContent>
							{loading.data.map((item) => (
								<Card
									sx={{
										bgcolor: "#F2F2F2",
										my: 4,
										borderRadius: 2,
										display: "flex",
									}}
									key={item.videoId}
									elevation={8}
								>
									<CardContent
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											textAlign: "justify center",
											fontWeight: "bolder",
											width: "90%",
										}}
									>
										<CardMedia
											component="img"
											sx={{
												objectFit: "contain",
												height: 120,
												width: "100%",
											}}
											image={item.pic}
											alt="Yotube video thumbnail"
										/>
										<Typography
											variant="caption2"
											sx={{ mt: 2 }}
										>
											{item.title}
										</Typography>
										<CardActions
											sx={{
												justifyContent: "center",
												mt: 1,
											}}
										>
											<Button
												component={Link}
												to="/my-queue"
												onClick={() =>
													postToQueue(item)
												}
												variant="contained"
											>
												Add to queue
											</Button>
										</CardActions>
									</CardContent>
								</Card>
							))}
						</DialogContent>
					</DialogContent>
				)}
			</Dialog>

			<BottomNav />
		</Container>
	);
}
export default SignupForm;