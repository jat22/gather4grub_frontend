import React from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from "@mui/material";
import UserList from "../UserList";

const GuestList = ({ guests, isHost, uninviteGuest }) => {
	// if(guests === undefined) return;

	const handleUninvite = (username) => {
		uninviteGuest(username);
	};
	const rsvpMap = {
		pending : 'TBD',
		host : 'Host',
		accept : "Attending",
		decline : "Not Attending"
	};
	console.log(guests)

	return (
		<List 
			sx={{ 
				width: '100%', 
			}}
			dense
		>
			{guests.map( g => {
				return (
					<ListItem 
						key={g.username}
						secondaryAction={
							isHost ? 
								<Chip
									label="Remove"
									size='small' 
									edge='end'
									onClick={() => handleUninvite(g.username)}
								/>
							: null
						}>
						<ListItemAvatar>
							<Avatar src={g.avatarUrl}/>
						</ListItemAvatar>
						<ListItemText primary={g.username} secondary={rsvpMap[g.rsvp]} />
					</ListItem>
				)
			})}
		</List>
	);
};

export default GuestList