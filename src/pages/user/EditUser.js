import React, { useContext, useEffect } from "react";
import useFields from "../../hooks/useFields";
import UserContext from "../../context/UserContext";
import { Container, Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import UserServices from "../../api/services/user.services";
import { useNavigate } from "react-router-dom";
import ChangePasswordDialog from "../../components/editUser/ChangePasswordDialog";

const EditUser = () => {
	const [formData, handleChange, resetFormData, updateFormData, handlePickerData] = useFields({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		streetAddress: '',
		city: '',
		state: '',
		zip: '',
		tagLine: '',
		bio: '',
		avatarUrl: ''
	})
	
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		delete formData.username
		await UserServices.editUser(user.username, formData);
		navigate(`/users/${user.username}/dashboard`)
		resetFormData();
	}

	useEffect(() => {
		const getCurUserInfo = async () => {
			const info = await UserServices.getUserInfo(user.username);
			updateFormData(info)
		};
		getCurUserInfo()
	}, [])

	if(!formData) return null

	return (
		<Container >
			<Box
				sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				}}
			>
		<Typography component="h1" variant="h3">
			Update Information
		</Typography>
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						name="firstName"
						required
						fullWidth
						id="firstName"
						label="First Name"
						value={formData.firstName}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<ChangePasswordDialog />
				</Grid>
				<Grid item xs={12} md={12}>
					<TextField
						fullWidth
						id="streetAddress"
						label="Street Address"
						name="streetAddress"
						value={formData.streetAddress}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} md={5}>
					<TextField
						fullWidth
						name="city"
						label="City"
						id="city"
						value={formData.city}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={3} md={3}>
					<TextField
						fullWidth
						name="state"
						label="State"
						id="state"
						value={formData.state}
						onChange={handleChange}
					/>
             	</Grid>
				<Grid item xs={9} md={4}>
					<TextField
						fullWidth
						name="zip"
						label="Zip"
						id="zip"
						value={formData.zip}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						name="tagLine"
						label="Tag Line"
						id="tagLine"
						value={formData.tagLine}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						name="avatar"
						label="Avatar"
						id="avatar"
						value={formData.avatarUrl}
						onChange={handleChange}
					/>
				</Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
		</Container>
	)
} 

export default EditUser