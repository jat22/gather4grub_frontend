import React, { useEffect, useState } from "react";
import { Paper, Grid, Avatar, Typography, } from "@mui/material";
import UserServices from "../api/services/user.services";
import { useNavigate } from "react-router-dom";

const profileInitialState = {
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	tagLine: '',
	avatarUrl: ''
}

const UserProfileCard = ({ username }) => {
	// state
	const [userProfile, setUserProfile] = useState(profileInitialState);
	const [error, setError] = useState(false);

	// hooks
	const navigate = useNavigate();

	// fetch function
	const getUserProfile = async() => {
		try{
			const userProfileNew = await UserServices.getUserProfile(username);
			setUserProfile(p => userProfileNew);
		}catch(err){
			if(err.status === 401){
				navigate('/error/unauthorized');
			}else{
				setError(e=>true);
			};
		};
	};

	useEffect(() => {
		getUserProfile();
	}, [])

	if(!userProfile) return null;

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
							{username}
						</Typography>
					</Grid>
					<Grid item lg={3} /> 
					{error?
						<Grid item lg={9}>
							<Typography>Unable to load information at this time.</Typography>
						</Grid>
						:
						<>
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
						</>
					}
				</Grid>
			</Paper>
		</>
	);
};


export default UserProfileCard;