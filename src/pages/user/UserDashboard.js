import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Container, Grid, Paper, List, Avatar, Typography, Link, Table, TableBody, TableRow, TableCell, TableHead, CircularProgress } from '@mui/material'
import {  Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import InvitationServices from '../../api/services/invitation.services';
import EventServices from '../../api/services/event.services';
import InvitePendingShort from '../../components/userDashboard/InvitePendingShort';
import EventsList from '../../components/userDashboard/EventsList';
import G4GApi from '../../api/G4GApi';
import AllEventsModal from '../../components/userDashboard/AllEventsModal'
import FindConnectionsDialog from '../../components/userDashboard/FindConnectionsDialog';
import ViewConnectionsDialog from '../../components/userDashboard/ViewConnectionsDialog';
import ConnectionRequestDialog from '../../components/userDashboard/ConnectionRequestDialog';

const UserDashboard = () => {
	const isFirstRender = useRef(true)

	const { user } = useContext(UserContext);
	const { username } = useParams();

	const [ invitations, setInvitations ] = useState([])
	const [ upcomingEvents, setUpcomingEvents ] = useState([])

	const [ hostingEvents, setHostingEvents ] = useState([])

	const navigate = useNavigate();

	const getInvitations = async()=> {
		try{
			const invites = await InvitationServices.getInvites(username)
			setInvitations(i => invites)
		} catch(err){
			navigate('/unauthorized')
		}
	}

	const getUpcomingEvents = async() => {
		const events = await EventServices.getUpcoming(username)
		setUpcomingEvents(e => events)
	}

	const getHostingEvents = async() => {
		const events = await EventServices.getHosting(username)
		setHostingEvents(e => events)
	}

	const getAllData =	() => {
		getUpcomingEvents();
		getInvitations();
		getHostingEvents()
	}

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if(!user.token) navigate('/unauthorized')
		getAllData()
	}, [user])

	const acceptInvite = async (id) => {
		await G4GApi.acceptInvite(username, id);
		getInvitations();
		getUpcomingEvents();
	}

	const declineInvite = (id) => {
		G4GApi.declineInvite(username, id);
		getInvitations();
		getUpcomingEvents();
	}

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
	)
};

export default UserDashboard;