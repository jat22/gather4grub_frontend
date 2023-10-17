import React from 'react';
import { Container, Grid } from '@mui/material';
import InfoCard from '../components/InfoCard'

const InfoHighlight = ({ infoPoints }) => {

	return (
		<>
			<Grid sx={{ flexGrow: 1 }} container spacing={3}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" spacing={4}>
						{infoPoints.map(p => {
							return(
								<Grid key={p.title} item>
									<InfoCard info={p} />
								</Grid>
							)}
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
		
		// <Grid container spacing={2}>
		// 	{infoPoints.map( p => {
		// 		<Grid item>
		// 			<InfoCard info={p} />
		// 		</Grid>
		// 	})}
		// </Grid>
	)
}

export default InfoHighlight