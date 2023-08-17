import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import LeaveSessionButton from '../LeaveSessionButton/LeaveSessionButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
		<div className="nav">
			{/* TODO IF LOGGED IN AND IN SESSION CHANGE HOME TO BE THE HOST DASH FOR HOST AND DISABLE LINK FOR GUEST  */}

			{(!user.id || user.id) && !user.in_session && (
				<Link to="/home">
					<h2 className="nav-title">low-key-oke</h2>
				</Link>
			)}
			{user.in_session && <h2 className="nav-title">low-key-oke</h2>}

			<div className="nav-div">
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<>
						<Link className="navLink" to="/login">
							Login
						</Link>
						{/* <Link className="navLink" to="/mypeople">
							Friends & Family
						</Link> */}
					</>
				)}
				{/* If a user is logged in, and not in a session show these links */}
				{(user.id && !user.in_session) && (
					<>
						<Link className="navLink" to="/user">
							Home
						</Link>

						{/* <Link className="navLink" to="/info">
							Info
						</Link> */}

						<LogOutButton className="navLink" />
					</>
				)}
				{/* If a user is logged in, and not in a session show these links */}
				{(user.id) && (user.in_session && user.is_hosting) && (
					<>
						<Link className="navLink" to="/host-dash">
							Host Dashboard
						</Link>

						<Link className="navLink" to="/main-display">
							Main Display
						</Link>

						<Link to="/user">
							<LeaveSessionButton className="navLink" />
						</Link>
					</>
				)}
				{(user.id) && (user.in_session && !user.is_hosting) && (
					<>
						<Link to="/user">
							<LeaveSessionButton className="navLink" />
						</Link>
					</>
				)}

				<Link className="navLink" to="/about">
					About
				</Link>
			</div>
		</div>
  );
}

export default Nav;
