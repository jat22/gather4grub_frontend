import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";


const PotentialConnectionsList = ({ potentials, createConnectionRequest }) => {
	const handleAdd = (connectionUsername) => {
		createConnectionRequest(connectionUsername)
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
	)
}

export default PotentialConnectionsList