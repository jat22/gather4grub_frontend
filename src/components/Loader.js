import React from 'react';
import { CircularProgress, Grid } from '@mui/material';


const Loader = () => {
  return (
	<Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
		<Grid item>
			<CircularProgress />
		</Grid>

    </Grid>
  );
}

export default Loader