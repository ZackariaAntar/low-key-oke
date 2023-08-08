import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	IconButton,
	Divider,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Card,
	CardContent,
	Typography,
} from "@mui/material";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BottomNav from "../BottomNav/BottomNav";

function MyQueuePage() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const mySongs = useSelector((store) => store.mySongs);

	const [toggle, setToggle] = useState(false);
	let [propId, setPropId] = useState({});
	useEffect(() => {
		dispatch({ type: "FETCH_MY_CURRENT_SESSION_SONGS", payload: user.id });
	}, []);

	const fetchMyQueue = () => {
		console.log("fetch my current session songs");
		const fetchUserQueue = () => {
			dispatch({
				type: "FETCH_MY_CURRENT_SESSION_SONGS",
				payload: user.id,
			});
		};

		useEffect(() => {
			const timer = setInterval(fetchUserQueue, 6000);

			return () => clearInterval(timer);
		}, [dispatch, user]);
	};

	fetchMyQueue(user);

	const deleteMySongFromQueue = (obj) => {
		dispatch({ type: "DELETE_FROM_MY_QUEUE", payload: obj });
		console.log("obj", obj);
		setToggle(!toggle);
		setPropId(null);
	};
	const activateDialog = (value) => () => {
		setPropId(value);
		setToggle(!toggle);
	};
	console.log(propId);

	return (
		<Container maxWidth={"xs"} sx={{ pt: 3 }}>

			{mySongs.length !== 0 ? (
				<div>
					{mySongs.map((song, i) => (
						<>
							<Card
								elevation={10}
								sx={{
									bgcolor: "#F2F2F2",
									mt: 2,
									borderRadius: 2,
									display: "flex",
									// mx: "auto",
								}}
								key={song.id}
							>
								<CardContent
									sx={{
										textAlign: "center",
										color: "#4b00a1",
										mx: .25,
										mt: 1,
										width: "100%",
									}}
								>
									<Typography
										sx={{ my: 0.75 }}
										variant="h6"
										fontWeight={"bolder"}
										align="center"
									>
										{song.title}
									</Typography>
								</CardContent>

								<Divider
									orientation="vertical"
									flexItem
									color="#4b00a1"
									sx={{ my: 7 }}
								/>

								<CardContent
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										textAlign: "center",
										width: "40%",
									}}
								>
									<IconButton
										size="large"
										value={song}
										onClick={activateDialog(song)}
									>
										<DeleteForeverRoundedIcon
											sx={{
												color: "#b00000",
												scale: "1.75",
												mb: 0.25,
											}}
										/>
									</IconButton>
									<Typography
										sx={{ color: "#4b00a1" }}
										variant="h7"
										fontWeight={"bolder"}
									>
										Opt out
									</Typography>
								</CardContent>
							</Card>

							<Dialog
								open={toggle}
								onClose={() => setToggle(!toggle)}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
								key={i}
							>
								<DialogTitle
									id="alert-dialog-title"
									sx={{ color: "red", textAlign: "center" }}
								>
									{
										" Removing a song from the queue cannot be undone!"
									}
								</DialogTitle>
								<DialogContent>
									<DialogContentText
										sx={{
											textAlign: "center",
										}}
										id="alert-dialog-description"
									>
										Are you sure that you want to delete
										this song?
									</DialogContentText>
								</DialogContent>
								<DialogActions
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Button
										variant="contained"
										autoFocus
										onClick={() => setToggle(!toggle)}
										sx={{ mb: 5 }}
									>
										Nevermind
									</Button>
									<Button
										variant="outlined"
										color="error"
										sx={{ my: 3 }}
										onClick={() =>
											deleteMySongFromQueue(propId)
										}
									>
										Remove song from my queue
									</Button>
								</DialogActions>
							</Dialog>
						</>
					))}
				</div>
			) : (
				<Card
					elevation={10}
					sx={{
						bgcolor: "#4b00a1",
						mt: 5,
						borderRadius: 4,
					}}
				>
					<CardContent
						sx={{
							textAlign: "center",
							color: "#F2F2F2",
						}}
					>
						<Typography variant="h5" fontWeight={"bolder"}>
							Your queue is empty
						</Typography>
					</CardContent>
				</Card>
			)}
			<BottomNav />
		</Container>
	);
}

export default MyQueuePage;
