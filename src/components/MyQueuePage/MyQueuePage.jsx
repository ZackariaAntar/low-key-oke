import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MyQueuePage(){
    const dispatch = useDispatch()
    const user = useSelector((store)=> store.user)
    const mySongs = useSelector((store)=> store.mySongs)
    useEffect(()=>{
        dispatch({ type: "FETCH_MY_CURRENT_SESSION_SONGS", payload:user.id});

    },[])
    return (
		<Container maxWidth={"sm"}>
			<div>
				{mySongs &&
					mySongs.map((song) => (
						<div key={song.id}>
							<p>
								{song.title} by {song.artist} {song.url}
							</p>
						</div>
					))}
			</div>
		</Container>
	);
}

export default MyQueuePage