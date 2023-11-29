import React, { useState } from "react";
import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import useFields from "../../hooks/useFields";

const AddMenuItemDialog = ({ menu, addMenuItem }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		resetFormData()
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const initialFormData = {
		course: '',
		dishName : '',
		description: ''
	}

	const [formData, handleChange, resetFormData] = useFields(initialFormData)
	const [course, setCourse] = useState({courseName:'', courseId:''})

	const handleAdd = () => {
		handleClose();
		addMenuItem(formData);
	};

	return (
		<>
			<Button variant='outlined' size='small' onClick={handleClickOpen}>
				Add Item
			</Button>
			<Dialog open={open}>
				<DialogTitle>Add Menu Item</DialogTitle>
				<DialogContent>
					<Box sx={{ minWidth: 120 }}>
						<FormControl>
							<InputLabel id='course-select-label'>Course</InputLabel>
							<Select
								labelId='course-select-label'
								id='course-select'
								value={formData.course}
								label='Course'
								onChange={handleChange}
								sx={{ minWidth:120 }}
								name='course'
							>
								{menu.map(c => <MenuItem key={c.courseId} value={c.courseName} data-courseid={c.courseId}>{c.courseName}</MenuItem>)}
							</Select>
						</FormControl>
						<TextField 
							label='Name'
							value={formData.dishName}
							id='dishName'
							onChange={handleChange}
							name='dishName'
						/>
						<TextField 
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