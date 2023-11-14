import React, { useState, useContext } from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import useFields from '../../hooks/useFields';
import EventServices from '../../api/services/event.services';
import UserContext from '../../context/UserContext';

const PartyCreate = () => {
	const [formData, handleChange, resetFormData] = useFields(
		{
			title: '',
			date: '',
			startTime: '',
			endTime: '',
			location: '',
			description: ''
		}
	)
	
	const user = useContext(UserContext)

	const handleSubmit = async (evt)=> {
		evt.preventDefault();
		EventServices.createEvent(formData, user.username)
	}
	
	return(
		<Container component='main'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography component='h1' variant='h3'>
					Create New Event
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt:3 }}>
					<Grid container spacing={2}>
						<Grid item xs={8} md={8}>
							<TextField
								fullWidth
								required
								name='title'
								id='title'
								label='Title'
								value={formData.title}
								onChange={handleChange}
							>
							</TextField>
						</Grid>
						
						<Grid item xs={4} md={4}>
							<TextField
								fullWidth
								required
								name='date'
								id='date'
								label='Date(mm-dd-yyyy)'
								value={formData.date}
								onChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								name='startTime'
								id='startTime'
								label='Start Time'
								value={formData.startTime}
								onChange={handleChange}
							>
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								name='endTime'
								id='endTime'
								label='End Time'
								value={formData.endTime}
								onChange={handleChange}
							>
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name='location'
								id='location'
								label='Location'
								value={formData.location}
								onChange={handleChange}
							>
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name='description'
								id='description'
								label='Description'
								value={formData.description}
								onChange={handleChange}
							>
							</TextField>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create
            		</Button>
				</Box>
			</Box>
		</Container>
	)
};

export default PartyCreate