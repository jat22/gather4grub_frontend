import React, { useState, useContext, useEffect, useRef } from 'react';
import { Container, Typography, Box, Grid, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import useFields from '../../hooks/useFields';
import EventServices from '../../api/services/event.services';
import UserContext from '../../context/UserContext';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import useFormValidate from '../../hooks/useFormValidate';

const GatheringCreate = () => {
	// context
	const user = useContext(UserContext)

	// state
	const [submitted, setSubmitted] = useState(false)
	const [apiErrors, setApiErrors] = useState(false)
	const [courses, setCourses] = useState([])

	// hooks
	const navigate = useNavigate();
	const {formData, handleChange, handlePickerData, updateFormData, resetFormData} = useFields({
			title: '',
			date: '',
			startTime: '',
			endTime: '',
			location: '',
			description: '',
			courses:[]
		})

	const { validationErrors, validateForm, resetValidationErrors } = useFormValidate();
	const validationRules = {
		date : {required:true},
		title : {required:true},
		courses : {array: {length : {min:1}}}
	}

	const courseInputRef = useRef('')

	// event handlers
	const handleSubmit = async (evt)=> {
		evt.preventDefault();
		setApiErrors(false);
		setSubmitted(true);

		validateForm(formData, validationRules);
	}

	const handleAddCourse = () => {
		if(courseInputRef.current) {
			const newCourse = courseInputRef.current.value;
			if(newCourse){
				setCourses(c=>{
					const newCourses = [...c, newCourse];
					return newCourses;
				})
			}
			
			courseInputRef.current.value = ''
		}
	}

	const createEvent = async () => {
		try{
			const res = await EventServices.createEvent(formData, user.username)
			handleNavigate(res.data.event.id)
		}catch(err){
			setApiErrors(true);
		};
	};

	const  handleNavigate = (id) => {
		setSubmitted(false);
		navigate(`/gatherings/${id}`)
		resetFormData();
		setApiErrors(e=>false);
		resetValidationErrors();
	}

	useEffect(()=> {
		const newFormData = {
			...formData, courses
		}
		updateFormData(newFormData)
	},[courses])

	useEffect(()=> {
		if(submitted && Object.keys(validationErrors).length === 0) {
			createEvent();
		} else{
			setSubmitted(false);
		};
	}, [validationErrors]);

	return(
		<Container component='main'>
			<Box
				sx={{
					marginTop: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography component='h1' variant='h3'>
					Create New Event
				</Typography>
				{
					apiErrors ?
					<Typography sx={{color:'red'}}>
						Something went wrong. Event not created.
					</Typography>
					: null
				}
				<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt:3 }}>
					<Grid container spacing={2}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Grid item xs={4} md={4}>
							<DatePicker
								fullWidth
								slotProps={{
									textField : {
										required:true,
										error: !!validationErrors?.date,
										helperText:validationErrors?.date || null}
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
						<Grid item xs={12} xl={12}>
							<Typography>
								Courses
							</Typography>
							{validationErrors?.courses ? 
								<Typography sx={{color:'red'}}>
									You must add at least one course.
								</Typography>
								: null
						}
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
									fullWidth
									name='newCourse'
									id='new-course'
									label='Add A Course'
									inputRef={courseInputRef}
							/>
							<Button 
								onClick={handleAddCourse}
							>
								Add Course
							</Button>
						</Grid>
						<Grid item xs={12} md={6}>
							<List>
								{courses.map((c) =>{
									return (
										<ListItem key={c}>
											<ListItemText>
												{c}
											</ListItemText>
										</ListItem>
									)
								})}
							</List>
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

export default GatheringCreate