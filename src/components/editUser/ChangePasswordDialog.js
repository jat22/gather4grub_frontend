import React, { useState, useContext, useEffect } from "react";
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Grid, Box, Typography } from "@mui/material";

import useFields from "../../hooks/useFields";
import UserServices from "../../api/services/user.services";
import UserContext from "../../context/UserContext";
import Loader from "../Loader";



const ChangePasswordDialog = () => {
	// context
	const { user } = useContext(UserContext)

	// state
	const [open, setOpen] = useState(false);
	const [passwordMatchError, setPasswordMatchError] = useState(false)
	const [incorrectPasswordError, setIncorrectPasswordError] = useState(false)
	const [disableSubmit, setDisableSubmit] = useState(true)
	const [otherError, setOtherError] = useState(false)
	const [processingSubmit, setProcessingSubmit] = useState(false)


	// hooks
	const curUsername = user.username
	const initialFormState = {
		username: curUsername,
		curPassword: '',
		newPassword: '', 
		confirmNew: ''
	}
	const { formData, handleChange, resetFormData } = useFields(initialFormState)

	// event handlers
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetFormData();
		setPasswordMatchError(false);
		setIncorrectPasswordError(false);
		setOtherError(false);
		setProcessingSubmit(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setProcessingSubmit(true)
		try{
			await UserServices.updatePassword(formData);
			handleClose();
		}catch(err){
			setProcessingSubmit(false)
			if(err.status === 401){
				setIncorrectPasswordError(true);
				setDisableSubmit(true);
			} else{
				setOtherError(true);
			};
		};
	};

	// effects
	useEffect(() => {
		if(incorrectPasswordError && formData.curPassword === ''){
			setIncorrectPasswordError(false);
		};

		const values = Object.values(formData);
		for(let v of values) {
			if(!v) {
				setDisableSubmit(true);
				return;
			};
		};

		if(formData.newPassword !== formData.confirmNew){
			setPasswordMatchError(true);
			setDisableSubmit(true);
			return;
		} else {
			setPasswordMatchError(false);
		};

		setDisableSubmit(false);
	}, [formData]);

	const generateContent = () => {
		if(otherError){
			return (
				<DialogContent>
					<Typography>
							Something went wrong, password not updated.
					</Typography>
				</DialogContent>
			)
		}else if(processingSubmit){
			return (
				<DialogContent>
					<Loader />
				</DialogContent>
			)
		}else{
			return (
				<DialogContent>
					<Box 
						component='form'
						noValidate 
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<TextField 
								sx={{display:"none"}}
								name='username'
								value={formData.curUsername}
								autoComplete="username"	
							/>
							<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="curPassword"
										label="Current Password"
										type="password"
										id="current-password"
										autoComplete="password"
										onChange={handleChange}
										value={formData.curPassword}
										error={incorrectPasswordError}
										helperText={
											incorrectPasswordError ? 'Incorrect Password' : null
										}
									/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="newPassword"
									label="New Password"
									type="password"
									id="newPassword"
									autoComplete="new-password"
									onChange={handleChange}
									value={formData.newPassword}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="confirmNew"
									label="Confirm New Password"
									type="password"
									id="confirm-new"
									autoComplete="new-password"
									onChange={handleChange}
									value={formData.confirmNew}
									error={!!passwordMatchError}
									helperText={
										passwordMatchError ? 'Does Not Match' : null
									}
								/>
								</Grid>
							</Grid>
						</Box>
					</DialogContent>
			)
		}
	}

	return (
		<>
			<Button onClick={handleOpen} size='large' variant='outlined'>
				Change Password
			</Button>
			<Dialog open={open} onClose={e=>handleClose(e)} fullWidth>
				<DialogTitle>
					<Typography component="p" variant='h6'>
						Update Password
					</Typography>
				</DialogTitle>
				{generateContent()}
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit} disabled={disableSubmit} >Submit</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ChangePasswordDialog;