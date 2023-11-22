import { Container, Paper, Typography, Grid, Accordion, AccordionDetails, AccordionSummary, List, ListItem, Divider, ListItemText, Button, Avatar, ListItemAvatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import EventServices from '../../api/services/event.services';



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
		comments: []
	});
	const accordianExpandInitialState = () => {
		const result = {}
		let i = 1; 
		while(i <= eventInfo.menu.length){
			result[`panel${i}`] = true
		}
		return result
	}

	const [menuAccordianExpanded, setMenuAccordianExpanded] = useState(accordianExpandInitialState);

	let currUserHost = false;
	const { eventId } = useParams();

	useEffect(() => {
		const getEventInfo = async() => {
			const info = await EventServices.getEventInfo(eventId)
			setEventInfo(i => info)
		}
		getEventInfo();
		currUserHost = eventInfo.host === user.username
	}, [])

	const toggleMenuAccordians = (panel) => (event) => {
		const newMenuAccordianExpanded = {...menuAccordianExpanded, [panel] : !menuAccordianExpanded[panel]}
		setMenuAccordianExpanded( cur => newMenuAccordianExpanded);
	};

	const generateDish = (dish) => {
		return (
			<ListItem alignItems='flex-start'>
				<ListItemText
					primary={dish.name}
					secondary={
						<>
							<Typography
								sx={ {display: 'inline'}}
								componenet='span'
								variant='body2'
							>
								{dish.description}
							</Typography>
							<Typography variant='caption' display='block'>
								<Link
									sx={{ fontSize: 1, }}
								>
									{dish.user}
								</Link>
							</Typography>
						</>
					}
				/>
			</ListItem>
		)
	}

	const generateMenu = () => {
		return (
			<>
				{eventInfo.menu.map((c, i)=>{
					let panel = `panel${i}`
					return (
						<Accordion expanded={menuAccordianExpanded[panel]} onChange={toggleMenuAccordians(panel)}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`${panel}bh-content`}
								id={`${panel}bh-header`}
							>
								<Typography sx={{fontWeight:'bold', width: '33%', textAlign:'start'}}>
									{c.courseName}
								</Typography>

							</AccordionSummary>
							<AccordionDetails>
								<List>
									{c.items.map(d => generateDish(d))}
								</List>
							</AccordionDetails>
						</Accordion>
					)
					
				})}
			</>
		)
	};

	const generateGuests = () => {
		return (
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{eventInfo.guests.map( g => {
					return (
						<ListItem>
							<ListItemAvatar>
								<Avatar/>
							</ListItemAvatar>
							<ListItemText primary={g.username} secondary={g.rsvp} />
						</ListItem>
					)
				})}
			</List>
		)
	};

	const generateComments = () => {
		return (
			<List sx={{ width:'100%'}}>
				{eventInfo.comments.map((c,i) => {
					return (
						<>
							<ListItem alignItems='flex-start'>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText
									primary={c.username}
									secondary={
										<>
											<Typography >
												{c.content}
											</Typography>
										</>}
								>
								</ListItemText>
							</ListItem>
							{i !== eventInfo.comments.length - 1 ? <Divider component='li'/> : null}
						</>
						
					)
				})}
			</List>
		)
	}

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
						{currUserHost ? <Button >Edit</Button> : null}
					</Paper>
				</Grid>
				<Grid item xs={12} md={8}>
						<Typography variant='h4' components='h4'>
							Menu
						</Typography>
						{currUserHost ? <Button >Edit</Button> : null}
						{generateMenu()}
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography variant='h4' components='h4'>
						Guests
					</Typography>
					{currUserHost ? <Button >Invite</Button> : null}
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{generateGuests()}
					</Paper>
				</Grid>
			</Grid>
			<Grid item xs={12} sx={{p:2}}>
				<Typography variant='h4' components='h4'>
					Comments
				</Typography>
				{currUserHost ? <Button >Moderate</Button> : null}
				<Paper >
					{generateComments()}
				</Paper>
			</Grid>
		</Container>
	)
};

export default PartyDetails