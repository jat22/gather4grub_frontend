import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoCard = ({ info })=>{
	return(
		<>
			<Card sx={{ width: 300}}>
				<CardContent>
					<Typography>
						{info.title}
					</Typography>
					<Typography>
						{info.description}
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}

export default InfoCard