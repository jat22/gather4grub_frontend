import React from 'react';
import { Grid } from '@mui/material';
import InfoCard from '../../components/landing/InfoCard'

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
	)
}

export default InfoHighlight