import React, { Fragment } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const EventComments = ({ comments, isHost, username, removeComment }) => {
	// display message if there are not already comments.
	if(comments === undefined || comments.length === 0) {
		return (
			<Typography sx={{margin:1}}>
				No Comments Yet.
			</Typography>
		);
	};

	// event handler
	const handleRemoveComment = (commentId) => {
		removeComment(commentId);
	};

	const secondaryAction = (commentId, commentAuthor)=>{
		if(isHost || commentAuthor === username){
			return (
				<IconButton
					edge='end'
					aria-label="delete"
					onClick={()=>handleRemoveComment(commentId)}
				>
					<DeleteIcon fontSize="small"/>
				</IconButton>
			)
		} else return null
	}

	const generateComments = () => {
		return (
			<List sx={{ width:'100%'}}>
				{comments.map((c,i) => {
					return (
						<Fragment key={c.id}>
							<ListItem 
								alignItems='flex-start'
								secondaryAction={
									secondaryAction(c.id, c.user)
								}
							>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText
									primary={c.user}
									secondary={
										<>
											<Typography component='span' variant='body1'>
												{c.content}
											</Typography>
										</>}
								>
								</ListItemText>
							</ListItem>
							{i !== comments.length - 1 ? <Divider component='li'/> : null}
						</Fragment>
					);
				})}
			</List>
		);
	};

	return generateComments();
}


export default EventComments;