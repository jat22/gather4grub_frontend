import React from "react";
import { Paper, Grid, Avatar, Typography, } from "@mui/material";

const UserProfileCard = ({ user }) => {
	return (
		<>
			<Paper sx={{
				padding:2
			}}>
				<Grid container>
					<Grid item xs={12}>
						<Avatar src={user.avatarUrl} />
					</Grid>
					<Grid item xs={12}> 
						<Typography variant='h6'>
							{user.username}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle2'>
							{user.firstName} {user.lastName}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle2'>
							{user.email}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='caption'>
							{user.tagLine}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};


export default UserProfileCard;