import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import UserContext from '../context/UserContext';



function NavBar() {
	// context
	const { user, setUser } = useContext(UserContext);

	// state
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// hooks
	const navigate = useNavigate();
	
	// functions
	const handleLogout = () => {
		setUser({})
		localStorage.removeItem('currUser')
		handleCloseUserMenu()
		navigate('/')
	};

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// other variables
	const pages = user.username  ? 
				[
					{title: 'Dashboard', route: `/users/${user.username}/dashboard`},
					{title: 'New Event', route: '/gatherings/create'}
				]
			:
				[
					{title:'Sign Up', route: '/signup'},
					{title: 'Login', route: '/login'}
				];
	
	const settings = user.username ? 
				[
					{title: 'Edit Account', route: `/users/${user.username}/edit`}, 
					{title: 'Log Out', route: `/logout`, handler : handleLogout}
				]
			: 
				[];


	return (
		<AppBar 
			position="static"
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component={RouterLink}
						to='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Gather4Grub
					</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: 'block', md: 'none' },
						}}
					>
					{pages.map((page) => (
						<MenuItem key={page.title} onClick={handleCloseNavMenu}>
							<Typography 
								textAlign="center"
								to={page.route}
								component={RouterLink}
							>
								{page.title}
							</Typography>
						</MenuItem>
					))}
					</Menu>
				</Box>
				<Typography
					variant="h5"
					noWrap
					component={RouterLink}
						to='/'
					sx={{
					mr: 2,
					display: { xs: 'flex', md: 'none' },
					flexGrow: 1,
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
					}}
				>
					Gather4Grub
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					{pages.map((page) => (
						<Button
							key={page.title}
							to={page.route}
							component={RouterLink}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							{page.title}
						</Button>
					))}
				</Box>
				{user.username ? 
					<Box sx={{ flexGrow: 0, }}>
						<Tooltip title={user.username}>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={user.username} src={user.avatar?.url} sx={{backgroundColor:'white'}} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
						{settings.map((setting) => (
							<MenuItem key={setting.title} onClick={setting.handler || handleCloseUserMenu}>
								<Typography 
									textAlign="center"
									to={setting.route}
									component={RouterLink}
									sx={{
									textDecoration:'none'
									}}
								>
									{setting.title}
								</Typography>
							</MenuItem>
						))}
						</Menu>
					</Box>
					: null
				}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default NavBar;