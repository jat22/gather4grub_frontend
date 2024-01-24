import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, IconButton, Button, DialogActions, DialogContent, Typography, } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

import EventServices from "../../api/services/event.services";
import Loader from "../Loader";

const FullInvitationDialog = ({ invitation, acceptInvite, declineInvite }) => {
	// state
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);
	const eventInfoInitialState = {
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
	};
	const [eventInfo, setEventInfo] = useState(eventInfoInitialState);
	const [loading, setLoading] = useState(true)

	// event handlers
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setError(false);
		setEventInfo(eventInfoInitialState);
	};

	const handleAccept = () => {
		handleClose();
		acceptInvite(invitation.id);
	};

	const handleDecline = () => {
		handleClose();
		declineInvite(invitation.id);
	};

	// fetch functions
	const getEventInfo = async() => {
		try{
			const info = await EventServices.getEventInfo(invitation.eventId);
			setEventInfo(i => info);
		}catch(err){
			setError(true);
		};
		setLoading(false)
	};

	// effects
	useEffect(() => {
		if(open){
			getEventInfo();
		}
	}, [open]);

	const generateContent = ()=> {
		if(error){
			return (
				<>
					<DialogContent>
						<Typography>
							Unable to load data at this time.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
					</DialogActions>
				</>
			)
		}else if (loading){
			return (
				<>
					<DialogContent>
						<Loader />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
					</DialogActions>
				</>
			)
		}else {
			return (
				<>
					<DialogContent>
						<Typography>
							{eventInfo.title}
						</Typography>
						<Typography>
							Hosted by {eventInfo.host}
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
				</>
			)
		}
	}

	return (
		<>
			<IconButton
				edge='end'
				aria-label="expand invitation"
				onClick={handleClickOpen}
			>
				<OpenInFullIcon />
			</IconButton>
			<Dialog open={open} fullWidth>
				<DialogTitle>Invitation</DialogTitle>
				{generateContent()}
			</Dialog>
		</>
	);
};

export default FullInvitationDialog;