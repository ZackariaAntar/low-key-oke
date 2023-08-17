import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function PremiumRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER_PREMIUM',
      payload: {
        username: username,
        password: password,
		premium: true
      },
    });
  }; // end registerUser

  return (
		<>
			{errors.registrationMessage && (
				<h3 className="alert" role="alert">
					{errors.registrationMessage}
				</h3>
			)}
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography align='center' variant="h5">
						Welcome to the inner circle, register for a premium account.
					</Typography>
					<Typography align='center' mt variant="h6">
						Next time we hang, just login.
					</Typography>
					<Box
						component="form"
						onSubmit={registerUser}
						sx={{ mt: 1 }}
						autoComplete="off"
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							value={username}
							label="Username"
							name="username"
							autoFocus
							onChange={(event) =>
								setUsername(event.target.value)
							}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							value={password}
							label="Password"
							type="password"
							id="password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, p: 2 }}
						>
							Register
						</Button>
					</Box>
				</Box>
			</Container>
		</>
  );
}

export default PremiumRegisterForm;
