import React, { Fragment } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Chip } from "@mui/material";

const EventComments = ({ comments, isHost, username, removeComment }) => {
	// display message if there are not already comments.
	if(comments === undefined || comments.length === 0) {
		return (
			<Typography >
				No Comments Yet.
			</Typography>
		);
	};

	// event handler
	const handleRemoveComment = (commentId) => {
		removeComment(commentId);
	};

	const generateComments = () => {
		return (
			<List sx={{ width:'100%'}}>
				{comments.map((c,i) => {
					return (
						<Fragment key={c.id}>
							<ListItem 
								alignItems='flex-start'
								secondaryAction={
									isHost || c.author === username ?
									<Chip
										label="Remove"
										size='small' 
										edge='end'
										onClick={() => handleRemoveComment(c.id)}
									/>
									: null
								}
							>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText
									primary={c.user}
									secondary={
										<>
											<Typography >
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