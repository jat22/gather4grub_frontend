import React from "react";
import { Card, CardContent, Typography } from "@mui/material";


const PartyCard = ({info}) => {

	return(
		<>
			<Card sx={{ maxWidth: 300}}>
				<CardContent>
					<Typography>
						{info.date}
					</Typography>
					<Typography>
						{info.name}
					</Typography>
					<Typography>
						{info.description}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default PartyCard

