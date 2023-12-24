import React, { useState } from "react";
import { Modal, Button, Paper, Typography, List } from "@mui/material";

import InviteListItem from "./InviteItem";


const AllInvitationsModal = ({ invitations, acceptInvite, declineInvite }) => {
	// state
	const [open, setOpen] = useState(false);

	// event handlers
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
				aria-labelledby='modal-all-pending-invitations'
				aria-describedby='modal-description'
				sx={{overflow:'scroll'}}
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
					<List dense>
					{invitations.map((i) => (
						<InviteListItem 
							key={i.id}
							id={i.id}
							item={i} 
							acceptInvite={acceptInvite} 
							declineInvite={declineInvite} 
						/>
						))
					}
					</List>
				</Paper>
					
			</Modal>
		</>
	);
};

export default AllInvitationsModal;