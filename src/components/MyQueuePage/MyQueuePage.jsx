import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
	IconButton,
	Divider,
	Grid,
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
	Paper,
	Typography,
} from "@mui/material";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function MyQueuePage(){
    const dispatch = useDispatch()
    const user = useSelector((store)=> store.user)
    const mySongs = useSelector((store)=> store.mySongs)
    const [toggle, setToggle] = useState(false)
    let [propId, setPropId] = useState({})
    useEffect(()=>{
        dispatch({ type: "FETCH_MY_CURRENT_SESSION_SONGS", payload: user.id});

    },[])

    const deleteMySongFromQueue = (obj) =>{
        dispatch({ type: "DELETE_FROM_MY_QUEUE", payload: obj });
        console.log('obj', obj);
        setToggle(!toggle);
        setPropId(null)

    }
    const activateDialog = value => () =>{
        setPropId(value)
        setToggle(!toggle);

    }
    console.log(propId);


    return (
		<Container maxWidth={"xs"} sx={{ pt: 3 }}>
			{mySongs &&
				mySongs.map((song, i) => (
					<>
						<Paper
							sx={{
								my: 1,
								mx: "auto",
								p: 2,
							}}
							key={song.id}
							elevation={4}
							value={song.id}
						>
							<Box
								sx={{
									width: "100%",
									maxWidth: 360,
									bgcolor: "background.paper",
								}}
								elevation={5}
							>
								<Box sx={{ my: 0, mx: 1 }}>
									<Grid container alignItems="center">
										<Grid item xs sx={{ my: 2, mx: 0 }}>
											<Typography
												gutterBottom
												variant="body"
											>
												id: {song.id} {song.title} by{" "}
												{song.artist}
											</Typography>
										</Grid>
									</Grid>
									<Typography
										gutterBottom
										color="text.secondary"
										variant="body"
									></Typography>
									<Typography
										noWrap
										color="text.secondary"
										variant="caption"
										sx={{ fontSize: ".75rem" }}
									>
										https://www.youtube.com/watch?v=$
										{song.url}
									</Typography>
								</Box>
								<Divider variant="middle" />
								<Box
									sx={{
										mt: 2,
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										textAlign: "center",
									}}
								>
									<IconButton
										size="small"
										value={song}
										onClick={activateDialog(song)}
									>
										<DeleteForeverRoundedIcon
											sx={{ color: "#b00000" }}
										/>
									</IconButton>
									<Typography variant="subtitle2">
										Opt out
									</Typography>
								</Box>
							</Box>
							<Dialog
								open={toggle}
								onClose={() => setToggle(!toggle)}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
								key={i}
							>
								<DialogTitle
									id="alert-dialog-title"
									sx={{ color: "red", textAlign: "center" }}
								>
									{
										" Removing a song from the queue cannot be undone!"
									}
								</DialogTitle>
								<DialogContent>
									<DialogContentText
										sx={{
											textAlign: "center",
										}}
										id="alert-dialog-description"
									>
										Are you sure that you want to delete
										this song?
									</DialogContentText>
								</DialogContent>
								<DialogActions
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Button
										variant="contained"

										autoFocus
										onClick={() => setToggle(!toggle)}
										sx={{ mb: 5 }}
									>
										Nevermind
									</Button>
									<Button
                                    variant="outlined"
                                    color="error"
										onClick={() =>
											deleteMySongFromQueue(propId)
										}
									>
										Remove Song from my queue
									</Button>
								</DialogActions>
							</Dialog>
						</Paper>
					</>
				))}
		</Container>
	);
}

export default MyQueuePage
