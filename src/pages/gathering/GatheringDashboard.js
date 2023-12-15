
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Grid } from '@mui/material';

import UserContext from '../../context/UserContext';
import EventServices from '../../api/services/event.services';

import GuestList from '../../components/eventDashboard/GuestList';
import EventMenu from '../../components/eventDashboard/EventMenu';
import EventComments from '../../components/eventDashboard/EventComments';
import EditDetailsDialog from '../../components/eventDashboard/EditDetailsDialog';
import InviteDialog from '../../components/eventDashboard/InviteDialog';
import EditMenuDialog from '../../components/eventDashboard/EditMenuDialog';
import AddMenuItemDialog from '../../components/eventDashboard/AddMenuItemDialog';
import AddCommentDialog from '../../components/eventDashboard/AddCommentDialog';


const eventInitialState = {
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
}

const PartyDetails = () => {
	// context
	const { user } = useContext(UserContext);

	// state
	const [eventInfo, setEventInfo] = useState(eventInitialState);

	// hooks
	const { eventId } = useParams();
	const isFirstRender = useRef(true);


	const basicDetails = eventInfo ? {
		id : eventInfo.id,
		title : eventInfo.title,
		date : eventInfo.date,
		startTime : eventInfo.startTime,
		endTime : eventInfo.endTime,
		displayTime : eventInfo.displayTime,
		location : eventInfo.location ? eventInfo.location : '',
		description : eventInfo.description ? eventInfo.description : ''
	} : null;


	const getEventInfo = async() => {
		const info = await EventServices.getEventInfo(eventId)
		if(info !== undefined){
			info.currUserHost = user.username === info.host
		};
		setEventInfo(i => info);
	};

	// update views functions
	const updateDisplayDetails = (basicDetails) => {
		setEventInfo(i => ({...i, ...basicDetails}));
	};

	const updateDisplayGuestList = (guestList) => {
		setEventInfo(i => ({...i, guests:guestList}));
	};

	const updateDisplayMenu = (menu) => {
		setEventInfo(i => ({...i, menu:menu}));
	};
	
	const updateBasicDetails = async (data) => {
		const res = await EventServices.updateBasicDetails(eventId, data);
		updateDisplayDetails(res);
	};

	const updateDisplayComments = async(comments) => {
		setEventInfo(i => ({...i, comments: comments}));
	}


	// api interactions
	const inviteGuests = async (usernames) => {
		try{
			const res = await EventServices.inviteGuests(usernames, eventId);
			updateDisplayGuestList(res);
		}catch(err){

		};
	};

	const uninviteGuest = async(username) => {
		try{
			const res = await EventServices.uninviteGuest(username, eventId);
			updateDisplayGuestList(res);
		}catch(err){

		};	
	};

	const addNewCategory = async(newCategory) => {
		try{
			const res = await EventServices.addMenuCategory(eventId, newCategory);
			updateDisplayMenu(res);
		}catch(err){

		};
	}

	const addMenuItem = async(newItem) => {
		newItem['courseId'] = 
			eventInfo.menu.find( c => c.courseName === newItem.course).courseId;
		try{
			const res = await EventServices.addMenuItem(eventId, {...newItem, username:user.username});
			updateDisplayMenu(res);
		}catch(err){

		};
	};

	const removeDish = async(dishId) => {
		try{
			const res = await EventServices.removeDish(dishId, eventInfo.id);
			updateDisplayMenu(res);
		}catch(err){

		};
	};

	const addComment = async(comment) => {
		try{
			const res = await EventServices.addComment(comment, user.username, eventInfo.id);
			updateDisplayComments(res);
		}catch(err){

		};
	};

	const removeComment = async(commentId) => {
		try{
			const res = await EventServices.removeComment(commentId, eventInfo.id);
			updateDisplayComments(res);
		}catch(err){

		};
	};

	// effects
	useEffect(() => {
		if(isFirstRender.current){
			isFirstRender.current = false;
			return;
		}
		getEventInfo();
	}, []);

	return(
		<Container maxWidth='lg' sx={{ mt:4, mb:4 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'start'
						}}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} md={7}>
								<Typography variant='h3' components='h2'>
									{eventInfo.title}
								</Typography>

								{eventInfo.currUserHost ? 
									<EditDetailsDialog 
										basicDetails={basicDetails} 
										updateBasicDetails={updateBasicDetails} 
									/>
									: null
								}
								<Typography variant='h5' components='h3'>
									Hosted By: {eventInfo.host}
								</Typography>
								<Typography variant='h5' components='h3'>
									{eventInfo.date}
								</Typography>
								<Typography variant='h5' components='h3'>
									{eventInfo.displayTime}
								</Typography>
							</Grid>
							<Grid item xs={12} md={5}>
								<Grid container>
									<Grid item lg={12}>
										<Typography variant='h6'>
											Where:
										</Typography>
										<Typography>
											{eventInfo.location}
										</Typography>
									</Grid>
									<Grid item lg={12}>
										<Typography variant='h6'>
											What:
										</Typography>
										<Typography>
											{eventInfo.description}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography variant='h4' components='h4' sx={{margin:1,}}>
						Guests
					</Typography>
					{eventInfo.currUserHost ? 
						<InviteDialog 
							inviteGuests={inviteGuests} 
							currentGuestList={eventInfo.guests} 
						/> 
						: null
					}
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<GuestList 
							guests={eventInfo.guests} 
							isHost={eventInfo.currUserHost} 
							uninviteGuest={uninviteGuest} 
						/>
					</Paper>
				</Grid>
				
				<Grid item xs={12} md={9}>
					<Grid item lg={12} sx={{marginBottom:2}}>
						<Typography 
							variant='h4'
							components='h4' 
							sx={{margin:1,}}
						>
							Menu
						</Typography>
						<AddMenuItemDialog menu={eventInfo.menu} addMenuItem={addMenuItem} />
					 	{eventInfo.currUserHost ? 	
							<EditMenuDialog 
								menu={eventInfo.menu}
								addNewCategory={addNewCategory}
							/>
							: null
						}						
						<EventMenu 
							menu={eventInfo.menu} 
							isHost={eventInfo.currUserHost} 
							username={user.username}
							removeDish={removeDish}
						/>
					</Grid>
					<Grid item lg={12} sx={{margin:'0 0 0 0'}}>
						<Typography variant='h4' components='h4'sx={{margin:1,}}>
							Comments
						</Typography>
						<AddCommentDialog addComment={addComment} />
						<Paper >
							<EventComments 
								comments={eventInfo.comments} 
								removeComment={removeComment} 
							/>
						</Paper>
					</Grid> 
				</Grid>
			</Grid>
		</Container>
	);
};

export default PartyDetails;