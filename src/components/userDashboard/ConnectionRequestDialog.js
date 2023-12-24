import React, { useState, useContext, useEffect, useRef } from "react"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Chip, List, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from "@mui/material"

import UserContext from "../../context/UserContext";
import ConnectionServices from "../../api/services/connections.services";
import UserList from "../UserList";


const ConnectionRequestDialog = ({ followRequests, acceptFollowRequest, deleteFollowRequest, apiErrors }) => {
	// context
	const {user} = useContext(UserContext);

	// state
	const [open, setOpen] = useState(false);

	const error = apiErrors.connectionRequests;

	// event handlers
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAccept = (requestId) => {
		acceptFollowRequest(requestId)
	};

	const handleDelete = (requestId) => {
		deleteFollowRequest(requestId)
	};

	return (
		<>
			<Button 
				onClick={handleOpen} 
				size='large' 
				variant="contained"
				fullWidth
				sx={{
					height:90
				}}
			>
				Pending Requests
			</Button>
			<Dialog 
				open={open} 
				fullWidth
			>
				<DialogTitle>Connection Requests</DialogTitle>
				<DialogContent>
						{error ? 
							<Typography>{error}</Typography>
							: null
						}
						{!followRequests || followRequests.length < 1 
							?
							<Typography >No Requests</Typography>
							:
								<UserList 
									users={followRequests} 
									actions={[
										{label:'Accept', function: handleAccept, targetData:'requestId'},
										{label: 'Delete', function: handleDelete, targetData:'requestId'}
									]} 
								/>
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