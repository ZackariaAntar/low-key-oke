import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import{Container} from '@mui/material'

function HostDash(){
    const dispatch = useDispatch()
    const seshInfo = useSelector((store) => store.seshInfo)
    const queue = useSelector((store) => store.queue)
    const user = useSelector((store) => store.user)

    useEffect(()=>{
        dispatch({type: "FETCH_CURRENT_SESSION", payload: user.id});
        dispatch({ type: 'FETCH_QUEUE', payload: user.id });
    }, [])

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

			<div>
				<h1>Song queue</h1>
				<table>
					<thead>
						<tr>
							<th>Order</th>
							<th>Player Name</th>
							<th>Song Title</th>
							<th>Source</th>
						</tr>
					</thead>
					<tbody>
						{queue &&
							queue.map((song) => (
								<tr key={song.id}>
									<td>{song.queue_order}</td>
									<td>{song.name}</td>
									<td>
										{song.title} by {song.artist}
									</td>
									<td>{song.url}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>


				<Button sx={{ my: 8 }} variant="contained" color="error">
					LEAVE CURRENT SESION
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