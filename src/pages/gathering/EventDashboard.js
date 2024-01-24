
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import UserContext from '../../context/UserContext';
import EventServices from '../../api/services/event.services';

import Loader from '../../components/Loader';
import EventDetails from '../../components/eventDashboard/EventDetails';
import EventGuests from '../../components/eventDashboard/EventGuests';
import EventMenuPaper from '../../components/eventDashboard/EventMenuPaper';
import EventCommentsPaper from '../../components/eventDashboard/EventCommentsPaper';

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
	const navigate = useNavigate();

	// 
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
			const res = await EventServices.updateBasicDetails(data);
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

	const removeMenuItem = async(dishId) => {
		try{
			const res = await EventServices.removeMenuItem(dishId, eventInfo.id);
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
			const res = await EventServices.updateRsvp(user.username, eventInfo.currUserRsvp.id, rsvp)
			updateDisplayRsvp(res);
			const newGuestList = await EventServices.getGuestList(eventInfo.id);
			setApiErrors({})
			updateDisplayGuestList(newGuestList)
		}catch(err){
			setApiErrors(e=>({rsvp: true}))
		}
	}

	const handleRsvpUpdate = async(rsvp)=>{
		if(eventInfo.currUserRsvp.rsvp === rsvp) return;
		await updateRsvp(rsvp);
	}


	// effects
	useEffect(() => {
		getEventInfo();
	}, []);


	if(!loaded){
		return <Loader />
	};

	return(
		<Container maxWidth='lg' sx={{ mt:4, mb:4 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12}>
					<EventDetails 
						eventInfo={eventInfo}
						basicDetails={basicDetails}
						updateBasicDetails={updateBasicDetails}
						apiErrors={apiErrors}
						setApiErrors={setApiErrors}
						handleRsvpUpdate={handleRsvpUpdate}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={5} lg={4}>
					<EventGuests 
						eventInfo={eventInfo}
						inviteGuests={inviteGuests}
						apiErrors={apiErrors}
						setApiErrors={setApiErrors}
						uninviteGuest={uninviteGuest}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={7} lg={8}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<EventMenuPaper 
								eventInfo={eventInfo}
								addMenuItem={addMenuItem}
								apiErrors={apiErrors}
								setApiErrors={setApiErrors}
								addNewCourse={addNewCourse}
								removeMenuItem={removeMenuItem}
							/>
						</Grid>
						<Grid item xs={12}>
							<EventCommentsPaper 
								eventInfo={eventInfo}
								addComment={addComment}
								apiErrors={apiErrors}
								setApiErrors={setApiErrors}
								removeComment={removeComment}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default GatheringDashboard;