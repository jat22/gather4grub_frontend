import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@mui/material";

const EventComments = ({comments}) => {
	if(comments === undefined) return
	const generateComments = () => {
		return (
			<List sx={{ width:'100%'}}>
				{comments.map((c,i) => {
					return (
						<>
							<ListItem alignItems='flex-start'>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText
									primary={c.username}
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
						</>
					)
				})}
			</List>
		)
	}

	return generateComments()
}


export default EventComments;