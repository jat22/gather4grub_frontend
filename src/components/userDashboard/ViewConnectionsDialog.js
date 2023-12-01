import { Dialog, Button, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext"
import { Link as RouterLink } from 'react-router-dom'
import ConnectionServices from "../../api/services/connections.services"


const ViewConnectionsDialog = () => {
	const [open, setOpen] = useState(false)
	const [connections, setConnections] = useState([])

	const { user } = useContext(UserContext)
	console.log(user)
	const handleOpen = () => {
		setOpen(true)
	};

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		const getConnections = async(username) =>{
			const connections = await ConnectionServices.getConnections(username)
			setConnections(c => connections)
		}
		getConnections(user.username)
	}, [open])

	return (
		<>
			<Button onClick={handleOpen} size='large' variant='contained'>
				My Connections
			</Button>
			<Dialog open={open}>
				<DialogTitle>
					Connections
				</DialogTitle>
				<DialogContent>
					{
						!connections || connections.length < 1 
							?
							<Typography >No Connections</Typography>
							:
							<List>
								{connections.map( c => {
									return(
										<ListItem key={c.id} component={RouterLink} to={`/users/${c.username}`}>
											<ListItemAvatar>
												<Avatar />
											</ListItemAvatar>
											<ListItemText 
												primary={c.username}
												secondary={`${c.firstName} ${c.lastName}`} />
										</ListItem>
									)
									})
								}
							</List>
					}
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ViewConnectionsDialog