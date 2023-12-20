import React from "react";
import { Paper, Grid, Avatar, Typography, } from "@mui/material";

const UserProfileCard = ({ user }) => {
	return (
		<>
			<Paper sx={{
				padding:5
			}}>
				<Grid container>
					<Grid item xs={3} lg={3}>
						<Avatar src={user.avatarUrl} />
					</Grid>
					<Grid item xs={9} lg={9}> 
						<Typography>
							{user.username}
						</Typography>
					</Grid>
					<Grid item lg={3} /> 
						<Grid item lg={9}>
							<Typography>
								{user.firstName} {user.lastName}
							</Typography>
						</Grid>
						<Grid item lg={3} /> 
						<Grid item lg={9}>
							<Typography>
								{user.email}
							</Typography>
						</Grid>
						<Grid item lg={3} /> 
						<Grid item lg={9}>
							<Typography>
								{user.tagLine}
							</Typography>
						</Grid>
				</Grid>
			</Paper>
		</>
	);
};


export default UserProfileCard;