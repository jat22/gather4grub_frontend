import React from "react"; 
import { Table, TableBody, Typography } from "@mui/material";

import UpcomingTableRow	from './UpcomingTableRow';


const EventsList = ({ events, short, type }) => {
	const createUpcomingTable = ()=> {
		if(events && events.length > 0){
			return (
				<>
					<Table >
						<TableBody >
							{!short ? events.map(e => (
								<UpcomingTableRow key={e.id} event={e} type={type}/>
							)) :
								events.slice(0,3).map(e => (
									<UpcomingTableRow key={e.id} event={e} type={type} />
								))
							}
						</TableBody>
					</Table>
				</>
			)
		};
		return(
			<Typography>No upcoming events</Typography>
		);
	};

	return (
		<>
			<Typography
				variant="h4"
				component='h2' 
			>
				{type === "host" ? "Hosting" : "Upcoming Events"}
			</Typography>
			{createUpcomingTable()}
		</>
			
	);
	
};

export default EventsList;