import React from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, IconButton } from "@mui/material";
import UserList from "../UserList";
import DeleteIcon from '@mui/icons-material/Delete';


const GuestList = ({ guests, isHost, uninviteGuest }) => {
	// if(guests === undefined) return;

	const handleUninvite = (username) => {
		uninviteGuest(username);
	};

	return (
		<UserList 
			users={guests} 
			actions={handleUninvite}
			 type={isHost? 'hostGuestList' : 'guestList'}
		/>
	);
};

export default GuestList