
import React from "react"
import { Paper, Grid, Typography } from "@mui/material"

import InviteDialog from "./InviteDialog"
import GuestList from "./GuestList"

const EventGuests = ({ eventInfo, inviteGuests, apiErrors, setApiErrors, uninviteGuest }) => {
	return (
		<Paper
			elevation={4}
			sx={{
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'start'
			}}
		>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Typography variant='h4' components='h3'>
						Guests
					</Typography>
				</Grid>
				{eventInfo.currUserHost ? 
					<Grid item xs={12}>

						<InviteDialog 
							inviteGuests={inviteGuests} 
							currentGuestList={eventInfo.guests}
							apiErrors={apiErrors} 
							setApiErrors={setApiErrors}
						/> 
						{apiErrors?.uninvite ? 
							<Typography>Something went wrong, guest not removed.</Typography>
							: null
						}
					</Grid>
					: null
				}
				<Grid item xs={12}>
					<GuestList 
						guests={eventInfo.guests} 
						isHost={eventInfo.currUserHost} 
						uninviteGuest={uninviteGuest} 
					/>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default EventGuests;