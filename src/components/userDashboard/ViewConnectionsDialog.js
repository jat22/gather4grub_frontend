
import React, { useContext, useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material"

import UserContext from "../../context/UserContext"
import ConnectionServices from "../../api/services/connections.services";
import UserList from "../UserList"
import Loader from "../Loader";



const ViewConnectionsDialog = () => {
	// context
	const { user } = useContext(UserContext);

	// state
	const [open, setOpen] = useState(false);
	const [connections, setConnections] = useState([]);
	const [error, setError] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false)

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
		setIsLoaded(false)
	};

	// fetch functions
	const getConnections = async() =>{
		try{
			const connections = await ConnectionServices.getConnections(user.username);
			setConnections(c => connections);
			setIsLoaded(true)
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			}else {
				setError(true);
			};
		};
	};

	const handleUnfollow = async (connectionId) => {
		try{
			const res = await ConnectionServices.unfollow(user.username, connectionId);
			if(res === 204){
				getConnections()
			}
			
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			}else {
				setError(true);
			};
		}
	};

	// effects
	useEffect(() => {
		if(isFirstRender.current){
			isFirstRender.current = false;
			return;
		}
		if(open){
			getConnections();
		} else return;
	}, [open]);

	return (
		<>
			<Button 
				onClick={handleOpen} 
				size='large'
				variant='contained'
				fullWidth
				sx={{
					height:100
				}}
			>
				My Connections
			</Button>
			<Dialog open={open} fullWidth>
				<DialogTitle>
					Connections
				</DialogTitle>
				<DialogContent>
					{isLoaded ?
						(!connections || connections.length < 1 
							?
							<Typography >No Connections</Typography>
							:
							<UserList 
								users={connections}
								actions={[
									{
										label:'UnFollow', 
										function:handleUnfollow, targetData:'connectionId'
									}
								]}
							/>
						)
						:
						<Loader />
					}
					{
						error ?
						<Typography>Opps, something went wrong!</Typography>
						: null
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