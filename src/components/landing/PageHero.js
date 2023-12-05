import React from 'react';
import { Box, Typography, Button } from '@mui/material'
import { Link as LinkRouter } from "react-router-dom";



const Hero = ({ coverImage, header, subHeader, buttons }) => {
	return (
		<Box 
			sx={{
				width:'100%',
				height: 400,
				position: 'relative',
				backgroundColor:'gray',
				mb:4,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundImage: `url(${coverImage})`
			}}
		>
			<Box
				sx={{
					position: 'relative',
					top: 50
				}}
			>
				<Typography component="h1" variant="h3" color="white">
					{header}
				</Typography>
			</Box>
			<Box
				sx={{
					position: 'relative',
					top: 100
				}}
			>
				<Typography component="h5" color="white">
				{subHeader}
				</Typography>
			</Box>
			<Box
				sx={{
					position: 'relative',
					top: 150
				}}
			>
					{buttons ? buttons.map(b => {
						return(
							<Button
								sx={{ m: 1}}
								variant='contained'
								component={LinkRouter}
								to={b.route}
							>{b.text}</Button>
						)
					}): null}
			</Box>
		</Box>
	)
}

export default Hero