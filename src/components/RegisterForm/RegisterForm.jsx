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

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
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
					<Typography component="h1" variant="h5">
						Register for an account
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

export default RegisterForm;
