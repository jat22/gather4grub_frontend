import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, IconButton, Button, DialogActions, DialogContent, Typography, } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EventServices from "../../api/services/event.services";

const FullInvitationDialog = ({ invitation, acceptInvite, declineInvite }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAccept = () => {
		handleClose()
		acceptInvite(invitation.id);
	}

	const handleDecline = () => {
		handleClose();
		declineInvite(invitation.id);
	}

	const [eventInfo, setEventInfo] = useState({
		id: '',
		title: '',
		host: '',
		date: '',
		startTime:'',
		endTime: '',
		displayTime: '',
		location: '',
		description: '',
		menu: [],
		guests: [],
		comments: [],
		currUserHost : false
	});

	useEffect(() => {
		const getEventInfo = async() => {
			const info = await EventServices.getEventInfo(invitation.eventId)
			setEventInfo(i => info)
		}
		getEventInfo();
	}, [])



	return (
		<>
			<IconButton
				edge='end'
				aria-label="expand invitation"
				onClick={handleClickOpen}
			>
				<OpenInFullIcon />
			</IconButton>
			<Dialog open={open} >
				<DialogTitle>Invitation from {eventInfo.host}</DialogTitle>
				<DialogContent>
					<Typography>
						{eventInfo.title}
					</Typography>
					<Typography>
						{eventInfo.date}
					</Typography>
					<Typography>
						{eventInfo.displayTime}
					</Typography>
					<Typography>
						{eventInfo.location}
					</Typography>
					<Typography>
						{eventInfo.description}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAccept}>Accept</Button>
					<Button onClick={handleDecline}>Decline</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default FullInvitationDialog