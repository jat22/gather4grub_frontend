import { Dialog, Button, DialogTitle, DialogContent, DialogActions, FormControl, TextField, Grid } from "@mui/material"
import React, { useState, useContext } from "react"
import useFields from '../../hooks/useFields';
import UserContext from "../../context/UserContext";
import ConnectionServices from "../../api/services/connections.services";
import PotentialConnectionsList from "./PotentialConnectionsList";

const FindConnectionsDialog = () => {
	const [open, setOpen] = useState(false)
	const [potentialConnections, setPotenialConnections] = useState([])
	const {user} = useContext(UserContext)
	
	const [formData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields({input:''})

	const handleOpen = () => {
		setPotenialConnections([])
		setOpen(true)
	};

	const handleClose = () => {
		setOpen(false)
	}

	const getPotentialConnetions = async () => {
		const potential = await ConnectionServices.getPotential(formData.input)
		return potential
	} 

	const handleFindUser = async () => {
		const potentials = await getPotentialConnetions();
		setPotenialConnections(potentials);
	}

	const createConnectionRequest = async (connectionUsername) => {
		handleClose();
		const currUsername = user.username;
		await ConnectionServices.createRequest(currUsername, connectionUsername);
		setPotenialConnections([])
	}

	return (
		<>
			<Button onClick={handleOpen} size='large' variant="contained">
				Find People
			</Button>
			<Dialog open={open}>
				<DialogTitle>
					Enter email or username:
				</DialogTitle>
				<DialogContent>
					<Grid container>
						<Grid item xs={12} lg={12}>
							<TextField
								name='input'
								id='input'
								label='Username or Email'
								placeholder="Username or Email"
								onChange={handleChange}
							/>
							<Button 
								variant='outlined'
								onClick={handleFindUser}	
							>
								Find
							</Button>
						</Grid>
						{potentialConnections && potentialConnections.length > 0 
							? 	<Grid item  xs={12} lg={12}>
									<PotentialConnectionsList 
										createConnectionRequest={createConnectionRequest} 
										potentials={potentialConnections} 
									/>
								</Grid>
							: null
						}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default FindConnectionsDialog