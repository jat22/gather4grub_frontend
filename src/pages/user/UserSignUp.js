import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Button, } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserContext from '../../context/UserContext';
import useFormValidate from '../../hooks/useFormValidate';
import useFields from '../../hooks/useFields';
import UserServices from '../../api/services/user.services';
import useApiValidation from '../../hooks/useApiValidation';

const validationRules = {
	firstName: {required:true},
	lastName: {required:true},
	email: {required:true, format: 'email'},
	username : {required: true, length: {min:3, max:20}},
	password: {required:true, length:{min:8, max:20}}
}

const UserSignUp = () => {
	// context
	const { user, setUser } = useContext(UserContext);

	// state
	const [generalError, setGeneralError] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// hooks
	const navigate = useNavigate();

	const { formData, handleChange, resetFormData } = useFields({
			firstName : '',
			lastName : '',
			email : '',
			username : '',
			password : ''
		});
	const {	validationErrors, validateForm} = useFormValidate({});
	const { apiValidationErrors, validateUniqueFields } = useApiValidation({});

	// functions
	const handleSubmit = (event) => {
		event.preventDefault();
		setGeneralError(false);
		setSubmitted(true);

		// triggers frontend validations
		validateForm(formData, validationRules);
		
	};

	const register = async () => {
		try{
			const registerRes = await UserServices.registerUser(formData);
			setUser({username: registerRes.data.user.username, token: registerRes.data.token});
			resetFormData();
			setSubmitted(false);
			return
		} catch(err){
			setGeneralError(true);
			setSubmitted(false);
			return
		};
	};

	const checkApiValidations = async() => {
		try{
			await validateUniqueFields({username: formData.username, email: formData.email});
		} catch(err){
			setGeneralError(true);
		};
	};

	// effects
	useEffect(() => {
		// after frontend validation is successful, trigger api validations
		if(submitted && validationErrors && Object.keys(validationErrors).length === 0) {
			checkApiValidations();
		} else setSubmitted(false);
	}, [validationErrors]);

	useEffect(() => {
		// after all validations are successful, call register function
		if(submitted && apiValidationErrors && Object.keys(apiValidationErrors).length === 0){
			register();
		} else setSubmitted(false);
	}, [apiValidationErrors])

	useEffect(() => {
		// if there's a logged in user, navigate to their dashboard
		if(user.username){
			navigate(`/users/${user.username}/dashboard`);
		};
	},[user]);

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
			<Typography component="h1" variant="h3">
				Sign Up
			</Typography>
				<Box component="form" noValidate sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						{generalError ? 
							<Grid item xs={12} lg={12}>
								<Typography component={'span'} sx={{color:'red'}}>
									Unable to process your request at this time. Please try again later.
								</Typography>
							</Grid>
							: null
						}
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firs-name"
								label="First Name"
								autoFocus
								value={formData.firstName}
								onChange={handleChange}
								error={!!validationErrors?.firstName}
								helperText={validationErrors?.firstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="last-name"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
								value={formData.lastName}
								onChange={handleChange}
								error={!!validationErrors?.lastName}
								helperText={validationErrors?.lastName} 
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								value={formData.email}
								error={!!validationErrors?.email || !!apiValidationErrors?.email}
								helperText={validationErrors?.email || apiValidationErrors?.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete='username'
								onChange={handleChange}
								value={formData.username}
								error={!!validationErrors?.username || !!apiValidationErrors?.username}
								helperText={validationErrors?.username || apiValidationErrors?.username}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={handleChange}
								value={formData.password}
								error={!!validationErrors?.password}
								helperText={validationErrors?.password}
							/>
						</Grid>
					</Grid> 
					<Button
						onClick={handleSubmit}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link 
								href="#"
								component={RouterLink}
								to='/login' 
								variant="body2"
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>

	);
}


export default UserSignUp