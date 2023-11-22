import { Paper, Table, TableBody, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink} from 'react-router-dom';
import UpcomingTableRow	from '../userDashboard/UpcomingTableRow';
import UserContext from "../../context/UserContext";

const UpcomingEventsShort = ({ events }) => {
	const user = useContext(UserContext)

	const createUpcomingTable = ()=> {
		if(events && events.length > 0){
			return (
				<>
					<Table >
						<TableBody >
							{events.slice(0,3).map(e => (
								<UpcomingTableRow event={e} />
							))}
						</TableBody>
					</Table>
					<Button 
						component={RouterLink} 
						to={`/users/${user.username}/gatherings/upcoming`}
					>
						See All
					</Button>
				</>
				

			)
		};
		return(
			<p>No upcoming events</p>
		)
	};

	return (
		<Paper 
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				height: 300,
			}}
		>
			<Typography
				variant="h4"
				component='h2' 
			>
				Upcoming Events
			</Typography>
			{createUpcomingTable()}
		</Paper>
	)
	
}

export default UpcomingEventsShort;