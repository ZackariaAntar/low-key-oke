import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {
	Button,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Typography,
	Grid,
	Box
} from "@mui/material";

function HostDash(){
    const dispatch = useDispatch()
    const seshInfo = useSelector((store) => store.seshInfo)
    const queue = useSelector((store) => store.queue)
    const user = useSelector((store) => store.user)

    useEffect(()=>{
        dispatch({type: "FETCH_CURRENT_SESSION", payload: user.id});
        dispatch({ type: 'FETCH_QUEUE', payload: user.id });
    }, [])

	const fetchQueue = () => {
		console.log("fetch queue");
		const fetchUserQueue = () => {
			dispatch({ type: "FETCH_QUEUE", payload: user.id });
		};

		useEffect(() => {
			const timer = setInterval(fetchUserQueue, 5000);

			return () => clearInterval(timer);
		}, [dispatch, user]);
	};

	fetchQueue(user);

    return (
		<Container
			maxWidth={"xl"}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				pt: 3,
			}}
		>
			<h2>Current session: {seshInfo.sesh_code}</h2>
			<div>
				<h2>Setup instructions</h2>
				<p>
					For the best overall experience, consider adding and
					enabling an extension to block ads on your browser such as:
				</p>
				<li>uBlock Origin</li>
				<li>Ghostery</li>
				<li>AdBlock</li>

				<Grid container spacing={1} sx={{ mt: 3 }}>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Box sx={{ width: "auto", mr: 4 }}>
							<Typography variant="h7" fontWeight={"bold"}>
								Windows (Display setup)
							</Typography>

							<p>
								1. Check the available ports on your computer
								and the external display.
							</p>
							<p>
								2. Connect the computer to the external display
								using the appropriate cable, adapter, or
								wireless method.
							</p>
							<p>
								3. Adjust the display settings by right-clicking
								on the desktop, selecting "Display settings,"
								and making the desired changes.
							</p>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Box sx={{ width: "auto", mr: 4 }}>
							<Typography variant="h7" fontWeight={"bold"}>
								Mac (Display setup)
							</Typography>
							<p>
								1. Check the available ports on your computer
								and the external display.
							</p>
							<p>
								2. Connect the computer to the external display
								using the appropriate cable, adapter, or
								wireless method.
							</p>
							<p>
								3. Adjust the display settings by going to the
								Apple menu, selecting "System Preferences,"
								choosing "Displays," and making the desired
								changes.
							</p>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Box sx={{ width: "auto", mr: 4 }}>
							<Typography variant="h7" fontWeight={"bold"}>
								Windows (Audio setup)
							</Typography>
							<p>
								1. For HDMI audio, make sure the HDMI cable is
								securely connected. Right-click on the volume
								icon in the taskbar, select "Open Sound
								settings," and adjust the audio settings
								accordingly.
							</p>
							<p>
								2. For Bluetooth audio, pair your computer with
								a Bluetooth-enabled audio device by going to the
								Settings menu, selecting "Devices," and
								following the instructions to connect the
								desired audio device.
							</p>
							<p>
								3. For wired audio, connect one end of an audio
								cable to the computer's audio output and the
								other end to the external display's audio input.
								Adjust the audio settings in the Sound settings.
							</p>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Box sx={{ width: "auto", mr: 4 }}>
							<Typography variant="h7" fontWeight={"bold"}>
								Mac (Audio setup)
							</Typography>
							<p>
								1. For HDMI audio, make sure the HDMI cable is
								securely connected. Go to the Apple menu, select
								"System Preferences," choose "Sound," and adjust
								the audio settings accordingly.
							</p>
							<p>
								2. For Bluetooth audio, pair your computer with
								a Bluetooth-enabled audio device by going to the
								Apple menu, selecting "System Preferences,"
								choosing "Bluetooth," and following the
								instructions to connect the desired audio
								device.
							</p>
							<p>
								3. For wired audio, connect one end of an audio
								cable to the computer's audio output and the
								other end to the external display's audio input.
								Adjust the audio settings in the Sound
								preferences.
							</p>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={3} xl={3}></Grid>
					<Grid item xs={12} sm={12} md={4} lg={3} xl={3}></Grid>
				</Grid>
			</div>

			<Box align="center">
				<Typography variant="h7">
					Please note that the specific menu names and options may
					vary slightly depending on your Windows or Mac OS version.
				</Typography>
				<Box sx={{ mt: 8 }}>
					<h2>
						When you're ready, "right-click" MAIN DISPLAY and open
						in a new tab.
					</h2>
					<Button
						variant={"contained"}
						component={Link}
						to="/main-display"
					>
						MAIN DISPLAY
					</Button>
				</Box>
			</Box>

			<h2 style={{ marginTop: 40 }}>Session Queue</h2>
			<TableContainer
				component={Paper}
				elevation={10}
				sx={{ mb: 5, mt: 2 }}
			>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Player Name</TableCell>
							<TableCell align="center">Song</TableCell>
							<TableCell align="center">Video Id</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{queue &&
							queue.map((song) => (
								<TableRow
									key={song.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell align="center">
										{song.name}
									</TableCell>
									<TableCell align="center">
										{song.title} by {song.artist}
									</TableCell>
									<TableCell align="center">
										{song.url}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box align="center">
				<Button
					sx={{ my: 8, width: "40%" }}
					variant="contained"
					color="error"
					onClick={() =>
						dispatch({ type: "LEAVE_SESSION", payload: user.id })
					}
				>
					LEAVE CURRENT SESSION
				</Button>
			</Box>
		</Container>
	);
}

export default HostDash;








// id"
// "current_sesh_id
// "user_id
// "title"
// "artist"
// "url"

// "in_queue"
// "queue_order"
// "favorited"