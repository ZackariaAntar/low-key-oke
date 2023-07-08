import React from 'react';

import {Container, Grid, Button, Box, Typography, Chip} from '@mui/material'
import { Padding } from '@mui/icons-material';

const center = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
};

const chipSx = {
	fontSize: "2rem",
	my: 1,
	bgcolor: "#4b00a1",
	color: "#F2F2F2",
	height: 50,
};

function AboutPage() {
  return (
		<Container maxWidth="lg">
			<Typography sx={{ mb: 2 }} align="center" variant="h4">
				About this project
			</Typography>
			<Grid container spacing={1}>
				<Grid
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					item
					sx={{ my: 2 }}
				>
					<Container sx={center}>
						<Box
							sx={{
								width: 300,
								height: "100%",
								p: 2,
								backgroundColor: "purple",
							}}
						>
							<Typography variant="h2">Zackaria Antar</Typography>
						</Box>
						<Button variant="contained" sx={{ mx: 2, my: 2 }}>
							Github
						</Button>
						<Button variant="contained" sx={{ mx: 2, my: 2 }}>
							LinkedIn
						</Button>
					</Container>
				</Grid>

				<Grid xs={12} sm={4} md={4} lg={4} xl={6} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Typography align="center" variant="h3">
							Technologies
						</Typography>
						<Box
							sx={{
								width: 300,
								height: "100%",
								p: 2,
								display: "flex",
								flexDirection: "column",
								fontSize: "1.5rem",
							}}
						>
							<Chip
								align="center"
								label="React"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Node"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Express"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Material UI"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="YouTube API"
								sx={chipSx}
							></Chip>
						</Box>
					</Container>
				</Grid>
				<Grid xs={12} sm={4} md={4} lg={4} xl={6} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Typography align="center" variant="h3">
							Future Features
						</Typography>
						<Box
							sx={{
								width: 300,
								height: "100%",
								p: 2,
							}}
						>
							<Typography align="center" variant="h4">
								Auto adding from favorites
							</Typography>
							<Typography align="center" variant="h4">
								Mobile app
							</Typography>
						</Box>
					</Container>
				</Grid>

				<Grid xs={12} sm={4} md={4} lg={4} xl={6} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Typography align="center" variant="h3">
							Thanks
						</Typography>
						<Box
							sx={{
								width: 300,
								height: "100%",
								p: 2,
							}}
						>
							<Typography align="center" variant="h4">
								Diamond Cohort
							</Typography>
							<Typography
								align="center"
								variant="h4"
							></Typography>
						</Box>
					</Container>
				</Grid>
			</Grid>
		</Container>
  );
}

export default AboutPage;
