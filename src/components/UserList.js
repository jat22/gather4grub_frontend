import React from "react";
import { List, ListItem, Chip, ListItemAvatar, Avatar, IconButton} from "@mui/material";
import UserDetailsPopover from "./UserDetailsPopover";
import DeleteIcon from '@mui/icons-material/Delete';

const generateGuestListChip = (rsvp) => {

	const rsvpMap = {
		pending : 'TBD',
		host : 'Host',
		accept : "Attending",
		decline : "Not Attending"
	};

	return (
		<Chip 
			label={rsvpMap[rsvp]}
			size='small'
			edge='end'
			disabled
		/>
	)
}

const generateSecondaryActions  = (actions, user, type) => {
	if(type === 'hostGuestList'){
		return(
			<>
				{generateGuestListChip(user.rsvp)}
				{user.rsvp !== 'host' ?
					<IconButton>
						<DeleteIcon 
							fontSize='small' 
							onClick={()=> actions(user.username)}
						/>
					</IconButton> 
					: null
				}
			</>
		)
	}
	if(type === 'guestList'){
		return(
			<>
				{generateGuestListChip(user.rsvp)}
			</>
		)
	}

	if(!type){
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
	} else if(type === 'searchResults'){
		const relationType = user.relation?.type;
		return (
			actions.map(a => {

				if(!relationType && a.label === 'Send Connection Request'){
					return (
						<Chip 
							key={a.label}
							label={a.label}
							size='small'
							edge='end'
							onClick={()=> a.function(user[a.targetData])}
						/>
					)
				} else if(relationType === 'connection' && a.label === 'Connected'){
					return (
						<Chip 
							key={a.label}
							label={a.label}
							size='small'
							edge='end'
							disabled
						/>
					)
				} else if(relationType === 'request' && a.label === 'Request Pending'){
					return (
						<Chip 
							key={a.label}
							label={a.label}
							size='small'
							edge='end'
							disabled
						/>
					)
				} else{
					return null
				}
			})
		)
	}
}

const UserList = ({ users, actions, type}) => {
	return(
		<List>
			{users.map( user => {
				return(
					<ListItem 
						key={user.username} 
						secondaryAction={
							generateSecondaryActions(actions, user, type)
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