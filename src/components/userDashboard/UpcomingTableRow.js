import React from "react";
import { useNavigate} from "react-router-dom";
import { TableCell, Avatar, TableRow } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';


const UpcomingTableRow = ({ event, type })=>{
	// hooks
	const navigate = useNavigate();
	
	// event handlers
	const handleRowClick = (eventId) => {
		navigate(`/gatherings/${eventId}`);
	};

	// variables
	const rsvpMap = {
		accept : 'Attending',
		decline : 'Declined',
		pending : 'Undecided'
	};

	return(
		<TableRow 
			key={event.id} 
			onClick={() => handleRowClick(event.id)}
			sx={{
				cursor:'pointer'
			}}
		>
				<TableCell>
					<EventIcon />
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
	);
};

export default UpcomingTableRow;