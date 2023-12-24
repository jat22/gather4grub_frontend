import { useContext } from "react"
import { Paper, Grid, Typography } from "@mui/material"

import AddCommentDialog from "./AddCommentDialog"
import EventCommentsList from "./EventCommentsList"
import UserContext from "../../context/UserContext"

const EventCommentsPaper = ({ eventInfo, addComment, apiErrors, setApiErrors, removeComment }) => {

	const { user } = useContext(UserContext)

	return (
		<Paper
			elevation={4}
			sx={{
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'start'
			}}
		>
			<Grid item xs={12}>
				<Typography variant='h4' components='h3'>
					Comments
				</Typography>
				<AddCommentDialog 
					addComment={addComment} 
					apiErrors={apiErrors} 
					setApiErrors={setApiErrors} 
				/>
				{apiErrors?.removeComment ? 
					<Typography>
						Something went wrong, comment not removed.
					</Typography>
					: null
				}
			</Grid>
			<Grid item xs={12}>
				<EventCommentsList 
					comments={eventInfo.comments} 
					removeComment={removeComment}
					isHost={eventInfo.currUserHost}
					username={user.username} 
				/>
			</Grid>
		</Paper>
	)
}

export default EventCommentsPaper