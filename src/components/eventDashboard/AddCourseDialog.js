import React, { useEffect, useState } from "react";
import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import EventMenu from "./EventMenuList";
import useFields from "../../hooks/useFields";
import useFormValidate from "../../hooks/useFormValidate";

const validationRules = {
	newCourse : {required: true}
}

const AddCourseDialog = ({ addNewCourse, apiErrors, setApiErrors }) => {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const { formData, handleChange, resetFormData } = useFields({newCourse:''});
	const { validationErrors, validateForm, resetValidationErrors} = useFormValidate();

	const handleClose = () => {
		setOpen(false);
		resetValidationErrors();
		setApiErrors({});
		setSubmitted(false);
		resetFormData();
	};

	const handleAddNewCourse = () => {
		validateForm(formData, validationRules);
		setSubmitted(true);
	};
	// TO DO: EditeMenuDialog handleUpdate
	const handleUpdate = () => {

	}

	useEffect(() => {
		if(submitted && Object.keys(validationErrors).length === 0){
			addNewCourse(formData.newCourse)
		}
	}, [submitted]);
	
	useEffect(() => {
		if(submitted && !apiErrors?.newCourse){
			handleClose();
		} else{
			setSubmitted(false);
		};
	}, [apiErrors]);

	return (
		<>
			<Button variant="text" size='small' onClick={handleClickOpen}>
				Add Course
			</Button>
			<Dialog fullWidth open={open} >
				<DialogTitle>Add A Course</DialogTitle>
				<DialogContent>
					{apiErrors?.newCourse ? 
						<Typography>Something went wrong, course not added.</Typography>
						: null
					}

					<TextField
						sx={{mt:1}}
						fullWidth
						label='New Course'
						value={formData.newCourse}
						name="newCourse"
						id='newCourse'
						onChange={handleChange}
						size='small'
						error={!!validationErrors?.newCourse}
						helperText={validationErrors?.newCourse || null}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAddNewCourse}>Add</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddCourseDialog;