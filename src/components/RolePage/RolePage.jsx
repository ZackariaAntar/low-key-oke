import {
	Button,
	Container,
    Dialog,
	TextField,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom'


function RolePage(){
	const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
	const seshInfo = useSelector((store) => store.seshInfo);

	useEffect(() => {
		dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });
	}, []);
    const [joinCode, setJoinCode] = useState('')
    const [toggle, setToggle] = useState(false)

	const makeHost = () => {
		dispatch({ type: "MAKE_HOST", payload: user.id });
	};

	const makeGuest = () => {
        setToggle(!toggle)
		dispatch({
			type: "MAKE_GUEST",
			payload: { user_id: user.id, sesh_code: joinCode },
		});
        setJoinCode('')
	};

	return (
		<Container
			maxWidth={"xs"}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				pt: 1,
			}}
		>
			<Button
				sx={{ p: 2, my: 3 }}
				component={Link}
				to="/host-dash"
				variant="contained"
				onClick={makeHost}
			>
				CREATE A NEW SESSION
			</Button>

			<Button
				sx={{ p: 2,}}
				variant="contained"
				onClick={() => setToggle(!toggle)}
			>
				JOIN AN EXISTING SESSION
			</Button>

			<Dialog open={toggle} onClose={() => setToggle(!toggle)}>
				<DialogTitle>
					Enter code to join your party
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the 5 digit alphanumeric code being broadcast
						by your host in the field below.
					</DialogContentText>
					<TextField
						autoFocus={true}
						margin="dense"
						id="name"
						label="Join Code:"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setJoinCode(e.target.value)}
						autoComplete="off"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setToggle(!toggle)}>Cancel</Button>
					<Button component={Link} to="/signup" onClick={makeGuest}>
						JOIN YOUR PARTY
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
export default RolePage;
