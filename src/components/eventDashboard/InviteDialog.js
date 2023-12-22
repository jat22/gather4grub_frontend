import React, {useEffect, useState, useContext } from 'react';
import { List, ListItem, ListItemButton, Checkbox, ListItemText, ListItemIcon, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import UserContext from '../../context/UserContext';
import EventServices from '../../api/services/event.services';
import { SettingsPowerTwoTone } from '@mui/icons-material';


const InviteDialog = ({ inviteGuests, currentGuestList, apiErrors, setApiErrors }) => {
	// context
	const { user } = useContext(UserContext)

	// state
	const [open, setOpen] = useState(false);
	const [potentialInvites, setPotentialInvites] = useState([]);
	const [checked, setChecked] = useState([0]);
	const [submitted, setSubmitted] = useState(false);

	// event handlers
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		};
		setChecked(newChecked);
	};

	const handleClickOpen = () => {
		setChecked( c => [])
		setOpen(true);
	};

	const handleClose = () => {
		setSubmitted(false)
		setOpen(false);
		setChecked(c => [0]);
		setPotentialInvites(i => []);
		setApiErrors({});
	};

	const handleInvite = () => {
		inviteGuests(checked);
		setSubmitted(true);
	};

	// fetching function
	const getPotentialInvites = async() => {
		try{
			setPotentialInvites(await EventServices.getPotentialInvites(currentGuestList, user.username));
		} catch(err){
			setApiErrors(e=> ({potentialInvites: true}));
		};
	};

	// effects
	useEffect(() => {	
		getPotentialInvites();
	}, [open]);

	useEffect(() => {
		if(submitted && !apiErrors?.invites){
			handleClose();
		}else if(submitted){
			setSubmitted(false);
		};
	}, [apiErrors]);

	// generates list of current user's connections that are not currently invited to the event.
	const uninvitedConnections = () => {
		if(!potentialInvites || potentialInvites.length < 1) return null;
		return (
			<List>
				{potentialInvites.map((c) => {
					const username = c.username;
					const labelId = `checkbox-list-label-${username}`;
					return (
						<ListItem
							key={username}
							disablePadding
						>
							<ListItemButton role={undefined} onClick={handleToggle(username)} dense>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={checked.indexOf(username) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={username} />
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		);
	};

	return (
		<>
			<Button variant="text" size='small' onClick={handleClickOpen}>
			Invite
			</Button>
			<Dialog fullWidth open={open} onClose={handleClose}>
				<DialogTitle>Add Guests</DialogTitle>
				<DialogContent>
					{apiErrors?.invites ? 
						<Typography>Something went wrong, invites not sent.</Typography>
						: null
					}
					{apiErrors?.potentialInvites ? 
						<Typography>Unable to load connections at this time.</Typography>
						: null
					}
					{uninvitedConnections()}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleInvite}>Invite</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default InviteDialog;