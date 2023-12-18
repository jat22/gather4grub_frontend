
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Box } from '@mui/material';

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
	currUserHost : false
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


	// api interactions
	const getEventInfo = async() => {
		try{
			const info = await EventServices.getEventInfo(eventId)
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
										apiErrors={apiErrors} 
										setApiErrors={setApiErrors}
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
					{apiErrors?.uninvite ? 
						<Typography>Something went wrong, guest not removed.</Typography>
						: null
					}
					{eventInfo.currUserHost ? 
						<InviteDialog 
							inviteGuests={inviteGuests} 
							currentGuestList={eventInfo.guests}
							apiErrors={apiErrors} 
							setApiErrors={setApiErrors}
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
					<Grid item lg={12} sx={{margin:'0 0 0 0'}}>
						<Typography variant='h4' components='h4'sx={{margin:1,}}>
							Comments
						</Typography>
						{apiErrors?.removeComment ? 
							<Typography>
								Something went wrong, comment not removed.
							</Typography>
							: null
						}
						<AddCommentDialog 
							addComment={addComment} 
							apiErrors={apiErrors} 
							setApiErrors={setApiErrors} />
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

export default GatheringDashboard;