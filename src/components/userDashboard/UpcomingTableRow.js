import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { TableCell, Avatar, TableRow } from "@mui/material";

const UpcomingTableRow = ({ event })=>{

	return(
		<TableRow key={event.id}>
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
		</TableRow>
	)
};

export default UpcomingTableRow;