import { AddComment } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import useFields from "../../hooks/useFields";

const AddCommentDialog = ({ addComment }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		resetFormData();
		setOpen(true);
	};

	const [formData, setFormData, handleChange, resetFormData]= useFields({newCategory:''})

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddComment = () => {
		handleClose();
		addComment(formData.newComment)
	}

	return (
		<>
			<Button variant='outlined' size='small' onClick={handleClickOpen}>
				Add Comment
			</Button>
			<Dialog open={open} >
				<DialogTitle>
					Add Comment
				</DialogTitle>
				<DialogContent>
					<TextField 
						id='comment-field'
						label='New Comment'
						multiline
						rows={4}
						placeholder="Write a comment"
						name='newComment'
						value={formData.newComment}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions >
					<Button onClick={handleAddComment}>Add</Button>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>
	)

}

export default AddCommentDialog