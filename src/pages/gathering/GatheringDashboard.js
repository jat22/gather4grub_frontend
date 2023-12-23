
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Box, ButtonGroup, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import UserContext from '../../context/UserContext';
import EventServices from '../../api/services/event.services';

import GuestList from '../../components/eventDashboard/GuestList';
import EventMenu from '../../components/eventDashboard/EventMenu';
import EventComments from '../../components/eventDashboard/EventComments';
import EditDetailsDialog from '../../components/eventDashboard/EditDetailsDialog';
import InviteDialog from '../../components/eventDashboard/InviteDialog';
import AddCourseDialog from '../../components/eventDashboard/AddCourseDialog';
import AddMenuItemDialog from '../../components/eventDashboard/AddMenuItemDialog';
import AddCommentDialog from '../../components/eventDashboard/AddCommentDialog';
import Loader from '../../components/Loader';


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
	currUserHost : false,
	currUserRsvp: {}
}

const GatheringDashboard = () => {
	// context
	const { user } = useContext(UserContext);

	// state
	const [eventInfo, setEventInfo] = useState(eventInitialState);
	const [apiErrors, setApiErrors] = useState({})
	const [loaded, setLoaded] = useState(false)

	// hooks
	const { eventId } = useParams();
	const isFirstRender = useRef(true);
	const navigate = useNavigate();


	const basicDetails = {
		id : eventInfo?.id || '',
		title : eventInfo?.title || '',
		date : eventInfo?.date || '',
		startTime : eventInfo?.startTime || '',
		endTime : eventInfo?.endTime || '',
		displayTime : eventInfo?.displayTime || '',
		location : eventInfo?.location || '',
		description : eventInfo?.description || ''
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

	const updateDisplayComments = (comments) => {
		setEventInfo(i => ({...i, comments: comments}));
	};

	const updateDisplayRsvp = (rsvp) => {
		setEventInfo(i => ({...i, currUserRsvp: rsvp}))
	};


	// api interactions
	const getEventInfo = async() => {
		try{
			const info = await EventServices.getEventInfo(eventId)
			console.log(info)
			if(info !== undefined){
				info.currUserHost = user.username === info.host
			};
			setEventInfo(i => info);
			setLoaded(l => true)
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized')
			} else if(err.status === 500 && err.msg === 'Network Error'){
				navigate('/error/network')
			} else{
				navigate('/error/general')
			};
		}
	};

	const updateBasicDetails = async (data) => {
		try{
			const res = await EventServices.updateBasicDetails(eventId, data);
			setApiErrors({})
			updateDisplayDetails(res);
		}catch(err){
			setApiErrors(e => ({basicDetails: true}) )
		};
	};

	const inviteGuests = async (usernames) => {
		try{
			const res = await EventServices.inviteGuests(usernames, eventId);
			setApiErrors({});
			updateDisplayGuestList(res);
		}catch(err){
			setApiErrors(e => ({invites: true}))
		};
	};

	const uninviteGuest = async(username) => {
		try{
			const res = await EventServices.uninviteGuest(username, eventId);
			setApiErrors({})
			updateDisplayGuestList(res);
		}catch(err){
			setApiErrors(e=>({uninvite: true}))
		};	
	};

	const addNewCourse = async(newCourse) => {
		try{
			const res = await EventServices.addMenuCategory(eventId, newCourse);
			setApiErrors({})
			updateDisplayMenu(res);
		}catch(err){
			setApiErrors(e => ({newCourse:true}))
		};
	}

	const addMenuItem = async(newItem) => {
		newItem['courseId'] = 
			eventInfo.menu.find( c => c.courseName === newItem.course).courseId;
		try{
			const res = await EventServices.addMenuItem(eventId, {...newItem, username:user.username});
			setApiErrors({});
			updateDisplayMenu(res);
		}catch(err){
			setApiErrors(e => ({addMenuItem: true}))
		};
	};

	const removeDish = async(dishId) => {
		try{
			const res = await EventServices.removeDish(dishId, eventInfo.id);
			setApiErrors({})
			updateDisplayMenu(res);
		}catch(err){
			setApiErrors(e => ({removeDish: true}))
		};
	};

	const addComment = async(comment) => {
		try{
			const res = await EventServices.addComment(comment, user.username, eventInfo.id);
			setApiErrors({})
			updateDisplayComments(res);
		}catch(err){
			setApiErrors(e => ({addComment: true}))
		};
	};

	const removeComment = async(commentId) => {
		try{
			const res = await EventServices.removeComment(commentId, eventInfo.id);
			setApiErrors({})
			updateDisplayComments(res);
		}catch(err){
			setApiErrors(e => ({removeComment: true}))
		};
	};

	const updateRsvp = async(rsvp) => {
		try{
			console.log(rsvp)
			const res = await EventServices.updateRsvp(user.username, eventInfo.currUserRsvp.id, rsvp)
			updateDisplayRsvp(res);
			const newGuestList = await EventServices.getGuestList(eventInfo.id);
			updateDisplayGuestList(newGuestList)
		}catch(err){

		}
	}

	const handleRsvpUpdate = async(rsvp)=>{
		if(eventInfo.currUserRsvp.rsvp === rsvp) return;
		await updateRsvp(rsvp);
	}


	// effects
	useEffect(() => {
		if(isFirstRender.current){
			isFirstRender.current = false;
			return;
		}
		getEventInfo();
	}, []);


	if(!loaded){
		return (
			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}>
				<Loader />
			</Box>
		);
	};

	return(
		<Container maxWidth='lg' sx={{ mt:4, mb:4 }}>
			<Grid container spacing={3}>
				{/* ###################### EVENT DETAILS ######################### */}
				<Grid item xs={12} md={12}>
					<Paper
						elevation={4}
						sx={{
							p: 3,
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'start'
						}}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant='h3' components='h2'>
									{eventInfo.title}
								</Typography>
							</Grid>
							<Grid item xs={12} md={4}>
								<List  sx={{padding:0}}>
									<ListItem 
										key='host'
										sx={{padding:0}}	
									>
										<ListItemIcon>
											<PersonPinIcon />
										</ListItemIcon>
										<ListItemText>
											{eventInfo.host}
										</ListItemText>
									</ListItem>
									<ListItem 
										key='date'
										sx={{padding:0}}	
									>
										<ListItemIcon>
											<CalendarMonthIcon />
										</ListItemIcon>
										<ListItemText>
											{eventInfo.date}
										</ListItemText>
									</ListItem>
									<ListItem 
										key='time'
										sx={{padding:0}}
									>
										<ListItemIcon>
											<AccessTimeFilledIcon  />
										</ListItemIcon>
										<ListItemText>
											{eventInfo.displayTime}
										</ListItemText>
									</ListItem>
									<ListItem 
										key='location'
										sx={{padding:0}}
									>
										<ListItemIcon>
											<MapIcon  />
										</ListItemIcon>
										<ListItemText>
											{eventInfo.location}
										</ListItemText>
									</ListItem>
								</List>
							</Grid>
							<Grid item xs={12} md={8}>
								<Typography variant='overline'>What to Know</Typography>
								<Typography variant='body2'>{eventInfo.description}</Typography>
							</Grid>
							<Grid item xs={12}>
							{eventInfo.currUserHost ? 
									<EditDetailsDialog 
										basicDetails={basicDetails} 
										updateBasicDetails={updateBasicDetails}
										apiErrors={apiErrors} 
										setApiErrors={setApiErrors}
									/>
									: 
									<ButtonGroup>
										<Button 
											onClick={()=>handleRsvpUpdate('accept')}
											variant={eventInfo.currUserRsvp.rsvp === 'accept' ? 'contained' : 'outlined'}
										>
											Attending
										</Button>
										<Button
											onClick={()=>handleRsvpUpdate('decline')}
											variant={eventInfo.currUserRsvp.rsvp === 'decline' ? 'contained' : 'outlined'}
										>
											Not Attending
										</Button>
										<Button
											onClick={()=>handleRsvpUpdate('pending')}
											variant={eventInfo.currUserRsvp.rsvp === 'pending' ? 'contained' : 'outlined'}
										>
											TBD
										</Button>
									</ButtonGroup>
								}
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				{/* ################### GUESTS ######################## */}
				<Grid item xs={12} sm={6} md={5} lg={4}>
					<Paper
						elevation={4}
						sx={{
							p: 3,
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'start'
						}}
					>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<Typography variant='h4' components='h3'>
									Guests
								</Typography>
							</Grid>
							{eventInfo.currUserHost ? 
								<Grid item xs={12}>

									<InviteDialog 
										inviteGuests={inviteGuests} 
										currentGuestList={eventInfo.guests}
										apiErrors={apiErrors} 
										setApiErrors={setApiErrors}
									/> 
									{apiErrors?.uninvite ? 
										<Typography>Something went wrong, guest not removed.</Typography>
										: null
									}
								</Grid>
								: null
							}
							<Grid item xs={12}>
								<GuestList 
									guests={eventInfo.guests} 
									isHost={eventInfo.currUserHost} 
									uninviteGuest={uninviteGuest} 
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				<Grid item xs={12} sm={6} md={7} lg={8}>
					<Grid container spacing={3}>
						{/* ######################### MENU ###################### */}
						<Grid item xs={12}>
							<Paper
								elevation={4}
								sx={{
									p: 3,
									display: 'flex',
									flexDirection: 'column',
									textAlign: 'start'
								}}
							>
								<Grid item xs={12}>
									<Typography variant='h4' components='h3'>
										Menu
									</Typography>
									{eventInfo.currUserRsvp?.rsvp === 'accept' || eventInfo.currUserHost ?
										<>
											<AddMenuItemDialog 
												menu={eventInfo.menu} 
												addMenuItem={addMenuItem} 
												apiErrors={apiErrors} 
												setApiErrors={setApiErrors} 
											/>
											{eventInfo.currUserHost ? 
												<AddCourseDialog 
													addNewCourse={addNewCourse}
													apiErrors={apiErrors}
													setApiErrors={setApiErrors}
												/>
												: null
											}
										</>
										: null
									}
								</Grid>
								<Grid item xs={12}>
								{eventInfo?.menu.length > 0 ?
									<EventMenu 
										menu={eventInfo.menu} 
										isHost={eventInfo.currUserHost} 
										username={user.username}
										removeDish={removeDish}
									/>
									: null
								}					
								</Grid>
							</Paper>
						</Grid>
						{/* ############################## COMMENTS ########################## */}
						<Grid item xs={12}>
							<Paper
								elevation={4}
								sx={{
									p: 3,
									display: 'flex',
									flexDirection: 'column',
									textAlign: 'start'
								}}
							>
								<Grid item xs={12}>
									<Typography variant='h4' components='h3'>
										Comments
									</Typography>
									<AddCommentDialog 
										addComment={addComment} 
										apiErrors={apiErrors} 
										setApiErrors={setApiErrors} 
									/>
									{apiErrors?.removeComment ? 
										<Typography>
											Something went wrong, comment not removed.
										</Typography>
										: null
									}
								</Grid>
								<Grid item xs={12}>
									<EventComments 
										comments={eventInfo.comments} 
										removeComment={removeComment}
										isHost={eventInfo.currUserHost}
										username={user.username} 
									/>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
					
				</Grid>
			</Grid>
		</Container>
	);
};

export default GatheringDashboard;