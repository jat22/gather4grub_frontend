import React, { useState } from "react";
import { Modal, Button, Paper, Typography } from "@mui/material";
import EventsList from "./EventsList";


const AllEventsModal = ({ events, type }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
  	const handleClose = () => setOpen(false);

	return (
		<>
			<Button size='small' onClick={handleOpen}>
				See All
			</Button>
			<Modal 
				open={open}
				onClose={handleClose}
				aria-labeledby='modal-all-upcoming-events'
				aria-describedby='modal-description'
			>
				<Paper 
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '75%',
							bgcolor: 'background.paper',
							boxShadow: 24,
							p: 4,
						}}
				>
					<Typography>
						Upcoming Events
					</Typography>
					<EventsList short={false} events={events} type={type} />
				</Paper>
					
			</Modal>
		</>
	)
}

export default AllEventsModal