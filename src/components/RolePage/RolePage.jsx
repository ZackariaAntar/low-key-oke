import { Button, Container, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

function RolePage(){
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)
    const [newCode, setNewCode] = useState('')
    const [toggle, setToggle] = useState(false)

    const handleHost = () =>{
        dispatch({type:"MAKE_HOST", payload: user.id})

    }

    const handleGuest = (event) =>{
        event.preventDefault()
        dispatch({ type: "MAKE_GUEST", payload: {newCode: newCode, user: user.id} });
        setNewCode('')

    }

    return (
		<Container maxWidth={"sm"}>
			<h1>Participate</h1>

				<Button variant="contained" onClick={handleHost}>
					HOST
				</Button>

				<Button variant="contained" onClick={() => setToggle(!toggle)}>
					GUEST
				</Button>

				<Dialog open={toggle} onClose={() => setToggle(!toggle)}>
					<DialogTitle>Enter the code broadcast by your host</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Look for the 5 digit alphanumeric code after "Join Code:" on your host's screen.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Join Code"
                            value={newCode}
							type="text"
							fullWidth
							variant="standard"
                            onChange={(e)=>setNewCode(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setToggle(!toggle)}>
							Cancel
						</Button>
						<Button onClick={handleGuest}>Join</Button>
					</DialogActions>
				</Dialog>

		</Container>
	);
}
export default RolePage;
// component={Link} to='/host-dash'
// component={Link} to="/signup"