import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
		<>
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
						Login to your account
						{errors.loginMessagee && (
							<Alert severity="error">
								{errors.loginMessage}
							</Alert>
						)}
					</Typography>
					<Box
						component="form"
						onSubmit={login}
						noValidate
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
							Login
						</Button>
					</Box>
				</Box>
			</Container>

			{/* <form className="formPanel" onSubmit={login}>
				<h2>Login</h2>
				{errors.loginMessage && (
					<h3 className="alert" role="alert">
						{errors.loginMessage}
					</h3>
				)}
				<div>
					<label htmlFor="username">
						Username:
						<input
							type="text"
							name="username"
							required
							value={username}
							onChange={(event) =>
								setUsername(event.target.value)
							}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="password">
						Password:
						<input
							type="password"
							name="password"
							required
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</label>
				</div>
				<div>
					<input
						className="btn"
						type="submit"
						name="submit"
						value="Log In"
					/>
				</div>
			</form> */}
		</>
  );
}

export default LoginForm;
