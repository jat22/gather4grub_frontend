import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Chip, List, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from "@mui/material"
import React, { useState, useContext, useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom'
import UserContext from "../../context/UserContext";
import ConnectionServices from "../../api/services/connections.services";


const ConnectionRequestDialog = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const {user} = useContext(UserContext);

	const [requests, setRequests] = useState([]);

	useEffect(() => {
		const getRequests = async() => {
			const requests = await ConnectionServices.getRequests(user.username)
			setRequests(r=>requests)
		}
		getRequests()
	}, [open]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleRequestAccept = (requestId) => {
		handleClose();
		ConnectionServices.acceptRequest(requestId, user.username)
	};

	const handleRequestDelete = (requestId) => {
		handleClose();
		ConnectionServices.deleteRequest(requestId, user.username)
	};

	return (
		<>
			<Button onClick={handleOpen} size='large' variant="contained">
				Pending Requests
			</Button>
			<Dialog 
				open={open} 
			>
				<DialogTitle>Connection Requests</DialogTitle>
				<DialogContent>
					{!requests || requests.length < 1 
						?
						<Typography >No Requests</Typography>
						:
						<Box sx={{width:400}}>
							<List>
								{requests.map( c => {
									return(
										<ListItem 
											key={c.requestId} 
											alignItems="flex-start"
											secondaryAction={
												<>
													<Chip 
														label="Accept"
														size="small"
														edge='end'
														onClick={() => handleRequestAccept(c.requestId)}
													/>
													<Chip 
														label="Delete"
														size="small"
														edge='end'
														onClick={() => handleRequestDelete(c.requestId)}
													/>
												</>
												
											}	
										>
											<ListItemAvatar>
												<Avatar />
											</ListItemAvatar>
											<ListItemText 
												component={RouterLink}
												to={`/users/${c.username}`} 
												primary={c.username}
												secondary={`${c.firstName} ${c.lastName}`} />
										</ListItem>
									)
									})
								}
							</List>
						</Box>
					}	
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
		
	)

}

export default ConnectionRequestDialog