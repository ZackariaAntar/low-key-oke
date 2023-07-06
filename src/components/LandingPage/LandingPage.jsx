import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import {Link} from 'react-router-dom'

function LandingPage() {
  const [heading, setHeading] = useState('Welcome!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
		<Container maxWidth={"xl"}>
		<Grid container spacing={1} sx={{ mt: 2 }}>
			<Grid
				item
				xs={12}
				sm={4}
				md={4}
				lg={6}
				xl={6}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",

				}}
			>
				<Typography component={'h1'} variant="h4" sx={{textAlign:'center'}}>
					This is low-key-oke! The worlds best at home karaoke party
					app.
				</Typography>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={6} xl={6}>
				<Container
					maxWidth="sm"
					sx={{ display: "flex", flexDirection: "column" }}
				>
					<RegisterForm />
					<Container
						maxWidth="xs"
						sx={{ display: "flex", flexDirection: "column" }}
					>
						<Typography
							sx={{ mt: 5, mb: 3 }}
							align="center"
							variant="h6"
						>
							Already a Member?
						</Typography>
						<Button
							component={Link}
							to="/login"
							color="secondary"
							variant="contained"
							sx={{ p: 1 }}
						>
							Login
						</Button>
						{/* <h4>Already a Member?</h4> */}
						{/* <button className="btn btn_sizeSm" onClick={onLogin}>
                  Login
                </button> */}
					</Container>
				</Container>
			</Grid>
		</Grid>
	</Container>
  );
}

export default LandingPage;
