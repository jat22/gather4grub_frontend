import React, { useContext, useEffect, useState, useRef } from 'react';
import { Badge, Container, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import InvitationServices from '../../api/services/invitation.services';
import EventServices from '../../api/services/event.services';
import ConnectionServices from '../../api/services/connections.services';
import G4GApi from '../../api/G4GApi';

import UpcomingEvents from '../../components/userDashboard/UpcomingEvents';
import Loader from '../../components/Loader';
import ConnectPaper from '../../components/userDashboard/ConnectPaper';
import InvitationsPaper from '../../components/userDashboard/InvitationsPaper';

const UserDashboard = () => {
	// state
	const [invitations, setInvitations] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [rsvpError, setRsvpError] = useState(false);
	const [followRequests, setFollowRequests] = useState([]);
	const [apiErrors, setApiErrors] = useState({})
	const [isLoaded, setIsLoaded] = useState(false)

	// hooks
	const isFirstRender = useRef(true);
	const { user } = useContext(UserContext);
	const { username } = useParams();
	const navigate = useNavigate();

	// functions
	const getInvitations = async()=> {
		// get event invitations for logged in user and set state.
		try{
			const invites = await InvitationServices.getInvites(username);
			setInvitations(i => (invites));
			return
		} catch(err){
			if(err.status === 500){
				navigate('/error/network');
			} else if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				navigate('/error/general');
			};
		};
	}

	const getUpcomingEvents = async() => {
		// get upcoming events for logged in user and set state
		try{
			const allEvents = await EventServices.getUpcoming(username);
			setUpcomingEvents(e => allEvents?.upcoming);
			return
		}catch(err){
			if(err.status === 500){
				navigate('/error/network');
			} else if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				navigate('/error/general');
			};
		};
	};

	const getFollowRequests = async() => {
		try{
			const requests = await ConnectionServices.getRequests(user.username);
			setFollowRequests(r=>requests);
			return
		}catch(err){
			if(err.status === 500){
				navigate('/error/network');
			} else if(err.status === 401){
				navigate('/error/unauthorized');
			} else{
				navigate('/error/general');
			};
		};
	}

	const getAllData =	async () => {
		//  get upcomingEvents, invitations, and hosting for logged in user
		if(user.username !== username){
			navigate('/error/unauthorized');
			return;
		}
		await getUpcomingEvents();
		await getInvitations();
		await getFollowRequests();
		setIsLoaded(true)
	};

	const acceptInvite = async (id) => {
		try{
			const res = await G4GApi.acceptInvite(username, id);
		} catch(err){
			if(err.status === 401){
				navigate('/errors/unauthorized');
				return;
			} else{
				setRsvpError(true);
				return;
			};
		};
		getInvitations();
		getUpcomingEvents();
	};

	const declineInvite = async (id) => {
		try{
			const res = await G4GApi.declineInvite(username, id);
		} catch(err){
			if(err.status === 401){
				navigate('/errors/unauthorized');
				return;
			} else{
				setRsvpError(true);
				return;
			};
		};
		getInvitations();
		getUpcomingEvents();
	};

	const acceptFollowRequest = async (requestId) => {
		try{
			const resStatus = await ConnectionServices.acceptRequest(requestId, user.username);
			if(resStatus === 204){
				getFollowRequests();
			}
		} catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else {
				setApiErrors(e => ({connectionRequests: err.data.error.message}))
			};
		};
	};

	const deleteFollowRequest = async (requestId) => {
		try{
			const res = await ConnectionServices.deleteRequest(requestId, user.username);
			if(res === 204){
				getFollowRequests();
			}
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else {
				setApiErrors(e => ({connectionRequests: err.data.error.message}))
			}
		};
	};

	// effect
	useEffect(() => {
		// prevents data fetching on intial render when user is not yet set.
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if(!user.token) {
			navigate('/unauthorized')
			return;
		};
		getAllData();
	}, [user]);

	// useEffect(()=>{
	// 	getAllData()
	// }, [])

	if(!isLoaded) return (
		<Loader />
	)

	return(
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              	{/* Upcoming Events */}
              	<Grid item xs={12} md={12} lg={12}>
					<UpcomingEvents 
						isLoaded={isLoaded} 
						upcomingEvents={upcomingEvents} 
					/>
            	</Grid>

				{/* Connection Features */}
				<Grid item xs={12} md={6}>
					<ConnectPaper 
						followRequests={followRequests}
						acceptFollowRequest={acceptFollowRequest}
						deleteFollowRequest={deleteFollowRequest}
						apiErrors={apiErrors}
						setApiErrors={setApiErrors}
					/>
				</Grid>

				{/* Pending Invitations*/}
            	<Grid item xs={12} md={6} >
					<InvitationsPaper
						rsvpError={rsvpError}
						invitations={invitations}
						acceptInvite={acceptInvite}
						declineInvite={declineInvite}
					/>
            	</Grid>
			</Grid>
		</Container>
	);
};

export default UserDashboard;