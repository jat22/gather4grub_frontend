
import React, { useEffect, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

import useFields from "../../hooks/useFields";
import useFormValidate from "../../hooks/useFormValidate";

const validationRules = {
	newComment: {required : true}
}

const AddCommentDialog = ({ addComment, apiErrors, setApiErrors }) => {
	// state
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// hooks
	const { formData, handleChange, resetFormData } = useFields({newCategory:''});
	const { validationErrors, validateForm, resetValidationErrors } = useFormValidate();

	// event handlers
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetFormData();
		resetValidationErrors();
		setApiErrors(e=>{});
		setSubmitted(false);
	};

	const handleAddComment = () => {
		setSubmitted(true);
	}

	// effects
	useEffect(()=>{
		if(submitted){
			validateForm(formData, validationRules);
		};
	}, [submitted]);

	useEffect(()=>{
		if(submitted && Object.keys(validationErrors).length === 0){
			addComment(formData.newComment);
		}else{
			setSubmitted(false);
		};
	}, [validationErrors]);

	useEffect(()=> {
		if(submitted && Object.keys(apiErrors).length === 0){
			handleClose();
		} else{
			setSubmitted(false);
		};
	}, [apiErrors]);

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
					{apiErrors?.addComment ?
						<Typography>Something went wrong, comment not added.</Typography>
						: null
					}
					<TextField 
						id='comment-field'
						label='New Comment'
						multiline
						rows={4}
						placeholder="Write a comment"
						name='newComment'
						value={formData.newComment}
						onChange={handleChange}
						error={!!validationErrors?.newComment}
						helperText={validationErrors?.newComment || null}
					/>
				</DialogContent>
				<DialogActions >
					<Button onClick={handleAddComment}>Add</Button>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddCommentDialog;