import React, { useState } from "react";
import { Popover, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import UserProfileCard from "./UserProfileCard";

const UserDetailsPopover = ({ user }) => {
	// state
	const [anchorEl, setAnchorEl] = useState(null);

	// event handlers
	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return(
		<>
			{/* <ListItemAvatar>
				<Avatar src={user.avatarUrl}/>
			</ListItemAvatar> */}
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
				<UserProfileCard user={user} />
			</Popover>
		</>
	);
};

export default UserDetailsPopover;