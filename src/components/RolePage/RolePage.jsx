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


function RolePage(){
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch({ type: "FETCH_CURRENT_SESSION" });
	}, []);
	const user = useSelector((store) => store.user);
    const seshInfo = useSelector((store) => store.seshInfo)

    const [joinCode, setJoinCode] = useState('')
    const [toggle, setToggle] = useState(false)

	const makeHost = () => {
		dispatch({ type: "MAKE_HOST", payload: user.id });
	};

	const makeGuest = (event) => {
        event.preventDefault();
        setToggle(!toggle)
		dispatch({
			type: "MAKE_GUEST",
			payload: { user_id: user.id, sesh_code: joinCode },
		});
        setJoinCode('')
	};

	return (
		<Container maxWidth={"xs"}>
			<h1>Participate</h1>
            <h1>{seshInfo.sesh_code}</h1>
			<div>
				<Button variant="contained" onClick={makeHost}>
					HOST
				</Button>
				<Button variant="contained" onClick={()=>setToggle(!toggle)} >GUEST</Button>
				<Dialog open={toggle} onClose={()=>setToggle(!toggle)}>
					<DialogTitle>Please enter the join code for your session</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Look for the 5 digit alphanumeric code being broadcast by your host and enter it in the field below.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Join Code:"
							type="text"
							fullWidth
							variant="standard"
                            onChange={(e)=>setJoinCode(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={()=>setToggle(!toggle)}>Cancel</Button>
						<Button onClick={makeGuest}>JOIN YOUR PARTY</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Container>
	);
}
export default RolePage;