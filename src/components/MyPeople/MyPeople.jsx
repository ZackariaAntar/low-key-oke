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
						marginTop: 6,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography align="center" variant="h5" paragraph>
						To my friends and family, thanks for your support!
						<br /> <br />
						If we haven't met, I hope you enjoy yourself
						tonight.
					</Typography>
					<Typography
						sx={{ mt: 2, color: "purple", fontWeight:'bold' }}
						align="center"
						variant="caption"
					>This is only for registration, just login next time!
					</Typography>
					<Box component="form" onSubmit={verify} autoComplete="off">
						<TextField
							margin="normal"
							required
							fullWidth
							name="verify"
							value={proven}
							label="Use the code I shared with you here!"
							type="password"
							id="verification"
							helperText="If you need the code, try asking someone nearby first, or look for a tall bearded person and tell them you need the code."
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
