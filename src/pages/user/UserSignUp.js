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



const UserSignUp = () => {
	const { setUser } = useContext(UserContext)

	const navigate = useNavigate()
	const [formData, setFormData, handleChange, resetFormData] = useFields({
			firstName : '',
			lastName : '',
			email : '',
			username : '',
			password : ''
		})
	const [generalError, setGeneralError] = useState(false)

	const {	validationErrors, validateRegisterForm} = useFormValidate({})
	const { apiErrors, validateUniqueFields } = useApiValidation({});
	const [submitted, setSubmitted] = useState(false)

	const requiredFields = Object.keys(formData)

	const handleSubmit = (event) => {
		event.preventDefault()
		setGeneralError(false)
		setSubmitted(true)
		validateRegisterForm(formData, requiredFields)
	};

	const register = async () => {
		const registerRes = await UserServices.registerUser(formData);
		if(registerRes?.status == 201) {
			setUser({username:formData.username, token: registerRes.data.token})
			navigate(`/users/${formData.username}/dashboard`);
			resetFormData()
			setSubmitted(false)
			return
		} else{
			setGeneralError(true)
			setSubmitted(false)
			return
		}
	}

	const checkApiValidations = async() => {
		await validateUniqueFields({username: formData.username, email: formData.email})
	}

	useEffect(() => {
		if(submitted && validationErrors && Object.keys(validationErrors).length === 0) {
			checkApiValidations()
		} else setSubmitted(false)
	}, [validationErrors]);

	useEffect(() => {
		if(submitted && apiErrors && Object.keys(apiErrors).length === 0){
			register()
		} else setSubmitted(false)
	}, [apiErrors])

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
									Oops! Something went wrong, please try again.
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
								error={!!validationErrors?.email || !!apiErrors?.email}
								helperText={validationErrors?.email || apiErrors?.email}
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
								error={!!validationErrors?.username || !!apiErrors?.username}
								helperText={validationErrors?.username || apiErrors?.username}
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