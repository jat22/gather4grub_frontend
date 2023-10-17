import React from "react";
import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const InviteListItem = ({ item, handleAccept, handleDecline }) => {
	return (
		<ListItem
			secondaryAction={
				<>
					<IconButton 
						edge="end" 
						aria-label="accept"
						onClick={()=>handleAccept(item.id)} 
					>
						<CheckIcon />
					</IconButton>
					<IconButton
						edge='end'
						aria-label="decline"
						onClick={()=>handleDecline(item.id)}
					>
						<ClearIcon />
					</IconButton>
				</>
			}
		>
			<ListItemAvatar>
				<Avatar>
					<FolderIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={item.title}
				secondary={item.date}
			/>
		</ListItem>
	)
}

export default InviteListItem