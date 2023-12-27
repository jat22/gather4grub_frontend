import React from "react";
import { Paper, Typography, Grid, Badge } from "@mui/material";

import ViewConnectionsDialog from "./ViewConnectionsDialog";
import FindConnectionsDialog from "./FindConnectionsDialog";
import ConnectionRequestDialog from "./ConnectionRequestDialog";

const ConnectPaper = ({ followRequests, acceptFollowRequest, deleteFollowRequest, apiErrors, setApiErrors }) => {
	return (
		<Paper 
			elevation={3}							
			sx={{ 
				p: 2, 
				display: 'flex', 
				flexDirection: 'column',
				height: 259 
				}
		}>
			<Typography variant="h5">
				Connect
			</Typography>
			<Grid container spacing={2} sx={{padding:3}}>
				<Grid item xs={12}>
					<ViewConnectionsDialog />
				</Grid>
				<Grid item xs={6}>
					<FindConnectionsDialog />
				</Grid>
				<Grid item xs={6}>
					<Badge 
						badgeContent={followRequests?.length} 
						color='success'
						component='div'
						sx={{width:'100%'}}
					>
						<ConnectionRequestDialog 
							followRequests={followRequests}
							acceptFollowRequest={acceptFollowRequest}
							deleteFollowRequest={deleteFollowRequest}
							apiErrors={apiErrors}
							setApiErrors={setApiErrors}
						/>
					</Badge>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ConnectPaper