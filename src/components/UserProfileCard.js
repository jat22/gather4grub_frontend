import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Paper, Grid, Avatar, Typography, } from "@mui/material";
import UserServices from "../api/services/user.services";

const UserProfileCard = ({ username }) => {
	const [userProfile, setUserProfile] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		tagLine: '',
		avatarUrl: ''
	})

	useEffect(() => {
		const getUserProfile = async() => {
			const userProfileNew = await UserServices.getUserProfile(username);
			setUserProfile(p => userProfileNew);
			console.log(userProfileNew)
		};
		getUserProfile();
	}, [])

	if(!userProfile) return null

	return (
		<>
			<Paper sx={{
				padding:5
			}}>
				<Grid container>
					<Grid item xs={3} lg={3}>
						<Avatar />
					</Grid>
					<Grid item xs={9} lg={9}> 
						<Typography>
							{userProfile.username}
						</Typography>
					</Grid>
					<Grid item lg={3} /> 
					<Grid item lg={9}>
						<Typography>
							{userProfile.firstName} {userProfile.lastName}
						</Typography>
					</Grid>
					<Grid item lg={3} /> 
					<Grid item lg={9}>
						<Typography>
							{userProfile.email}
						</Typography>
					</Grid>
					<Grid item lg={3} /> 
					<Grid item lg={9}>
						<Typography>
							{userProfile.tagLine}
						</Typography>
					</Grid>

				</Grid>
			</Paper>
		</>
	)


}


export default UserProfileCard

{/* <Box 
					sx={{
						width:300,
						padding:3
					}}>
					<Typography component='h2' variant='h6'>
						{user.username}
					</Typography>
					<Typography component='h2' variant='h6'>
						{`${user.firstName} ${user.lastName}`}
					</Typography>
					<Typography component='h2' variant='h6'>
						{user.email}
					</Typography>
				</Box> */}