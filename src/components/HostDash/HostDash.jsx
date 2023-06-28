import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

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
		<>
			<div>
                <h1>CURRENT SESSION CODE IS {seshInfo.sesh_code}</h1>
				<h1>Setup instructions</h1>
				<p>Instructions go here!</p>
			</div>
			<div>
				<h1>Open main display in a new tab</h1>
				<Button variant={"contained"} component={Link} to='/main-display'>MAIN DISPLAY</Button>
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
						{queue && queue.map((song) => (
							<tr key={song.id}>
								<td>{song.queue_order}</td>
								<td>{song.user_id}</td>
								<td>
									{song.title} by { song.artist}
								</td>
								<td>{song.url}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
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