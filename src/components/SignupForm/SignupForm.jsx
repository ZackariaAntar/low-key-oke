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
	const errors = useSelector((store) => store.errors);
	const loading = useSelector((store) => store.loading);

	useEffect(() => {
		dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });
		dispatch({ type: "FETCH_QUEUE", payload: user.id });
	}, [loading]);

	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [open, setOpen] = useState(false);

	const waitForSuccess = (e) => {
		e.preventDefault();
		if (title && artist) {
			setTitle('')
			setArtist('')
			setOpen(!open);
			const queueItem = {
				sesh_code: seshInfo.sesh_code,
				user_id: user.id,
				name: user.username,
				title: title,
				artist: artist,
			};
			dispatch({ type: "POST_TO_QUEUE", payload: queueItem });

		}
	};
	console.log(title, artist);



	//TODO REFACTOR GUEST VIEWS

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
					<CardHeader title={"Sign-up to sing!"} align={"center"} />
					<Typography sx={{ ml: 1 }} align={"center"}>
						What's it going to be, {user.username}?
					</Typography>
					<form>
						<TextField
							placeholder="Enter a song title"
							required
							name="title"
							error={!title}
							sx={{ bgcolor: "white" }}
							type="text"
							margin="normal"
							fullWidth
							label="Song Title"
							value={title}
							helperText={
								!title && "A song title is required to submit"
							}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<TextField
							placeholder="Enter the artist of that song"
							required
							name="artist"
							error={!artist}
							sx={{ bgcolor: "white" }}
							type="text"
							margin="normal"
							fullWidth
							label="Artist"
							value={artist}
							helperText={
								!artist &&
								"An artist name is required to submit"
							}
							onChange={(e) => setArtist(e.target.value)}
						/>
						{/* <TextField
							sx={{ bgcolor: "white" }}
							type="url"
							margin="normal"
							fullWidth
							id="password"
							label="Direct URL of song from Stingray Karaoke on YouTube"
							value={url}
							onChange={(e) => {
								setUrl(e.target.value);
							}}
						/> */}
						<CardActions onClick={waitForSuccess}>
							<Button
								type="submit"
								sx={{ m: 2 }}
								variant="contained"
								size="large"
								// component={Link}
								// to="/my-queue"
							>
								Submit
							</Button>
						</CardActions>
					</form>
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
								>
									{/* <CardContent
										ssx={{
											textAlign: "center",
											color: "#4b00a1",
											mx: 0.25,
											mt: 1,
											width: "80%",
										}}
									>
										<Typography
											variant="subtitle1"
											component="div"
										>
											{item.title}
										</Typography>
									</CardContent> */}
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
												height: 150,
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
									</CardContent>
								</Card>
							))}
						</DialogContent>

						<DialogContentText id="alert-dialog-description">
							Great choice by the way!
						</DialogContentText>
					</DialogContent>
				)}
				<DialogActions
					sx={{
						my: 1,
						display: "flex",
						flexDirection: "column",
					}}
				>
					{!loading.loading ? (
						<Button
							variant="contained"
							sx={{ my: 1 }}
							disabled={loading.loading}
							component={Link}
							to="/my-queue"
							onClick={() => setOpen(!open)}
							autoFocus
						>
							Go to my queue
						</Button>
					) : (
						<></>
					)}
				</DialogActions>
			</Dialog>

			<BottomNav />
		</Container>
	);
}
export default SignupForm;

	{
		/* <Container maxWidth={"xs"} sx={{ my: 1 }}>
				<Card
					elevation={3}
					sx={{
						mb: 2,
						color: "#F2F2F2",
						bgcolor: "#4b00a1",
						borderRadius: 4,
					}}
				>
					<CardHeader
						title={`Your session: ${seshInfo.sesh_code}`}
						align={"center"}
					/>
				</Card>
			</Container> */
	}