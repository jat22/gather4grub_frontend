import React from "react";
import { Paper, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, ButtonGroup, Button } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import EditDetailsDialog from "./EditDetailsDialog";


const EventDetails = ({ eventInfo, basicDetails, updateBasicDetails, apiErrors, setApiErrors, handleRsvpUpdate }) => {
	return (
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
						{eventInfo.displayTime ?
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
							:null
						}
						{eventInfo.location ?
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
							:null 
						}
					</List>
				</Grid>
				<Grid item xs={12} md={8}>
					{eventInfo.description ?
						<>
							<Typography variant='overline'>What to Know</Typography>
							<Typography variant='body2'>{eventInfo.description}</Typography>
						</>
						:null
					}
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
					{apiErrors.rsvp ?
						<Typography >
							Something went wrong, RSVP not updated.
						</Typography>
						: null
					}
				</Grid>
			</Grid>
		</Paper>
	);
};

export default EventDetails;