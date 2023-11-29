import { Paper, Table, TableBody, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import UpcomingTableRow	from './UpcomingTableRow';
import UserContext from "../../context/UserContext";

const EventsList = ({ events, short, type }) => {
	const user = useContext(UserContext)
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
			<p>No upcoming events</p>
		)
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
			
	)
	
}

export default EventsList;