import React, { useContext, useEffect, useState, useRef } from 'react';
import { Badge, Container, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import InvitationServices from '../../api/services/invitation.services';
import EventServices from '../../api/services/event.services';
import ConnectionServices from '../../api/services/connections.services';
import G4GApi from '../../api/G4GApi';

import InvitePendingShort from '../../components/userDashboard/InvitePendingShort';
import EventsList from '../../components/userDashboard/EventsList';
import AllEventsModal from '../../components/userDashboard/AllEventsModal'
import FindConnectionsDialog from '../../components/userDashboard/FindConnectionsDialog';
import ViewConnectionsDialog from '../../components/userDashboard/ViewConnectionsDialog';
import ConnectionRequestDialog from '../../components/userDashboard/ConnectionRequestDialog';
import Loader from '../../components/Loader';
import { set } from 'date-fns';

const isLoadedInitialState = {
	events: false,
	invitations: false,
	requets: false
}

const UserDashboard = () => {
	// state
	const [invitations, setInvitations] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [rsvpError, setRsvpError] = useState(false);
	const [followRequests, setFollowRequests] = useState([]);
	const [apiErrors, setApiErrors] = useState({})
	const [isLoaded, setIsLoaded] = useState({})

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
			setIsLoaded(l => ({invitiations:true}))
		} catch(err){
			if(err.status === 500){
				navigate('/error/network');
				console.log(err)
			} else if(err.status === 401){
				navigate('/error/unauthorized');
				console.log(err)
			} else{
				navigate('/error/general');
				console.log(err)
			};
		};
	}

	const getUpcomingEvents = async() => {
		// get upcoming events for logged in user and set state
		try{
			const allEvents = await EventServices.getUpcoming(username);
			setUpcomingEvents(e => allEvents?.upcoming);
			setIsLoaded(l => ({...l, events:true}))
		}catch(err){
			if(err.status === 500){
				navigate('/error/network');
				console.log(err)
			} else if(err.status === 401){
				navigate('/error/unauthorized');
				console.log(err)
			} else{
				navigate('/error/general');
				console.log(err)
			};
		};
	};

	const getFollowRequests = async() => {
		try{
			const requests = await ConnectionServices.getRequests(user.username);
			setFollowRequests(r=>requests);
		}catch(err){
			// if(err.status === 401){
			// 	navigate('/error/unauthorized');
			// } else{
			// 	setError('Something went wrong, unable to get requests.');
			// };
		};
	}

	const getAllData =	() => {
		//  get upcomingEvents, invitations, and hosting for logged in user
		if(user.username !== username){
			navigate('/error/unauthorized');
			return;
		}
		getUpcomingEvents();
		getInvitations();
		getFollowRequests();
	};

	const acceptInvite = async (id) => {
		try{
			await G4GApi.acceptInvite(username, id);
		} catch(err){
			if(err.status === 401){
				navigate('/errors/unauthorized');
				console.log(err)
				return;
			} else{
				setRsvpError(true);
				console.log(err)
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
			console.log(err)
			return;
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
			console.log(err)
			if(err.status === 401){
				navigate('/error/unauthorized');
			} else {
				console.log(err.data.error.message)
				setApiErrors(e => ({connectionRequests: err.data.error.message}))
			}
		};
	};

	const deleteFollowRequest = async (requestId) => {
		try{
			const res = await ConnectionServices.deleteRequest(requestId, user.username);
			if(res === 204){
				getFollowRequests();
			}

		}catch(err){
			// if(err.status === 401){
			// 	navigate('/error/unauthorized');
			// } else{
			// 	setError('Error: unable to process at this time.');
			// };
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

	return(
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              	{/* Upcoming Events */}
              	<Grid item xs={12} md={12} lg={12}>
						<Paper 
							elevation={3}
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',

							}}
						>
							{isLoaded ? 
								<>
									<EventsList 
										events={upcomingEvents}
										short={true}
										type="upcoming"
									/>
									{upcomingEvents && upcomingEvents.length > 3 ?
										<AllEventsModal events={upcomingEvents} type='upcoming' />
										: null
									}
								</>
								:
								<Loader />	
							}
							
						</Paper>
            	</Grid>
				<Grid item xs={12} md={6} >
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper 
								elevation={3}							
								sx={{ 
									p: 2, 
									display: 'flex', 
									flexDirection: 'column',
									height: 300 
									}
							}>
								<Typography variant="h5">
									Connect
								</Typography>
								<Grid container spacing={2} sx={{padding:3}}>
									<Grid item xs={12}>
										<ViewConnectionsDialog />
									</Grid>
									<Grid item xs={6}>
										<FindConnectionsDialog />
									</Grid>
									<Grid item xs={6}>
										<Badge 
											badgeContent={followRequests?.length} 
											color='success'
											component='div'
											sx={{width:'100%'}}
										>
											<ConnectionRequestDialog 
												followRequests={followRequests}
												acceptFollowRequest={acceptFollowRequest}
												deleteFollowRequest={deleteFollowRequest}
												apiErrors={apiErrors}
											/>
										</Badge>
										
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
				{/* Pending Invitations*/}
            	<Grid item xs={12} md={6} >
					<Paper
						elevation={3}
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 300,
						}}
					>	
						<Typography variant="h5" component='h2'>
							Invitations
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
			</Grid>
		</Container>
	);
};

export default UserDashboard;