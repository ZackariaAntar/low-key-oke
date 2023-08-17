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
	  setUsername("");
	  setPassword("");

    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
		<>
			{errors.loginMessage && (
				<h3 className="alert" role="alert">
					{errors.loginMessage}
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
						Login to your account
					</Typography>
					<Box
						component="form"
						onSubmit={login}
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
		</>
  );
}

export default LoginForm;
