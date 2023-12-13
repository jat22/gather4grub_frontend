import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Grid, Typography, TextField, Button, Link } from "@mui/material";

import UserContext from "../../context/UserContext";
import useFields from "../../hooks/useFields";
import UserServices from "../../api/services/user.services";

import ChangePasswordDialog from "../../components/editUser/ChangePasswordDialog";

// *********************** NEXT - change password dialog ^^^ ************************


// inital state variables
const formInitialState = {
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	streetAddress: '',
	city: '',
	state: '',
	zip: '',
	tagLine: '',
	bio: '',
	avatarUrl: ''
};

const EditUser = () => {
	// context
	const { user } = useContext(UserContext);

	// state
	const [error, setError] = useState(false);

	// hooks
	// const { formData, handleChange, resetFormData, updateFormData} = useFields(formInitialState);
	const [formData, setFormData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields(formInitialState);
	const isFirstRender = useRef(true);
	const navigate = useNavigate();

	// event handlers
	const handleSubmit = async (e) => {
		e.preventDefault();
		delete formData.username;
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
			const fields = Object.keys(info)
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
							<TextField
								fullWidth
								name="state"
								label="State"
								id="state"
								value={formData.state}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={9} md={4}>
							<TextField
								fullWidth
								name="zip"
								label="Zip"
								id="zip"
								value={formData.zip}
								onChange={handleChange}
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
								name="avatar"
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