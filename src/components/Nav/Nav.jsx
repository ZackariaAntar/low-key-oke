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
			<h2 className="nav-title">low-key-oke</h2>

			<div>
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<>
						<Link to="/home">
							<h2 className="nav-title">low-key-oke</h2>
						</Link>
						<Link className="navLink" to="/login">
							Login / Register
						</Link>
					</>
				)}
				{/* If a user is logged in, show these links */}
				{user.id && !user.in_session && (
					<>
						<Link to="/home">
							<h2 className="nav-title">low-key-oke</h2>
						</Link>
						<Link className="navLink" to="/user">
							Home
						</Link>

						<Link className="navLink" to="/info">
							Info Page
						</Link>

						<LogOutButton className="navLink" />
					</>
				)}
				{user.in_session && user.is_hosting ? (
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
				) : (
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
