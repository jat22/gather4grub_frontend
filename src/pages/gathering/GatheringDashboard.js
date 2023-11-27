import { Container, Paper, Typography, Grid, Accordion, AccordionDetails, AccordionSummary, List, ListItem, Divider, ListItemText, Button, Avatar, ListItemAvatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import EventServices from '../../api/services/event.services';
import GuestList from '../../components/eventDashboard/GuestList';
import EventMenu from '../../components/eventDashboard/EventMenu';
import EventComments from '../../components/eventDashboard/EventComments';
import EditDetailsDialog from '../../components/eventDashboard/EditDetailsDialog';
import InviteDialog from '../../components/eventDashboard/InviteDialog';
/**	
 * To Do
 * - Check if host and add conditional for host view
 * - edit/invite functionality - same view just adjust componenents
 */


const PartyDetails = () => {
	const { user } = useContext(UserContext);

	const [eventInfo, setEventInfo] = useState({
		id: '',
		title: '',
		host: '',
		date: '',
		location: '',
		description: '',
		menu: [],
		guests: [],
		comments: [],
		currUserHost : false
	});

	const { eventId } = useParams();

	const basicDetails = eventInfo ? {
		id : eventInfo.id,
		title : eventInfo.title,
		date : eventInfo.date,
		startTime : eventInfo.startTime,
		endTime : eventInfo.endTime,
		location : eventInfo.location ? eventInfo.location : '',
		description : eventInfo.description ? eventInfo.description : ''
	} : null

	useEffect(() => {
		const getEventInfo = async() => {
			const info = await EventServices.getEventInfo(eventId)
			if(info !== undefined){
				info.currUserHost = user.username === info.host
			}
			setEventInfo(i => info)
		}
		getEventInfo();
	}, [])

	const updateDisplayDetails = (basicDetails) => {
		setEventInfo(i => ({...i, ...basicDetails}))
	}

	const updateDisplayGuestList = (guestList) => {
		setEventInfo(i => ({...i, guests:guestList}))
	}
	
	const updateBasicDetails = async (data) => {
		const res = await EventServices.updateBasicDetails(eventId, data)
		updateDisplayDetails(res)
	};

	const inviteGuests = async (usernames) => {
		const res = await EventServices.inviteGuests(usernames, eventId);
		updateDisplayGuestList(res)
	} 

	const uninviteGuest = async(username) => {
		const res = await EventServices.uninviteGuest(username, eventId)
		updateDisplayGuestList(res)
	}

	if(!eventInfo) return null

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
									: null}

								<Typography variant='h5' components='h3'>
									Hosted By: {eventInfo.host}
								</Typography>
								<Typography variant='h5' components='h3'>
									{eventInfo.date}
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
					{eventInfo.currUserHost ? <InviteDialog inviteGuests={inviteGuests} currentGuestList={eventInfo.guests} /> : null}
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<GuestList guests={eventInfo.guests} isHost={eventInfo.currUserHost} uninviteGuest={uninviteGuest} />
					</Paper>
				</Grid>
				<Grid item xs={12} md={9}>
					<Grid item lg={12} sx={{marginBottom:2}}>
						<Typography variant='h4' components='h4' sx={{margin:1,}}>
							Menu
						</Typography>
						<Button variant="outlined" size='small'>Add Item</Button>
						{eventInfo.currUserHost ? 	<Button  
														variant="outlined" 
														size="small"
													>
														Edit
													</Button> 
													: null
						}
						<EventMenu menu={eventInfo.menu} />
					</Grid>
					<Grid item lg={12} sx={{margin:'0 0 0 0'}}>
						<Typography variant='h4' components='h4'sx={{margin:1,}}>
							Comments
						</Typography>
						<Button variant="outlined" size='small'>Add Comment</Button>
						{eventInfo.currUserHost ? 	<Button  
														variant="outlined" 
														size="small"
													>
														Moderate
													</Button> 
													: null
						}
						<Paper >
							<EventComments comments={eventInfo.comments} />
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
};

export default PartyDetails