import React, { useState} from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

const EventMenu = ({menu}) => {

	const accordianExpandInitialState = () => {
		const result = {}
		let i = 1; 
		while(i <= menu.length){
			result[`panel${i}`] = true
		}
		return result
	}

	const [menuAccordianExpanded, setMenuAccordianExpanded] = useState(accordianExpandInitialState);

	const toggleMenuAccordians = (panel) => (event) => {
		const newMenuAccordianExpanded = {...menuAccordianExpanded, [panel] : !menuAccordianExpanded[panel]}
		setMenuAccordianExpanded( cur => newMenuAccordianExpanded);
	};

	const generateMenu = () => {
		return (
			<>
				{menu !== undefined ? menu.map((c, i)=>{
					let panel = `panel${i}`
					return (
						<Accordion expanded={menuAccordianExpanded[panel]} onChange={toggleMenuAccordians(panel)}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`${panel}bh-content`}
								id={`${panel}bh-header`}
							>
								<Typography sx={{fontWeight:'bold', width: '33%', textAlign:'start'}}>
									{c.courseName}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List>
									{c.items.map(d => generateDish(d))}
								</List>
							</AccordionDetails>
						</Accordion>
					)
				}) : null}
			</>
		)
	};

	const generateDish = (dish) => {
		return (
			<ListItem alignItems='flex-start'>
				<ListItemText
					primary={dish.name}
					secondary={
						<>
							<Typography
								sx={ {display: 'inline'}}
								componenet='span'
								variant='body2'
							>
								{dish.description}
							</Typography>
							<Typography variant='caption' display='block'>
								<Link
									sx={{ fontSize: 1, }}
								>
									{dish.user}
								</Link>
							</Typography>
						</>
					}
				/>
			</ListItem>
		)
	}

	return generateMenu()
}

export default EventMenu