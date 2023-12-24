import React, { useState} from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText, Chip, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";




const EventMenuList = ({ menu, isHost, username, removeMenuItem }) => {
	// state
	const accordianExpandInitialState = () => {
		const result = {};
		let i = 0; 
		while(i < menu.length){
			result[`panel${i}`] = false;
			i++;
		}
		return result;
	}
	const [menuAccordianExpanded, setMenuAccordianExpanded] = useState(accordianExpandInitialState);


	// event handlers
	const toggleMenuAccordians = (panel) => (event) => {
		const newMenuAccordianExpanded = {...menuAccordianExpanded, [panel] : !menuAccordianExpanded[panel]};
		setMenuAccordianExpanded( cur => newMenuAccordianExpanded);
	};

	const handleremoveMenuItem = (dishId) => {
		removeMenuItem(dishId);
	};

	// component generators
	const generateMenu = () => {
		return (
			<>
				{menu !== undefined ? menu.map((c, i)=>{
					let panel = `panel${i}`
					return (
						<Accordion 
							key={c.courseId} 
							expanded={menuAccordianExpanded[panel]} 
							onChange={toggleMenuAccordians(panel)}
							elevation={0}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`${panel}bh-content`}
								id={`${panel}bh-header`}
							>
								<Typography sx={{
									fontWeight:'bold',
									width: '33%', 
									textAlign:'start'
								}}
								>
									{c.courseName}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List 
									sx={{p:0}}
								>
									{c.dishes.map(d => generateDish(d))}
								</List>
							</AccordionDetails>
						</Accordion>
					)
				}) : null}
			</>
		);
	};

	const generateDish = (dish) => {
		return (
			<ListItem 
				sx={{p:0}}
				key={dish.id}
				alignItems='flex-start'
				secondaryAction={
					isHost || dish.username === username ?
						<IconButton 
							edge='end'
							aria-label='delete'
							onClick={()=>handleremoveMenuItem(dish.id)}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					: null
				}
			>
				<ListItemText
					primary={dish.name}
					secondary={
						<>
							<Typography
								sx={ {display: 'inline'}}
								component='span'
								variant='body2'
							>
								{dish.description}
							</Typography>
							<Typography variant='caption' display='block'>
								<Link
									sx={{ fontSize: 1, }}
								>
									{dish.username}
								</Link>
							</Typography>
						</>
					}
				/>
			</ListItem>
		);
	};

	return generateMenu()
}

export default EventMenuList