import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import InvitationServices from '../../api/services/invitation.services';
import EventServices from '../../api/services/event.services';
import G4GApi from '../../api/G4GApi';

import InvitePendingShort from '../../components/userDashboard/InvitePendingShort';
import EventsList from '../../components/userDashboard/EventsList';
import AllEventsModal from '../../components/userDashboard/AllEventsModal'
import FindConnectionsDialog from '../../components/userDashboard/FindConnectionsDialog';
import ViewConnectionsDialog from '../../components/userDashboard/ViewConnectionsDialog';
import ConnectionRequestDialog from '../../components/userDashboard/ConnectionRequestDialog';

const UserDashboard = () => {
	// state
	const [invitations, setInvitations] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [hostingEvents, setHostingEvents] = useState([]);
	const [rsvpError, setRsvpError] = useState(false);

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
			setInvitations(i => invites);
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
			const events = await EventServices.getUpcoming(username);
			setUpcomingEvents(e => events);
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

	const getHostingEvents = async() => {
		// get events hosted by logged in user and set state
		try{
			const events = await EventServices.getHosting(username);
			setHostingEvents(e => events);
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

	const getAllData =	() => {
		//  get upcomingEvents, invitations, and hosting for logged in user
		if(user.username !== username){
			navigate('/error/unauthorized');
			return;
		}
		getUpcomingEvents();
		getInvitations();
		getHostingEvents();
	};

	const acceptInvite = async (id) => {
		try{
			await G4GApi.acceptInvite(username, id);
		} catch(err){
			if(err.status === 401){
				navigate('/errors/unauthorized');
				return;
			} else{
				setRsvpError(true);
				return;
			}

		}

		getInvitations();
		getUpcomingEvents();
	};

	const declineInvite = async (id) => {
		try{
			await G4GApi.declineInvite(username, id);
		} catch(err){
			setRsvpError(true);
			return;
		};

		getInvitations();
		getUpcomingEvents();
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

	return(
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

				{/* Pending Invitations*/}
            	<Grid item xs={12} md={4} lg={4}>
					<Paper
						sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						height: 300
						}}
					>	
						<Typography variant="h5" component='h2'>
							Pending Invites
						</Typography>
						{rsvpError ? 
							<Typography>Error: RSVP was not processed</Typography>
							: null
						}
						<InvitePendingShort 
							invites={invitations} 
							acceptInvite={acceptInvite} 
							declineInvite={declineInvite} 
						/>
					</Paper>
            	</Grid>

              	{/* Upcoming Events */}
              	<Grid item xs={12} md={8} lg={8}>
						<Paper 
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 300,
							}}
						>
							<EventsList 
								events={upcomingEvents}
								short={true}
								type="upcoming"
							/>
							{upcomingEvents && upcomingEvents.length > 3 ?
								<AllEventsModal events={upcomingEvents} type='upcoming' />
								: null
							}
						</Paper>
            	</Grid>

              	{/* Hosting*/}
				<Grid item xs={12} md={8} lg={8}>
					<Paper 
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 300,
						}}
					>
						<EventsList events={hostingEvents} type='host' short={true} />
						{hostingEvents && hostingEvents.length > 3 ?
							<AllEventsModal events={hostingEvents} type='host' />
							: null
						}
					</Paper>
				</Grid>

				<Grid item xs={12} md={4} lg={4}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
								<Typography variant="h5">
									Connections
								</Typography>
								<Box sx={{margin: 2}} >
									<ViewConnectionsDialog />
								</Box>
								<Box>
									<FindConnectionsDialog />
								</Box>
								<Box sx={{margin: 2}} >
									<ConnectionRequestDialog />
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default UserDashboard;