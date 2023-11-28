import React, { useState } from "react";
import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import useFields from "../../hooks/useFields";

const AddMenuItemDialog = ({ menu, addMenuItem }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		resetFormData()
		setOpen(true);
	};

	const [courseSelect, setCourseSelect] = useState('')

	const [formData, handleChange, resetFormData] = useFields({
		dishName : '',
		description: ''
	})

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd = () => {
		handleClose();
		addMenuItem(courseSelect, formData);
	};

	const handleCourseSelect = (event) => {
		setCourseSelect(event.target.value)
	}

	return (
		<>
			<Button varient='outlined' size='small' onClick={handleClickOpen}>
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
								value={courseSelect}
								label='Course'
								onChange={handleCourseSelect}
								sx={{ minWidth:120 }}
							>
								{menu.map(c => <MenuItem key={c.courseId} value={c.courseName}>{c.courseName}</MenuItem>)}
							</Select>
						</FormControl>
						<TextField 
							label='Name'
							value={formData.dishName}
							id='dishName'
							onChange={handleChange}
						/>
						<TextField 
							label='Description'
							value={formData.description}
							id='description'
							onChange={handleChange}
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