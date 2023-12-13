
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography } from "@mui/material"

import useFields from '../../hooks/useFields';
import UserContext from "../../context/UserContext";

import ConnectionServices from "../../api/services/connections.services";

import PotentialConnectionsList from "./PotentialConnectionsList";


const FindConnectionsDialog = () => {
	// context
	const {user} = useContext(UserContext);

	// state
	const [open, setOpen] = useState(false);
	const [potentialConnections, setPotenialConnections] = useState([]);
	const [getError, setGetError] = useState(false);
	const [postError, setPostError] = useState(false);

	// hooks
	// const { formData, handleChange } = useFields({input: ''});
	const [formData, setFormData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields({input:''});
	const navigate = useNavigate();

	// event handlers
	const handleOpen = () => {
		setPotenialConnections([]);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setGetError(false);
		setPostError(false);
		setPotenialConnections([]);
	};

	const handleFindUser = async () => {
		const potentials = await getPotentialConnetions();
		setPotenialConnections(potentials);
	};

	//  fecth functions
	const getPotentialConnetions = async () => {
		try{
			const potential = await ConnectionServices.getPotential(formData.input);
			return potential;
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				setGetError(true);
			};
		};
	};

	// post functions
	const createConnectionRequest = async (connectionUsername) => {
		try{
			const currUsername = user.username;
			await ConnectionServices.createRequest(currUsername, connectionUsername);
			handleClose();
		}catch(err){
			setPostError(true);
		};
	};

	return (
		<>
			<Button onClick={handleOpen} size='large' variant="contained">
				Find People
			</Button>
			<Dialog open={open}>
				<DialogTitle>
					Enter email or username:
				</DialogTitle>
				<DialogContent>
					<Grid container>
						<Grid item xs={12} lg={12}>
							<TextField
								name='input'
								id='input'
								label='Username or Email'
								placeholder="Username or Email"
								onChange={handleChange}
							/>
							<Button 
								variant='outlined'
								onClick={handleFindUser}	
							>
								Find
							</Button>
						</Grid>
						{
							postError ? 
								<Typography>Something went wrong, request not sent.</Typography> 
							: null
						}
						{
							!getError ?
								(potentialConnections && potentialConnections.length > 0 
									? 	<Grid item  xs={12} lg={12}>
											<PotentialConnectionsList 
												createConnectionRequest={createConnectionRequest} 
												potentials={potentialConnections}
											/>
										</Grid>
									: null
								)
							: <Typography>Opps, somethig went wrong!</Typography>
						}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default FindConnectionsDialog;