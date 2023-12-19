
import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography } from "@mui/material"

import useFields from '../../hooks/useFields';
import UserContext from "../../context/UserContext";
import useFormValidate from "../../hooks/useFormValidate";

import ConnectionServices from "../../api/services/connections.services";

import PotentialConnectionsList from "./PotentialConnectionsList";

const validationRules = {
	input : {required:true}
};

const FindConnectionsDialog = () => {
	// context
	const {user} = useContext(UserContext);

	// state
	const [open, setOpen] = useState(false);
	const [potentialConnections, setPotenialConnections] = useState([]);
	const [getError, setGetError] = useState(false);
	const [postError, setPostError] = useState(false);
	const [findSubmitted, setFindSubmitted] = useState(false);

	// hooks
	const { formData, handleChange, resetFormData } = useFields({input:''});
	const navigate = useNavigate();
	const { validationErrors, validateForm, resetValidationErrors } = useFormValidate();

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
		setFindSubmitted(false);
		resetValidationErrors();
		resetFormData()
	};

	const handleFindUser = async () => {
		setFindSubmitted(s=>true)
	};

	//  fecth functions
	const getPotentialConnetions = async () => {
		try{
			const potential = await ConnectionServices.getPotential(formData.input);
			setPotenialConnections(p => potential);
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				setGetError(true);
				setFindSubmitted(false)
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

	useEffect(() => {
		if(findSubmitted){
			validateForm(formData, validationRules);
		} else{
			setFindSubmitted(s=>false);
		}
	}, [findSubmitted])

	useEffect(()=>{
		if(findSubmitted && Object.keys(validationErrors).length === 0){
			getPotentialConnetions()
		} else{
			setFindSubmitted(s=>false)
		}
	}, [validationErrors])

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
								error={!!validationErrors?.input}
								helperText={validationErrors?.input || null}
							/>
							<Button 
								variant='outlined'
								onClick={handleFindUser}	
							>
								Find
							</Button>
						</Grid>
						{findSubmitted && validationErrors.input ?
							null 
							:
							!getError ?
								(potentialConnections && findSubmitted
									? 	
										<Grid item  xs={12} lg={12}>
											<PotentialConnectionsList 
												createConnectionRequest={createConnectionRequest} 
												potentials={potentialConnections}
											/>
										</Grid>
									: null
								)
							: <Typography>Opps, somethig went wrong!</Typography>
						}
						{
							postError ? 
								<Typography>Something went wrong, request not sent.</Typography> 
							: null
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