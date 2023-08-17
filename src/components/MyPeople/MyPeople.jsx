import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import PremiumRegisterForm from '../PremiumRegisterForm/PremiumRegisterForm';
import {
	Button,
	TextField,
	FormControlLabel,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	Alert,
} from "@mui/material";

function MyPeople(){
    const dispatch = useDispatch()
    const [proven, setProven]=useState('')
    const verified = useSelector((store)=> store.verified)
    const errors = useSelector((store)=> store.errors)

    const verify = (e) => {
        e.preventDefault()
        dispatch({type:'VERIFY', payload: {homie: proven}})
        setProven('')
    }

    return (
		<Container maxWidth="xs">
			{errors.verificationMessage && (
				<h3 className="alert" role="alert">
					{errors.verificationMessage}
				</h3>
			)}
			{verified ? (
				<PremiumRegisterForm />
			) : (
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography align="center" variant="h5">
						Thanks for all of your support, now let's get this party
						started!!
					</Typography>
					<Box
						component="form"
						onSubmit={verify}
						sx={{ mt: 4 }}
						autoComplete="off"
					>
						<TextField
							margin="normal"
							required
							fullWidth
							name="verify"
							value={proven}
							label="Use the secret code I sent you"
							type="password"
							id="verification"
							helperText="Check your texts or come find me"
							onChange={(event) => setProven(event.target.value)}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, p: 2 }}
						>
							Verify
						</Button>
					</Box>
				</Box>
			)}
		</Container>
	);
}
export default MyPeople
