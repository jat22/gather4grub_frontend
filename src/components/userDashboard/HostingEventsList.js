import React, { useContext } from "react";
import UpcomingTableRow from "./UpcomingTableRow";
import { Table, TableBody, Link, Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import UserContext from "../../context/UserContext";

const HostingEventsList = ({ events }) => {
	const { user } = useContext(UserContext)

	const createUpcomingTable = ()=> {
		if(events && events.length > 0){
			return (
				<>
					<Table >
						<TableBody >
							{events.slice(0,3).map((e) => (
								<UpcomingTableRow key={e.id} event={e} hostList={true} />
							))}
						</TableBody>
					</Table>
					<Button 
						component={RouterLink} 
						to={`/users/${user.username}/gatherings/hosting`}
					>
						See All
					</Button>
				</>
			)
		};
		return(
			<>
				<Button component={RouterLink} to='/gatherings/create'>Create New Event</Button>
			</>
			
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
				Hosting
			</Typography>
			{createUpcomingTable()}
		</Paper>
	)
	
}

export default HostingEventsList;