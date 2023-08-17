import React from 'react';

import {Container, Grid, Button, Box, Typography, Chip, Card, CardMedia, CardContent} from '@mui/material'
import headshot from '../../Assets/Headshot.png'
import {Link} from 'react-router-dom'


const center = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
};

const chipSx = {
	fontSize: "2rem",
	my: 1,
	py: 2,
	bgcolor: "#4b00a1",
	color: "#F2F2F2",
	height: "auto",
	"& .MuiChip-label": {
		display: "block",
		whiteSpace: "normal",
	},
};
const thankSx = {
	fontSize: "1.5rem",
	my: 1,
	py: 3,
	bgcolor: "#4b00a1",
	color: "#F2F2F2",
	height: "auto",
	"& .MuiChip-label": {
		display: "block",
		whiteSpace: "normal",
	},
};
const boxSx = {
				width: 'auto',
				height: "100%",
				p: 2,
				display: "flex",
				flexDirection: "column",
				fontSize: "1.5rem",
};

function AboutPage() {
  return (
		<Container maxWidth="lg">
			<Typography sx={{ mb: 2 }} align="center" variant="h3">
				About this project
			</Typography>
			<Grid container spacing={0.25}>
				<Grid
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					sx={{ my: 2 }}
					item
				>
					<Container sx={center}>
						<Card
							sx={{
								maxWidth: 300,
								borderRadius: 10,
								border: "3px solid #4b00a1",
							}}
							elevation={10}
						>
							<CardMedia
								sx={{
									maxWidth: "200",
									borderBottom: "3px solid #4b00a1",
								}}
								elevation={2}
								component="img"
								image={headshot}
							/>
							<CardContent
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
								}}
							>
								<Typography align="center" variant="h5">
									Connect with
								</Typography>
								<Typography
									align="center"
									variant="h5"
									sx={{ mb: 2 }}
								>
									Zackaria Antar
								</Typography>
								<Button
									variant="outlined"
									sx={{ mb: 1 }}
									href={
										"https://www.linkedin.com/in/zackaria-antar/"
									}
								>
									LinkedIn
								</Button>
								<Typography
									sx={{ mb: 2 }}
									align="center"
									variant="caption"
								>
									linkedin.com/in/zackaria-antar/
								</Typography>

								<Button
									sx={{ mb: 1 }}
									variant="outlined"
									href={"https://github.com/ZackariaAntar"}
								>
									GitHub
								</Button>

								<Typography align="center" variant="caption">
									github.com/ZackariaAntar
								</Typography>
							</CardContent>
						</Card>
					</Container>
				</Grid>

				<Grid xs={12} sm={12} md={12} lg={4} xl={4} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Typography align="center" variant="h3">
							Technologies
						</Typography>
						<Box sx={boxSx}>
							<Chip
								align="center"
								label="React"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="PostgreSQL"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="YouTube API"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Material UI"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Node"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="React Redux"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Redux Saga"
								sx={chipSx}
							></Chip>

							<Chip
								align="center"
								label="Bcrypt.js"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Cookie Session"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Dotenv"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Passport"
								sx={chipSx}
							></Chip>
						</Box>
					</Container>
				</Grid>
				<Grid xs={12} sm={12} md={12} lg={4} xl={4} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Typography align="center" variant="h3">
							Future Features
						</Typography>
						<Box sx={boxSx}>
							<Chip
								align="center"
								label="Adding favorited songs to queue"
								sx={chipSx}
							></Chip>
							<Chip
								align="center"
								label="Mobile App"
								sx={chipSx}
							></Chip>
						</Box>
					</Container>
				</Grid>

				<Grid xs={12} sm={12} md={12} lg={4} xl={4} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Typography align="center" variant="h3">
							Thanks
						</Typography>
						<Box sx={boxSx}>
							<Chip
							component={Link}
							to='/mypeople'
								align="center"
								label="Infinite love and gratitude to my friends and
								family for their patience, support, and wisdom."
								sx={{
									fontSize: "1.5rem",
									mb: 1,
									py: 3,
									bgcolor: "#4b00a1",
									color: "#F2F2F2",
									height: "auto",
									"& .MuiChip-label": {
										display: "block",
										whiteSpace: "normal",
									},
								}}

							></Chip>
							<Chip
								align="center"
								label="To the Diamond Cohort for their support,
								camaraderie, and daily commitment to growth."
								sx={thankSx}
							></Chip>
							<Chip
								align="center"
								label="To Liz Kerber, Dane Smith, Emma Stout, Lisa
								Mabley, Chris Black, and Matt Black for sharing
								their knowledge and preparing me to make this
								application a reality."
								sx={thankSx}
							></Chip>
							<Chip
								align="center"
								label="To the community of staff, partners, students,
								alumni, and mentors from Prime Digital Academy
								who have made my learning experience possible."
								sx={thankSx}
							></Chip>
						</Box>
					</Container>
				</Grid>
			</Grid>
		</Container>
  );
}

export default AboutPage;
