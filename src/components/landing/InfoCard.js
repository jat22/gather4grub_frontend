import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoCard = ({ info })=>{
	return(
		<>
			<Card sx={{ width: 300, height: 150,}}>
				<CardContent>
					<Typography component='h5' variant='h5'>
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