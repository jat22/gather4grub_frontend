import React from "react";

import { List, Link, Typography } from "@mui/material";

import InviteListItem from "./InviteItem";


const InvitePendingShort = ({ invites, acceptInvite, declineInvite }) => {

	const InviteList = () => {
		if(invites && invites.length > 0){
			return (
				<>
					<List dense={true}>
					{invites.slice(0,3).map((i) => (
						<InviteListItem 
							key={i.id}
							id={i.id}
							item={i} 
							acceptInvite={acceptInvite} 
							declineInvite={declineInvite} 
						/>
						))
					}
					</List>
					<Link color="primary" sx={{ }}>
						All Invites
					</Link>
				</>
			);
		} else { 
			return <Typography sx={{padding:3}}>No Invitations to Review</Typography>
		};
	};

	return (
		<>
			<InviteList />
		</>
	);
};

export default InvitePendingShort;