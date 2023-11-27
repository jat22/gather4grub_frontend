import React, { useState, useContext } from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import useFields from '../../hooks/useFields';
import EventServices from '../../api/services/event.services';
import UserContext from '../../context/UserContext';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const PartyCreate = () => {
	const navigate = useNavigate();
	const [formData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields(
		{
			title: '',
			date: '',
			startTime: '',
			endTime: '',
			location: '',
			description: '',
		}
	)
	
	const user = useContext(UserContext)

	const handleSubmit = async (evt)=> {
		evt.preventDefault();
		const res = await EventServices.createEvent(formData, user.username)
		
		navigate(`/gatherings/${res.data.event.id}`)
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
						<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Grid item xs={4} md={4}>
							<DatePicker
								fullWidth
								slotProps={{
									textField : {required:true,}
								}}
								disablePast
								label='Date'
								value={formData.date !== '' ? formData.date : null}
								onChange={(val) => handlePickerData(val, 'date')}
							/>
						</Grid>
						<Grid item xs={4}>
							<TimePicker
								fullWidth
								label='Start Time'
								value={formData.startTime !== '' ? formData.startTime : null}
								onChange={(val) => handlePickerData(val, "startTime")}
							/>
						</Grid>
						<Grid item xs={4}>
							<TimePicker
								label='End Time'
								value={formData.endTime !== '' ? formData.endTime : null}
								onChange={(val) => handlePickerData(val, 'endTime')}
							/>
						</Grid>
						</LocalizationProvider>
						<Grid item xs={12} md={12}>
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