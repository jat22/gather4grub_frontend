import React, { useState } from "react";
import { Popover, Typography, Box, ListItemText } from "@mui/material";
import UserProfileCard from "./UserProfileCard";

const UserDetailsPopover = ({ user }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl)

	// const [userProfile, setUserProfile] = useState({})

	// const { username } = useParams();

	// useEffect(() => {
	// 	const getProfile = async() => {
	// 		const profile = G4GApi.getProfile(username)
	// 		setUserProfile(p => profile)
	// 	};
	// 	getProfile();
	// }, [username])

	return(
		<>
			<ListItemText 
				primary={user.username}	
				secondary={`${user.firstName} ${user.lastName}`}
				onClick={handleOpen}
				aria-owns={open ? 'user-details-popover' : undefined}
				aria-haspopup="true"
				onClose={handleClose}
			/>
			<Popover 
				id='user-details-popover'
				open={open}
				onClose={handleClose}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				  }}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<UserProfileCard username={user.username} />

			</Popover>
		</>
	)
}

export default UserDetailsPopover