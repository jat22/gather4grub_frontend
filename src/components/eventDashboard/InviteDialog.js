import React, {useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { List, ListItem, IconButton, ListItemButton, Checkbox, ListItemText, ListItemIcon } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useFields from '../../hooks/useFields';
import G4GApi from '../../api/G4GApi';
import UserContext from '../../context/UserContext';
import UserServices from '../../api/services/user.services';
import EventServices from '../../api/services/event.services';

export default function InviteDialog({ inviteGuests, currentGuestList }) {
	const [open, setOpen] = useState(false);
	const { user } = useContext(UserContext)
	const [potentialInvites, setPotentialInvites] = useState([]);

	const [checked, setChecked] = useState([0]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleClickOpen = () => {
		setChecked( c => [])
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInvite = () => {
		setOpen(false);
		inviteGuests(checked)
	}

	useEffect(() => {
		const getPotentialInvites = async() => {
			setPotentialInvites(await EventServices.getPotentialInvites(currentGuestList, user.username))
		}
		getPotentialInvites()
	}, [open])

	const uninvitedConnections = () => {
		if(!potentialInvites || potentialInvites.length < 1) return null
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
			
		)
	}

	return (
		<>
			<Button variant="outlined" size='small' onClick={handleClickOpen}>
			Invite
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Guests</DialogTitle>
				<DialogContent>
					{uninvitedConnections()}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleInvite}>Invite</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}