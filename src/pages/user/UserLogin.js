import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Button, TextField, Link, Grid, Box, Typography, Container  } from '@mui/material';
import UserContext from '../../context/UserContext';
import useFields from '../../hooks/useFields';
import UserServices from '../../api/services/user.services';



const UserLogin = () => {
	// state variables
	const { user, setUser } = useContext(UserContext);
	const [loginError, setLoginError] = useState(null);
	const [disableSubmit, setDisableSubmit] = useState(true);

	// hook variables
	const navigate = useNavigate();
	const [formData, setFormData, handleChange, resetFormData] = 
							useFields({username: '', password: ''});

	
	// functions
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const result = await UserServices.login(formData);

			// on successful login user context is set
			setUser({username:formData.username, token: result.token});

			setLoginError(e => (null));
		} catch(err) {
			if(err.status === 401){
				setLoginError( e => (
					'Incorrect Username/Password'));
				resetFormData();
			} else{
				navigate('/error/network');
			};
		};
	};

	// effects
	useEffect(() => {
		// if user context, redirects to user dashboard
		if(user.username){
			navigate(`/users/${user.username}/dashboard`);
		};
	},[user])

	useEffect(() => {
		// enables submit button once both fields complete
		const values = Object.values(formData)
			for(let v of values) {
				if(!v) {
					setDisableSubmit(true);
					return
				};
			};
		setDisableSubmit(false);
	}, [formData]);

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
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
					{
						loginError? 
							<Typography sx={{color:'red'}}>
								{loginError}
							</Typography>
						:
							null
					}
				<Box 
					component="form" 
					onSubmit={handleSubmit} 
					noValidate 
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						autoComplete="username"
						autoFocus
						error={loginError}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						id="password"
						autoComplete="current-password"
						error={loginError}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={disableSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link 
								component={RouterLink}
								to='/signup'
								href="#" variant="body2"
							>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
  	);
};

export default UserLogin