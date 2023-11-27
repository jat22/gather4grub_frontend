import React from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from "@mui/material";

const GuestList = ({ guests, isHost, uninviteGuest }) => {
	if(guests === undefined) return

	const handleUninvite = (username) => {
		uninviteGuest(username);
	}

	const generateGuests = () => {
		return (
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{guests.map( g => {
					return (
						<ListItem 
							key={g.username}
							secondaryAction={
								isHost ? 
								<Button 
									size='small' 
									variant='outlined' 
									edge='end'
									onClick={() => handleUninvite(g.username)}
								>
									Uninvite
								</Button>
								: null
							}>
							<ListItemAvatar>
								<Avatar/>
							</ListItemAvatar>
							<ListItemText primary={g.username} secondary={g.rsvp} />
							
						</ListItem>
					)
				})}
			</List>
		)
	};

	return (
		generateGuests()
	)
}

export default GuestList