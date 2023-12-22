import React, { useEffect, useState } from "react";
import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Box, FormHelperText } from "@mui/material";

import useFields from "../../hooks/useFields";
import useFormValidate from "../../hooks/useFormValidate";


const initialFormData = {
	course: '',
	dishName : '',
	description: ''
}

const validationRules = {
	course: {required:true},
	dishName: {required:true}
}

const AddMenuItemDialog = ({ menu, addMenuItem, apiErrors, setApiErrors }) => {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleClickOpen = () => {
		resetFormData()
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetFormData();
		resetValidationErrors();
		setSubmitted(false);
		setApiErrors(e=>{})
	};


	const { formData, handleChange, resetFormData } = useFields(initialFormData)
	const { validationErrors, validateForm, resetValidationErrors } = useFormValidate();

	const handleAdd = () => {
		setSubmitted(true)
	};

	useEffect(() => {
		if(submitted){
			validateForm(formData, validationRules);
		}
	}, [submitted]);

	useEffect(() => {
		if(submitted && Object.keys(validationErrors).length === 0){
			addMenuItem(formData)
		}else{
			setSubmitted(false)
		}
	}, [validationErrors])

	useEffect(() => {
		if(submitted && Object.keys(apiErrors).length === 0){
			handleClose();
		} else{
			setSubmitted(false)
		}
	},[apiErrors])

	return (
		<>
			<Button variant='text' size='small' onClick={handleClickOpen}>
				Add Item
			</Button>
			<Dialog open={open} fullWidth>
				<DialogTitle>Add Menu Item</DialogTitle>
				<DialogContent>
					<Box sx={{ minWidth: 120 }} component='form' noValidate>
						<FormControl fullWidth sx={{mb:1, mt:1}}>
							<InputLabel id='course-select-label'>Course</InputLabel>
							<Select
								fullWidth
								labelId='course-select-label'
								id='course-select'
								value={formData.course}
								label='Course'
								onChange={handleChange}
								sx={{ minWidth:120 }}
								name='course'
								required={true}
								error={!!validationErrors?.course}
								helperText={validationErrors?.course || null}
							>
								{menu.map(c => <MenuItem key={c.courseId} value={c.courseName} data-courseid={c.courseId}>{c.courseName}</MenuItem>)}
							</Select>
							{!!validationErrors?.course ? 
								<FormHelperText>
									{validationErrors.course}
								</FormHelperText>
							: null
							}
							
						</FormControl>
						<TextField 
							fullWidth
							label='Name'
							value={formData.dishName}
							id='dishName'
							onChange={handleChange}
							name='dishName'
							error={!!validationErrors?.dishName}
							helperText={validationErrors?.dishName || null}
							sx={{mb:1}}
						/>
						<TextField 
							fullWidth
							label='Description'
							value={formData.description}
							id='description'
							onChange={handleChange}
							name='description'

						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAdd}>Add</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default AddMenuItemDialog