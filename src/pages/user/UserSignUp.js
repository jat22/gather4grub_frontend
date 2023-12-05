import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Button, } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import G4GApi from '../../api/G4GApi';
import UserContext from '../../context/UserContext';
import useFormRequired from '../../hooks/useFormRequired';
import useFields from '../../hooks/useFields';



const UserSignUp = () => {
	const { user, setUser } = useContext(UserContext)
	const [validationErrors, setValidationErrors] = useState({})
	const navigate = useNavigate()
	const [formData, handleChange, resetFormData] = useFields({
			firstName : '',
			lastName : '',
			email : '',
			username : '',
			password : ''
		})
	
	const [errors, validateRequired] = useFormRequired({})

	const handleSubmit = async () => {
		validateRequired(formData, Object.keys(formData))
		if(Object.keys(errors) === 0){
			const token = await G4GApi.register(formData)
			setUser({username: formData.username, token:token})
			navigate('/')
			return
		}
		setValidationErrors(e => errors)
		console.log(validationErrors)
	};
	useEffect(()=>{
		
	}, [formData])

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
								error={!!validationErrors.firstName}
								helperText={!!validationErrors.firstName ? 'Required' : null}
							/>
						</Grid>
						{/* <Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="last-name"
								autoComplete="family-name"
								value={formData.lasttName}
								onChange={handleChange}
								error={errorsRequired.lasttName}
								helperText={errorsRequired.lastName ? 'Required' : null} 
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
								error={errorsRequired.email}
								helperText={errorsRequired.email ? 'Required' : null}
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
								error={errorsRequired.username}
								helperText={errorsRequired.username ? 'Required' : null}
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
								error={errorsRequired.password}
								helperText={errorsRequired.password ? 'Required' : null}
							/>
						</Grid>*/}
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