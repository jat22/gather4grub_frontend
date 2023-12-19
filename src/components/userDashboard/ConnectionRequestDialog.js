import React, { useState, useContext, useEffect, useRef } from "react"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Chip, List, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from "@mui/material"

import UserContext from "../../context/UserContext";
import ConnectionServices from "../../api/services/connections.services";


const ConnectionRequestDialog = () => {
	// context
	const {user} = useContext(UserContext);

	// state
	const [open, setOpen] = useState(false);
	const [requests, setRequests] = useState([]);
	const [error, setError] = useState('');

	// hooks
	const navigate = useNavigate();
	const isFirstRender = useRef(true);

	// event handlers
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setError(false);
		setOpen(false);
		setRequests([]);
	};

	// fetch functions
	const getRequests = async() => {
		try{
			const requests = await ConnectionServices.getRequests(user.username);
			setRequests(r=>requests);
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				setError('Something went wrong, unable to get requests.');
			};
		};
	};

	// patch functions
	const handleRequestAccept = async (requestId) => {
		try{
			await ConnectionServices.acceptRequest(requestId, user.username);
		} catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				setError('Error: unable to process at this time.');
			};
		};
	};

	const handleRequestDelete = async (requestId) => {
		try{
			await ConnectionServices.deleteRequest(requestId, user.username);
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				setError('Error: unable to process at this time.');
			};
		};
	};

	// effects
	useEffect(() => {
		if(isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if(open){
			getRequests();
		} else return;
	}, [open]);

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
					{!error ?
						(!requests || requests.length < 1 
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
						)
						: 
						<Typography>{error}</Typography>
					}	
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConnectionRequestDialog;