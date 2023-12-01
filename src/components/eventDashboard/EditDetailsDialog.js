import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useFields from '../../hooks/useFields';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const EditDetailsDialog = ({ basicDetails, updateBasicDetails }) => {
	const [open, setOpen] = useState(false);
	const [formData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields(
		{
			id: basicDetails.id,
			title: basicDetails.title,
			date: dayjs(basicDetails.date),
			startTime: dayjs(basicDetails.startTime, "HH:MM:SS"),
			endTime: dayjs(basicDetails.endTime, "HH:MM:SS"),
			location: basicDetails.location,
			description: basicDetails.description
		}
	)
	
	console.log(formData)

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdate = async () => {
		updateBasicDetails(formData)
		setOpen(false);
	};

	return (
		<>
			<Button variant="outlined" size='small' onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Event Details</DialogTitle>
				<DialogContent>
				<Grid container spacing={2} sx={{marginTop:1}}>
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleUpdate}>Update</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default EditDetailsDialog