import {
	IconButton,
	Divider,
	Grid,
	Box,
	Paper,
	Typography,
    Container
} from "@mui/material";

import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MySongHistory(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({ type: "FETCH_MY_SONG_HISTORY", payload: user.id});
    },[])

    const user = useSelector((store)=>store.user)
    const myHistory = useSelector((store)=>store.myHistory)

    const setAsFavorite = (id) =>{
        dispatch({type:'MAKE_FAVORITE', payload: {songId: id,  userId: user.id}})
    }
    const setUnfavorite = (id) =>{
        dispatch({type:'MAKE_UNFAVORITE', payload: {songId: id, userId: user.id}})
    }

    if(myHistory.length > 1){
        return (
			<Container maxWidth={"xs"} sx={{ pt: 3 }}>
				{myHistory &&
					myHistory.map((history, i) => (
						<Paper
							sx={{
								my: 1,
								mx: "auto",
								p: 2,
							}}
							key={history.id}
							elevation={4}
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
												{history.title} by{" "}
												{history.artist}
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
									{history.favorited ? (
										<IconButton
											size="small"
											onClick={() =>
												setUnfavorite(history.id)
											}
										>
											<StarRoundedIcon />
										</IconButton>
									) : (
										<IconButton
											size="small"
											onClick={() =>
												setAsFavorite(history.id)
											}
										>
											<StarBorderRoundedIcon />
										</IconButton>
									)}
								</Box>
							</Box>
						</Paper>
					))}
			</Container>
		);
    }else{
        return(
            <Container maxWidth={"xs"} sx={{ pt: 3 }}>

                <h1>Nothing to see here!</h1>
            </Container>
        )
    }

}
export default MySongHistory;