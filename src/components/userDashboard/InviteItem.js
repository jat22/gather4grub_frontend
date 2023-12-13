import React from "react";
import { ListItem, IconButton, ListItemText } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import FullInvitationDialog from "./FullInvitationDialog";


const InviteListItem = ({ item, acceptInvite, declineInvite }) => {
	return (
		<ListItem
			secondaryAction={
				<>
					<FullInvitationDialog 
						invitation={item} 
						acceptInvite={acceptInvite} 
						declineInvite={declineInvite} />
					<IconButton 
						edge="end" 
						aria-label="accept"
						onClick={()=>acceptInvite(item.id)} 
					>
						<CheckIcon />
					</IconButton>
					<IconButton
						edge='end'
						aria-label="decline"
						onClick={()=>declineInvite(item.id)}
					>
						<ClearIcon />
					</IconButton>
				</>
			}
		>
			<ListItemText
				primary={item.title}
				secondary={item.date}
			/>
		</ListItem>
	);
};

export default InviteListItem;