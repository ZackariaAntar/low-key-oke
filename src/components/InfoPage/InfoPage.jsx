import React from 'react';
import {
	Container,
	Grid,
	Button,
	Box,
	Typography,
} from "@mui/material";

const center = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
};

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
		<Container maxWidth="lg">
			<Typography sx={{ mb: 2 }} variant="h4">
				How it works
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
						<Box
							sx={{
								width: 300,
								height: "100%",
								backgroundColor: "purple",
								p: 2,
							}}
						>
							<Typography variant="h2">Technology</Typography>
						</Box>
					</Container>
				</Grid>
				<Grid xs={12} sm={4} md={4} lg={4} xl={6} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Box
							sx={{
								width: 300,
								height: "100%",
								backgroundColor: "purple",
								p: 2,
							}}
						>
							<Typography variant="h2">Technology</Typography>
						</Box>
					</Container>
				</Grid>

				<Grid xs={12} sm={4} md={4} lg={4} xl={6} item sx={{ my: 2 }}>
					<Container sx={center}>
						<Box
							sx={{
								width: 300,
								height: "100%",
								backgroundColor: "purple",
								p: 2,
							}}
						>
							<Typography variant="h2">Technology</Typography>
						</Box>
					</Container>
				</Grid>
			</Grid>
		</Container>
  );
}

export default InfoPage;
