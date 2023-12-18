import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import useFields from '../../hooks/useFields';
import dayjs from 'dayjs';
import useFormValidate from '../../hooks/useFormValidate';

const validationRules = {
	date : {required:true},
	title : {required:true}
};

const EditDetailsDialog = ({ basicDetails, updateBasicDetails, apiErrors, setApiErrors }) => {

	// state
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// hooks
	const editDetailsInitialState = {
		id: basicDetails.id,
		title: basicDetails.title,
		date: dayjs(basicDetails.date),
		startTime: basicDetails.startTime ? dayjs(basicDetails.startTime, "HH:MM:SS") : null,
		endTime: basicDetails.endTime ? dayjs(basicDetails.endTime, "HH:MM:SS") : null,
		location: basicDetails.location,
		description: basicDetails.description
	};

	const { formData, handleChange, handlePickerData, resetFormData } = useFields(editDetailsInitialState);
	const { validationErrors, validateForm, resetValidationErrors} = useFormValidate();
	
	// event handlers
	const handleClickOpen = () => {
		setApiErrors(e=>{});
		setSubmitted(false);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetFormData();
		resetValidationErrors();
		setSubmitted(false);
		setApiErrors({})
	};

	const handleSubmit = async () => {
		setSubmitted(true);
		validateForm(formData, validationRules);
	};

	useEffect(()=> {
		if(submitted && validationErrors && Object.keys(validationErrors).length === 0) {
			updateBasicDetails(formData);
		} else{
			setSubmitted(false);
		};
	}, [validationErrors]);

	useEffect(() => {
		if(submitted && apiErrors && Object.keys(apiErrors).length === 0){
			handleClose();
		} else{
			setSubmitted(false);
		}
	}, [apiErrors]);

	return (
		<>
			<Button variant="outlined" size='small' onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Event Details</DialogTitle>
				<DialogContent>
				<Grid container spacing={2} sx={{marginTop:1}}>
					{apiErrors?.basicDetails ?
						<Grid item xs={12} xl={12}>
							<Typography>Something went wrong, details not updated.</Typography>
						</Grid>
						: null
					}
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Grid item xs={4} md={4}>
							<DatePicker
								fullWidth
								slotProps={{
									textField : {
										required:true,
										error: !!validationErrors?.date,
										helperText: validationErrors?.date || null
									}
								}}
								disablePast
								label='Date'
								value={formData.date}
								onChange={(val) => handlePickerData(val, 'date')}
							/>
						</Grid>
						<Grid item xs={4}>
							<TimePicker
								fullWidth
								label='Start Time'
								value={formData.startTime}
								onChange={(val) => handlePickerData(val, "startTime")}
							/>
						</Grid>
						<Grid item xs={4}>
							<TimePicker
								label='End Time'
								value={formData.endTime}
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
							error={!!validationErrors?.title}
							helperText={validationErrors?.title || null}
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
					<Button onClick={handleSubmit}>Update</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditDetailsDialog;