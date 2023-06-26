import { Button, Container } from "@mui/material";
import {Link} from 'react-router-dom'

function HostDash(){
    const placeholder = [{id:1, name:'blah', artist:'blah', url:'https://www.youtube.com/watch?v=KZnou4zthz4'}]
    return (
		<>
			<Container maxWidth={'md'}>
				<h1>Setup instructions</h1>
				<p>Instructions go here!</p>

			<div>
				<h1>Open main display in a new tab</h1>
				<Button variant={"contained"} component={Link} to='/main-display'  >MAIN DISPLAY</Button>
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
						{placeholder.map((song) => (
							<tr key={song.id}>
								<td>{song.id}</td>
								<td>Playername</td>
								<td>
									{song.name} {song.artist}
								</td>
								<td>{song.url}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
            </Container>
		</>
	);
}

export default HostDash;