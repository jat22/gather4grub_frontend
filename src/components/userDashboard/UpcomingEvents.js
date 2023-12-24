import React from "react";
import { Paper } from "@mui/material";

import Loader from "../Loader";
import EventsList from "./EventsList";
import AllEventsModal from "./AllEventsModal";


const UpcomingEvents = ({ isLoaded, upcomingEvents }) => {
	return (
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
	)
}

export default UpcomingEvents