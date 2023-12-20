import { Dialog, DialogTitle, Button, DialogContent, Box, Grid, Avatar, DialogActions } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserServices from "../../api/services/user.services";
import UserContext from "../../context/UserContext";

const ChangeAvatarDialog = (currAvatarId)=>{
	const [avatarList, setAvatarList] = useState([]);
	const [open, setOpen] = useState(false)
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [imageLoadCount, setImageLoadCount] = useState(0)
	const [selectedAvatar, setSelectedAvatar] = useState(currAvatarId)

	const { user, setUser } = useContext(UserContext)

	const handleOpen = ()=>{
		setOpen(o => true)
	}

	const handleClose = ()=> {
		setOpen(o=>false)
		setSelectedAvatar(null)
	}
	const handleAvatarClick = (id) =>{
		setSelectedAvatar(id)
	};

	const handleSelect = async () => {
		const newAvatar = await UserServices.updateAvatar(user.username, selectedAvatar)
		setUser(u=>({...u, avatar: newAvatar}));
		handleClose();
	}

	const getAvatarList = async ()=> {
		try{
			const res = await UserServices.getAvatarList();
			setAvatarList(a => res);
		}catch(err){

		};
	}

	useEffect(()=>{
		if(open){
			getAvatarList();
		}
	},[open])

	return(
		<>
			<Button 
				size='small' 
				variant='text'
				onClick={handleOpen}
			>
				Change Avatar
			</Button>
			<Dialog
				open={open}
			>
				<DialogTitle>
					Pick an Avatar
				</DialogTitle>
				<DialogContent>
					<Box 
						display="flex"
						justifyContent="center"
						alignItems="center"
						sx={{margin:1}}	
					>
						<Grid container spacing={1}>
							{avatarList.map(a=>{
								return(
									<Grid 
										item 
										key={a.id}
										xs={12} 
										sm={6} 
										md={4} 
										lg={3}
										sx={
											selectedAvatar === a.id ?
											{
												backgroundColor:'lightblue', 
												padding:1,
												borderRadius: '5px',
												width:120,
												height:120
											} :
											{
												padding:1,
												borderRadius: '5px',
												width:120,
												height:120
											}
										}
									>
										<Avatar
											src={a.url}
											alt={a.name}
											sx={{width:100, height:100, margin:'auto', backgroundColor:'white'}}
											onClick={()=>handleAvatarClick(a.id)}
										/>
									</Grid>
								)
							})}
						</Grid>
					</Box>
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSelect}>Select</Button>
				</DialogActions>
			</Dialog>
		</>
	)
};

export default ChangeAvatarDialog;