import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Grid, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl } from "@mui/material";

import UserContext from "../../context/UserContext";
import useFields from "../../hooks/useFields";
import UserServices from "../../api/services/user.services";
import useFormValidate from "../../hooks/useFormValidate";
import Format from "../../utilities/format";

import ChangePasswordDialog from "../../components/editUser/ChangePasswordDialog";

// inital state variables
const formInitialState = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	streetAddress: '',
	city: '',
	state: '',
	zip: '',
	tagLine: '',
	avatarUrl: ''
};

const usStatesMap = Format.stateMap
const validationRules = {
	firstName: {required:true},
	lastName: {required:true},
	email: {required:true, format: 'email'},
	state: {length: {min:2, max:2}},
	zip: {length: {min:5, max:5}, format: 'number'}
}

const EditUser = () => {
	// context
	const { user } = useContext(UserContext);

	// state
	const [error, setError] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// hooks
	const { formData, handleChange, resetFormData, updateFormData } = useFields(formInitialState);
	const isFirstRender = useRef(true);
	const navigate = useNavigate();
	const { validationErrors, validateForm } = useFormValidate();

	// event handlers
	const handleSubmit = async(evt) => {
		evt.preventDefault();
		setError(false);
		setSubmitted(true);
		validateForm(formData, validationRules);
	};

	const updateUserInfo = async () => {
		try{
			await UserServices.editUser(user.username, formData);
			navigate(`/users/${user.username}/dashboard`);
			resetFormData();
		} catch(err){
			setError(true);
		};
	};

	// fetch functions
	const getCurUserInfo = async () => {
		try{
			const info = await UserServices.getUserInfo(user.username);
			const fields = Object.keys(formInitialState);
			fields.forEach(f => {
				info[f] = info[f] || '' 
			});
			updateFormData(info);
		}catch(err){
			if(err.status === 500){
				navigate('/error/network');
			} else if(err.status === 401){
				navigate('/error/unauthorized');
			} else {
				navigate('/error/general');
			}
		};
	};

	// effects
	useEffect(() => {
		if(isFirstRender.current){
			isFirstRender.current = false;
			return;
		}
		getCurUserInfo();
	}, []);

	useEffect(() => {
		if(submitted && validationErrors && Object.keys(validationErrors).length === 0){
			updateUserInfo();
		} else setSubmitted(false);
	}, [validationErrors]);

	// component generators
	const createStateSelector = () => {
		return (
			<FormControl fullWidth>
				<InputLabel id='state-select-label'>State</InputLabel>
				<Select
					labelId="state-select-label"
					id="state=select-label"
					value={formData.state}
					label="state"
					onChange={handleChange}
					name='state'
				>
					{Object.keys(usStatesMap).map(s => {
						return (
							<MenuItem value={usStatesMap[s]}>{s}</MenuItem>
						)
					})}
				</Select>
			</FormControl>
		)
	};

	return (
		<Container >
			<Box
				sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				}}
			>
			<Typography component="h1" variant="h3">
				Update Information
			</Typography>
			{
				error ?
					<Typography>Something went wrong, information not updated.</Typography>
					: null
			}
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								value={formData.firstName}
								onChange={handleChange}
								error={!!validationErrors?.firstName}
								helperText={validationErrors?.firstName || null}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								error={!!validationErrors?.lastName}
								helperText={validationErrors?.lastName || null}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={formData.email}
								onChange={handleChange}
								error={!!validationErrors?.email}
								helperText={validationErrors?.email || null}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ChangePasswordDialog />
						</Grid>
						<Grid item xs={12} md={12}>
							<TextField
								fullWidth
								id="streetAddress"
								label="Street Address"
								name="streetAddress"
								value={formData.streetAddress}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={5}>
							<TextField
								fullWidth
								name="city"
								label="City"
								id="city"
								value={formData.city}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={3} md={3}>
							{createStateSelector()}
						</Grid>
						<Grid item xs={9} md={4}>
							<TextField
								fullWidth
								name="zip"
								label="Zip"
								id="zip"
								value={formData.zip}
								onChange={handleChange}
								error={validationErrors?.zip}
								helperText={validationErrors?.zip || null}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="tagLine"
								label="Tag Line"
								id="tagLine"
								value={formData.tagLine}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="avatarUrl"
								label="Avatar"
								id="avatar"
								value={formData.avatarUrl}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Save
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default EditUser;