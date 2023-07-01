import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';

import { Container, Button } from '@mui/material';
import {Link} from 'react-router-dom'


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
 const dispatch = useDispatch()
  const user = useSelector((store) => store.user);
  useEffect(()=>{
	dispatch({ type: "FETCH_CURRENT_SESSION", payload: user.id });


  }, [])
  const seshInfo = useSelector((store)=>store.seshInfo)
  return (
		<Container maxWidth={"xs"} sx={{ pt: 3 }}>
			<h2>Welcome, {user.username}!</h2>
			{/* <h2>Current session: {seshInfo.sesh_code}</h2> */}
			<Button variant="contained" component={Link} to="/role">
				GET STARTED
			</Button>
			<p>Your ID is: {user.id}</p>
			<LogOutButton className="btn" />
		</Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
