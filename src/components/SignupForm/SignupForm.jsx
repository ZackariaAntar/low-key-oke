import { useDispatch, useSelector } from "react-redux";
import React, {useState} from 'react';
function SignupForm(){
    const user = useSelector((store)=>store.user)
    const sesh = useSelector((store)=>store.sesh)
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
    const addSong = (event) =>{
        event.preventDefault()
        const queueItem = {
            title: title,
            artist: artist,
            url: url,
            sesh_code: sesh.code
        }
        dispatch({type:'POST_TO_QUEUE', payload: queueItem})

    }
    return(
        <>
        <form onSubmit={addSong}>
            <label htmlFor="title">
                <p>Song Title</p>
                <input name="title" type="text" value={title} onChange={(e)=>{setTitle(e.target.value) }} />
            </label>
            <label htmlFor="artist">
                <p>Artist</p>
                <input name="artist" type="text" value={artist} onChange={(e)=>{setArtist(e.target.value) }} />
            </label>
            <label htmlFor="url">
                <p>Direct Url</p>
                <input name="url" type="text" value={url} onChange={(e)=>{setUrl(e.target.value) }} />
            </label>
            <label htmlFor="submit">
                <input type="submit" value={"SUBMIT"}/>
            </label>


        </form>
        </>
    )
}
export default SignupForm