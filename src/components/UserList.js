import React from "react";
import { List, ListItem, Chip, ListItemAvatar, Avatar} from "@mui/material";
import UserDetailsPopover from "./UserDetailsPopover";

const generateSecondaryActions  = (actions, user) => {
	return(
		<>
			{actions.map(action => {
				return(
					<Chip 
						key={action.label}
						label={action.label}
						size='small'
						edge='end'
						onClick={()=>action.function(user[action.targetData])}
					/>
				)
			})
			}
		</>
	)
}

const UserList = ({ users, actions }) => {
	return(
		<List>
			{users.map( user => {
				return(
					<ListItem 
						key={user.username} 
						secondaryAction={
							generateSecondaryActions(actions, user)
						}	
					>
						<ListItemAvatar>
							<Avatar src={user.avatarUrl}/>
						</ListItemAvatar>
						<UserDetailsPopover user={user} />
					</ListItem>
				) 
			})
			}
		</List>
	)
}

export default UserList