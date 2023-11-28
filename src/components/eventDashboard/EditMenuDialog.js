import React, { useState } from "react";
import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EventMenu from "./EventMenu";
import useFields from "../../hooks/useFields";


const EditMenuDialog = ({ menu, addNewCategory }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const [formData, handleChange, resetFormData]= useFields({newCategory:''})

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddNewCategory = () => {
		addNewCategory(formData.newCategory)
	}
	// TO DO: EditeMenuDialog handleUpdate
	const handleUpdate = () => {

	}

	return (
		<>
			<Button variant="outlined" size='small' onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog open={open} >
				<DialogTitle>Edit Menu</DialogTitle>
				<DialogContent>
					<TextField
						label='New Category'
						value={formData.newCategory}
						name="newCategory"
						id='newCategory'
						onChange={handleChange}
						size='small'
					/>
					<Button 
						onClick={handleAddNewCategory}
						size='small'
					>
						Add 
					</Button>
					<EventMenu menu={menu} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleUpdate}>Update</Button>
				</DialogActions>
			</Dialog>
		</>
		
	)

}

export default EditMenuDialog