import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { TableCell, Avatar, TableRow } from "@mui/material";

const UpcomingTableRow = ({ event, type })=>{
	const rsvpMap = {
		accept : 'Attending',
		decline : 'Declined',
		pending : 'Undecided'
	}
	return(
		<TableRow 
			key={event.id} 
			component={RouterLink} 
			to={`/gatherings/${event.id}`}
		>
				<TableCell>
					<Avatar />
				</TableCell>
				<TableCell>
					{event.date}
				</TableCell>
				<TableCell>	
					{event.startTime}
				</TableCell>
				<TableCell>
					{event.title}
				</TableCell>
				{type === 'host' ? null 
					:
					event.isHost ? 
					<TableCell>
						Host
					</TableCell>
					:
					<TableCell>
						{rsvpMap[event.rsvp]}	
					</TableCell>
				}
				
		</TableRow>
	)
};

export default UpcomingTableRow;