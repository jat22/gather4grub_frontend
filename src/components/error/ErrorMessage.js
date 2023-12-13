import React from "react";
import { Typography, Box } from "@mui/material";

const ErrorMessage = ({ errorMessage }) => {
	return(
		<Box sx={{ margin:3 }}>
			<Typography variant="h2" component='h1'>{errorMessage}</Typography>
		</Box>
	);
};

export default ErrorMessage