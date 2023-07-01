import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import RolePage from '../RolePage/RolePage';
import {useDispatch, useSelector} from 'react-redux';

import { Container, Button, Box } from '@mui/material';
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
		<Container
			maxWidth={"xs"}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<LogOutButton className="btn" />
			<h1>Welcome, {user.username}! </h1>
			<RolePage />
		</Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
