import {Box, BottomNavigation,
BottomNavigationAction, IconButton, Container, Paper, Stack} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HistoryIcon from "@mui/icons-material/History";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";




function BottomNav() {


	return (
		<>
			<Box
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					bgcolor: "#4b00a1",
					padding: 0.25,
				}}
				elevation={10}
			>
				<Stack
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					spacing={0}
				>
					<IconButton
						size="small"
						sx={{
							fontSize: ".8rem",
							fontWeight: "bold",
							color: "#F2F2F2",
							display: "flex",
							flexDirection: "column",
							my: 0.1,
						}}
						component={Link}
						to={"/signup"}
					>
						<AddBoxOutlinedIcon />
						<div style={{ marginTop: 1.75 }}> Sign-up</div>
					</IconButton>
					<IconButton
						size="small"
						sx={{
							fontSize: ".8rem",
							fontWeight: "bold",
							color: "#F2F2F2",
							display: "flex",
							flexDirection: "column",
							my: 0.1,
						}}
						component={Link}
						to={"/my-queue"}
					>
						<AssignmentOutlinedIcon />
						<div style={{ marginTop: 1.75 }}> My Queue</div>
					</IconButton>
					<IconButton
						size="small"
						sx={{
							fontSize: ".8rem",
							fontWeight: "bold",
							color: "#F2F2F2",
							display: "flex",
							flexDirection: "column",
							my: 0.18,
						}}
						component={Link}
						to={"/my-history"}
					>
						<HistoryIcon />
						<div style={{ marginTop: 1.75 }}> History</div>
					</IconButton>
				</Stack>
			</Box>

			{/* <BottomNavigation
				showLabels
				value={value}
				// onClick={() => goToView(value)}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction
					value="/signup"
					to="/signup"
					component={Link}
					label="Sign-up"
					icon={<AssignmentTwoToneIcon />}
				></BottomNavigationAction>

				<BottomNavigationAction
					value="/my-queue"
					to="/my-queue"
					component={Link}
					label="My Queue"
					icon={<QueueMusicTwoToneIcon />}
				/>

				<BottomNavigationAction
					value="/my-history"
					to="/my-history"
					component={Link}
					label="My History"
					icon={<WatchLaterTwoToneIcon />}
				/>
			</BottomNavigation> */}
		</>
	);

}

export default BottomNav;

// border: "1, solid, black",
// 					bgcolor: "background.dark"