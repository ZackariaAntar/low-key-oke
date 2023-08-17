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
	CardActionArea,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Collapse,
	Divider
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import BottomNav from "../BottomNav/BottomNav";

function SignupForm() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);
	const seshInfo = useSelector((store) => store.seshInfo);
	const loading = useSelector((store) => store.loading);
	const faves = useSelector((store) => store.faves);

	useEffect(() => {
		dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });
		dispatch({ type: "FETCH_QUEUE", payload: user.id });
		dispatch({ type: "FETCH_MY_FAVORITES", payload: user.id });
	}, [loading]);

	const [title, setTitle] = useState("");
	const [songInfo, setSongInfo] = useState("");
	const [url, setUrl] = useState("");
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [help, setHelp] = useState(false);
	const flip = {
		open: {
			transform: "rotate(180deg)",
		},
		close: {
			transform: "rotate(0)",
		},
	};
	const icon = {
		fontSize: ".8rem",
		display: "flex",
		flexDirection: "column",
		color: "#4b00a1",
	};

	const text = { marginTop: .75 };

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
		}else{
			const queueItem = {
				sesh_code: seshInfo.sesh_code,
				user_id: user.id,
				name: user.username,
				title: vid.title,
				url: vid.url,
			};
			dispatch({
				type: "POST_TO_QUEUE",
				payload: queueItem,
			});
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
					<CardHeader
						sx={{ mt: -3 }}
						title={"Sign up to sing!"}
						align={"center"}
					/>
					<Typography sx={{ ml: 1, mt: -1.5 }} align={"center"}>
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
							<CardContent
								fullWidth
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems:'flex-start',
									justifyContent:'center',
									mb:-2
								}}
							>
								<Button
									id="simplePost"
									onClick={() => simplePost(songInfo, url)}
									sx={{ ml:-1.55, mb: 4, width:'50%', p:1}}
									variant="contained"
									size="small"
									component={Link}
									to="/my-queue"
								>
									Add to Queue
								</Button>
								<CardContent
									sx={{
										mt:-2,
										ml: -1.5,
										p:0,
										border: "1px solid green",
									}}
								>
									<CardActionArea
										disableRipple
										onClick={() => setHelp(!help)}
									>
										<IconButton
											sx={{
												color: "#4b00a1",
												mt: -1,
												mb: -4,
											}}
											disableRipple
										>
											{!help ? (
												<Typography
													sx={{ color: "#4b00a1" }}
													variant="caption"
												>
													How to find direct url
												</Typography>
											) : (
												<Typography
													sx={{ color: "#4b00a1" }}
													variant="caption"
												>
													Close
												</Typography>
											)}
											<ExpandMoreIcon
												sx={
													!help
														? flip.close
														: flip.open
												}
											/>
										</IconButton>
									</CardActionArea>
								</CardContent>
							</CardContent>
							<Collapse in={help} timeout="auto" unmountOnExit>
								<Typography ml paragraph variant="caption">
									{`1) Find your song on YouTube`} {<br />}
									{`2) Click on the share icon`} {<br />}
									{`3) Click copy link`} {<br />}
									{`4) Paste link above`}
								</Typography>
							</Collapse>
						</Box>
					)}
					{faves.length > 0 && (
						<CardActionArea
							sx={{ mt: 0 }}
							onClick={() => setExpanded(!expanded)}
						>
							<IconButton sx={{ color: "#4b00a1" }} disableRipple>
								{!expanded ? (
									<Typography
										sx={{ color: "#4b00a1" }}
										variant="h6"
									>
										Choose from favorites instead
									</Typography>
								) : (
									<Typography
										sx={{ color: "#4b00a1" }}
										variant="h6"
									>
										Close
									</Typography>
								)}
								<ExpandMoreIcon
									sx={!expanded ? flip.close : flip.open}
								/>
							</IconButton>
						</CardActionArea>
					)}
					<Collapse
						in={expanded}
						timeout="auto"
						unmountOnExit
						sx={{
							maxHeight: "200px",
							overflow: "auto",
							border: "1px solid #4b00a1",
							borderTop: 0,
							borderBottom: 0,
						}}
					>
						{faves &&
							faves.map((favSong, i) => (
								<>
									<CardContent
										key={favSong.id}
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<Typography variant="body">
											{favSong.title}
										</Typography>

										<IconButton
											size="small"
											sx={icon}
											component={Link}
											to="/my-queue"
										>
											<PlaylistAddIcon />
											<div style={text}>Add to Queue</div>
										</IconButton>

										{/* <IconButton
											component={Link}
											to="/my-queue"
											variant="contained"
											// sx={{
											// 	mt: 2,
											// 	width: "50%",
											// 	p: 0.5,
											// }}
											onClick={() => postToQueue(favSong)}
										>
											<PlaylistAddIcon />
											Sing Again
										</IconButton> */}
									</CardContent>
									<Divider variant="middle" />
								</>
							))}
					</Collapse>
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