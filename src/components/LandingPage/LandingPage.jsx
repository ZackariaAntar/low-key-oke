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
		<Container maxWidth={"lg"}>
			<Grid container spacing={1} sx={{ mt: 2 }}>
				<Grid
					item
					xs={12}
					sm={12}
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
					<Box
					sx={{width:'75%'}}
					>

					<Typography
						variant="h4"
						sx={{ textAlign: "center" }}
					>
						Grab the mic, feel the groove, whenever you're ready
						just join the queue!
					</Typography>
					<Typography
						variant="h4"
						sx={{ textAlign: "center", mt:3}}
					>
						From crowd favorites to hidden
						gems, low-key-oke's more fun with friends.
					</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
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
						</Container>
					</Container>
				</Grid>
			</Grid>
		</Container>
  );
}

export default LandingPage;
