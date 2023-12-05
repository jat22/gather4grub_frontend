import React, { useState, useContext, useEffect } from "react";
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, FormControl, TextField, Grid, Box } from "@mui/material";
import useFields from "../../hooks/useFields";
import UserServices from "../../api/services/user.services";
import UserContext from "../../context/UserContext";

const ChangePasswordDialog = () => {
	const { user } = useContext(UserContext)
	const curUsername = user.username

	const [open, setOpen] = useState(false);
	const [formData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields({
		username: curUsername,
		curPassword: '',
		newPassword: '', 
		confirmNew: ''
	});
	const [passwordMatchError, setPasswordMatchError] = useState({error: false, msg:''})
	const [incorrectPasswordError, setIncorrectPasswordError] = useState({error:false, msg:''})
	const [disableSubmit, setDisableSubmit] = useState(true)

	const handleOpen = () => {
		setOpen(true)
	};

	const handleClose = () => {
		setOpen(false);
		resetFormData();
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const result = await UserServices.updatePassword(formData)
		console.log(result)
		if(result.success){
			handleClose();
		} else {
			setIncorrectPasswordError(e => ({error:true, msg: result.msg}))
		}
	};

	useEffect(() => {
		if(incorrectPasswordError.error && formData.curPassword === ''){
			setIncorrectPasswordError(e => ({...e, error:false}))
		}

		const values = Object.values(formData)
		for(let v of values) {
			if(!v) {
				setDisableSubmit(true)
				return
			}
		}

		if(formData.newPassword !== formData.confirmNew){
			setPasswordMatchError(e => ({error:true, msg: 'Passwords do not match.'}))
			setDisableSubmit(true)
			return
		} else {
			setPasswordMatchError(e => ({error:false, msg:''}))
		};

		setDisableSubmit(false)
	}, [formData])

	return (
		<>
			<Button onClick={handleOpen} size='large' variant='outlined'>
				Change Password
			</Button>
			<Dialog open={open} onClose={e=>handleClose(e)}>
				<DialogTitle>
					Update Password
				</DialogTitle>
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
								{!incorrectPasswordError.error 
									?
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
									/>
									:
									<TextField
										required
										error
										fullWidth
										name="curPassword"
										label="Current Password"
										type="password"
										id="current-password-incorrect"
										autoComplete="password"
										onChange={handleChange}
										value={formData.curPassword}
										helperText={incorrectPasswordError.msg}
									/>
								}
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
								{!passwordMatchError.error 
									?
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
									/>
									:
									<TextField
										required
										error
										fullWidth
										name="confirmNew"
										id='confirm-new-match-error'
										label="Confirm New Password"
										type="new-password"
										autoComplete="new-password"
										onChange={handleChange}
										value={formData.confirmNew}
										helperText={passwordMatchError.msg}
									/>
								}
								
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit} disabled={disableSubmit} >Submit</Button>
				</DialogActions>
			</Dialog>
		</>
		

	)
}

export default ChangePasswordDialog