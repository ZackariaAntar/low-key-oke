import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from 'react';
import getYouTubeID from "get-youtube-id";

import {Card, CardHeader, CardContent, CardActions, Button, Container, Grid, TextField, Typography} from '@mui/material'

function SignupForm(){
    const dispatch = useDispatch();

    const user = useSelector((store)=>store.user)
    const seshInfo = useSelector((store)=>store.seshInfo)
     useEffect(() => {
			dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });
			// dispatch({ type: "FETCH_QUEUE", payload: user.id });
	}, []);

    const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");

    const addSong = (event) =>{
        event.preventDefault()
        const videoId = getYouTubeID(url);
        const queueItem = {

            sesh_code: seshInfo.sesh_code,
            user_id: user.id,
            name: user.username,
            title: title,
            artist: artist,
            url: videoId,
        }
        dispatch({type:'POST_TO_QUEUE', payload: queueItem})

    }
    return (
		<Container maxWidth={"sm"}>
			<Card elevation={5}>
				<CardContent>
					<CardHeader title={"Sign-up to sing!"} align={"center"} />
					<Typography sx={{ ml: 1 }} align={"center"}>
						What's it going to be, {user.username}?
					</Typography>
					<form noValidate onSubmit={addSong}>
						<TextField
							margin="normal"
							fullWidth
							id="username"
							label="Song Title"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<TextField
							margin="normal"
							fullWidth
							id="password"
							label="Artist"
							value={artist}
							onChange={(e) => {
								setArtist(e.target.value);
							}}
						/>
						<TextField
							margin="normal"
							fullWidth
							id="password"
							label="Direct URL of song from Stingray Karaoke on YouTube"
							value={url}
							onChange={(e) => {
								setUrl(e.target.value);
							}}
						/>
					</form>
				</CardContent>
				<CardActions>
					<Button
						type="submit"
						sx={{ m: 2 }}
						variant="contained"
						size="large"
						component={Link}
						to="/my-queue"
					>
						Submit
					</Button>
				</CardActions>
			</Card>
			{/* <form onSubmit={addSong}>
				<label htmlFor="title">
					<p>Song Title</p>
					<input
						name="title"
						type="text"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="artist">
					<p>Artist</p>
					<input
						name="artist"
						type="text"
						value={artist}
						onChange={(e) => {
							setArtist(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="url">
					<p>Direct Url</p>
					<input
						name="url"
						type="text"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="submit">
					<input type="submit" value={"SUBMIT"} />
				</label>
			</form> */}
		</Container>
	);
}
export default SignupForm