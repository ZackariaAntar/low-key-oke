import {Box, BottomNavigation,
BottomNavigationAction, IconButton, Container, Paper, Stack, Button} from "@mui/material";
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

	const [on, setOn] = useState(false)

	const icon =

		{
			fontSize: ".8rem",
			color: "#F2F2F2",
			display: "flex",
			flexDirection: "column",
			mt: 0.1,

		}

	const text ={ marginTop: 3.75 }


	// need to add hovering etc....


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
					sx={{ my: 0.75 }}

				>
					<IconButton
						size="small"
						sx={icon}
						component={Link}
						to={"/signup"}
					>
						<AddBoxOutlinedIcon />
						<div style={text}> Sign-up</div>
					</IconButton>
					<IconButton
						size="small"
						sx={icon}
						component={Link}
						to={"/my-queue"}
					>
						<AssignmentOutlinedIcon  />
						<div style={text}> My Queue</div>
					</IconButton>
					<IconButton
						size="small"
						sx={icon}
						component={Link}
						to={"/my-history"}
					>
						<HistoryIcon  />
						<div style={text}> History</div>
					</IconButton>
				</Stack>
			</Box>
		</>
	);

}

export default BottomNav;

// border: "1, solid, black",
// 					bgcolor: "background.dark"