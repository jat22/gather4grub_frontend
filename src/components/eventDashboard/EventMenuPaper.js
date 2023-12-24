import { useContext } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import EventMenuList from "./EventMenuList";
import AddMenuItemDialog from "./AddMenuItemDialog";
import AddCourseDialog from "./AddCourseDialog";

import UserContext from "../../context/UserContext";

const EventMenuPaper = ({ eventInfo, addMenuItem, apiErrors, setApiErrors, addNewCourse, removeMenuItem}) => {

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
					Menu
				</Typography>
				{eventInfo.currUserRsvp?.rsvp === 'accept' || eventInfo.currUserHost ?
					<>
						<AddMenuItemDialog 
							menu={eventInfo.menu} 
							addMenuItem={addMenuItem} 
							apiErrors={apiErrors} 
							setApiErrors={setApiErrors} 
						/>
						{eventInfo.currUserHost ? 
							<AddCourseDialog 
								addNewCourse={addNewCourse}
								apiErrors={apiErrors}
								setApiErrors={setApiErrors}
							/>
							: null
						}
					</>
					: null
				}
			</Grid>
			<Grid item xs={12}>
			{eventInfo?.menu.length > 0 ?
				<EventMenuList 
					menu={eventInfo.menu} 
					isHost={eventInfo.currUserHost} 
					username={user.username}
					removeMenuItem={removeMenuItem}
				/>
				: null
			}					
			</Grid>
		</Paper>
	)
}

export default EventMenuPaper;