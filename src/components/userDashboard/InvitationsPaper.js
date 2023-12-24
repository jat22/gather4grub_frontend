import React from "react";
import { Paper, Typography } from "@mui/material";

import InvitePendingShort from "./InvitePendingShort";
import AllInvitationsModal from "./AllInvitiationsModal";

const InvitationsPaper = ({ rsvpError, invitations, acceptInvite, declineInvite }) => {
	return (
		<Paper
			elevation={3}
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column'
			}}
		>	
			<Typography variant="h5" component='h2'>
				Invitations
			</Typography>
			{rsvpError ? 
				<Typography>Error: RSVP was not processed</Typography>
				: null
			}
			<InvitePendingShort 
				invites={invitations} 
				acceptInvite={acceptInvite} 
				declineInvite={declineInvite} 
			/>
			{invitations?.length > 3 ?
				<AllInvitationsModal 
					invitations={invitations}
					acceptInvite={acceptInvite}
					declineInvite={declineInvite} 
					rsvpError={rsvpError}
				/>
				: null
			}
		</Paper>
	)
}

export default InvitationsPaper