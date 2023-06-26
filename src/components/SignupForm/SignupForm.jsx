import { useDispatch, useSelector } from "react-redux";
import React, {useState} from 'react';
import getYouTubeID from "get-youtube-id";
import { Container } from "@mui/material";

function SignupForm(){

    const user = useSelector((store)=>store.user)
    // const sesh = useSelector((store)=>store.sesh)
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
    const addSong = (event) =>{
        event.preventDefault()
        const videoId = getYouTubeID(url);
        const queueItem = {
            title: title,
            artist: artist,
            url: videoId,
            user_id: user.id,
            sesh_code: user.current_session

        }
        dispatch({type:'POST_TO_QUEUE', payload: queueItem})

    }
    return(
        <Container maxWidth={"sm"}>
        <form onSubmit={addSong}>
            <label>
                <p>Song Title</p>
                <input name="title" type="text" value={title} onChange={(e)=>{setTitle(e.target.value) }} />
            </label>
            <label>
                <p>Artist</p>
                <input name="artist" type="text" value={artist} onChange={(e)=>{setArtist(e.target.value) }} />
            </label>
            <label>
                <p>Direct Url From Stingray Karaoke</p>
                <input name="url" type="text" value={url} onChange={(e)=>{setUrl(e.target.value) }} />
            </label>
            <label>
                <input type="submit" value={"SUBMIT"}/>
            </label>


        </form>
        </Container>
    )
}
export default SignupForm