
import React, { useContext, useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, List, Typography } from "@mui/material"

import UserContext from "../../context/UserContext"
import ConnectionServices from "../../api/services/connections.services"

import UserDetailsPopover from "../UserDetailsPopover"



const ViewConnectionsDialog = () => {
	// context
	const { user } = useContext(UserContext);

	// state
	const [open, setOpen] = useState(false);
	const [connections, setConnections] = useState([]);
	const [error, setError] = useState(false);

	// hooks
	const isFirstRender = useRef(true);
	const navigate = useNavigate();

	// event handlers
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setError(false);
		setConnections([]);
	};

	// fetch functions
	const getConnections = async(username) =>{
		try{
			const connections = await ConnectionServices.getConnections(username);
			setConnections(c => connections);
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			}else {
				setError(true);
			};
		};
	};

	// effects
	useEffect(() => {
		if(isFirstRender.current){
			isFirstRender.current = false;
			return;
		}
		if(open){
			getConnections(user.username);
		} else return;
	}, [open]);

	return (
		<>
			<Button onClick={handleOpen} size='large' variant='contained'>
				My Connections
			</Button>
			<Dialog open={open}>
				<DialogTitle>
					Connections
				</DialogTitle>
				<DialogContent>
					{
						!error ?
							(!connections || connections.length < 1 
								?
								<Typography >No Connections</Typography>
								:
								<List>
									{connections.map( c => {
										return(
												<UserDetailsPopover key={c.username} user={c} />
										)
										})
									}
								</List>
							)
						:
						<Typography>Opps, something went wrong!</Typography>
					}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ViewConnectionsDialog;