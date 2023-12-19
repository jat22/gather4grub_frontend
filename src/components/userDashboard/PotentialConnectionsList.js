
import React from "react";
import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";


const PotentialConnectionsList = ({ potentials, createConnectionRequest }) => {
	const handleAdd = (connectionUsername) => {
		createConnectionRequest(connectionUsername);
	};

	if(potentials.length === 0){
		return <Typography>No matching user's found.</Typography>
	}

	return (
		<List>
			{potentials.map(p => {
				return (
					<ListItem 
						key={p.username}
						alignItems="flex-start"
						secondaryAction={
							<Chip 
								label="Request"
								size="small"
								edge='end'
								onClick={() => handleAdd(p.username)}
							/>
						}
					>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText 
							primary={p.username}
							secondary={`${p.firstName} ${p.lastName}`}
						/>
					</ListItem>
				)
			})}
		</List>
	);
};

export default PotentialConnectionsList;