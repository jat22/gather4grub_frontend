import React, { useContext} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const UserLogin = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext)

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formInput = new FormData(event.currentTarget);
		const data = {
			username: formInput.get('username'),
			password: formInput.get('password')
		};
		const result = await G4GApi.getToken(data)
    	if(result.status !== 200){
     		navigate('/unauthorized')
     		return
    	}
		setUser({username:data.username, token: result.data.token})
		navigate(`/users/${data.username}/dashboard`)
	};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link 
					component={RouterLink}
					to='/signup'
					href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UserLogin