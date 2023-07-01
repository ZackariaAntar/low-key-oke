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
} from "@mui/material";

function HostDash(){
    const dispatch = useDispatch()
    const seshInfo = useSelector((store) => store.seshInfo)
    const queue = useSelector((store) => store.queue)
    const user = useSelector((store) => store.user)

    useEffect(()=>{
        dispatch({type: "FETCH_CURRENT_SESSION", payload: user.id});
        dispatch({ type: 'FETCH_QUEUE', payload: user.id });
    }, [queue])

    return (
		<Container
			maxWidth={"sm"}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				pt: 3,
			}}
		>
			<h2>SESSION CODE: {seshInfo.sesh_code}</h2>
			<div>
				<h2>Setup instructions</h2>
				<p>Instructions go here!</p>
			</div>
			<div>
				<h1>Open main display in a new tab</h1>
				<Button
					variant={"contained"}
					component={Link}
					to="/main-display"
				>
					MAIN DISPLAY
				</Button>
			</div>
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

			<Button
				sx={{ my: 8 }}
				variant="contained"
				color="error"
				onClick={() =>
					dispatch({ type: "LEAVE_SESSION", payload: user.id })
				}
			>
				LEAVE CURRENT SESSION
			</Button>
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