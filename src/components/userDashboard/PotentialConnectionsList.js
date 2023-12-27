
import React from "react";
import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import UserList from "../UserList";

const PotentialConnectionsList = ({ potentials, createConnectionRequest }) => {

	return (
		<UserList 
			users={potentials}
			actions={[
				{label:"Send Connection Request", function:createConnectionRequest, targetData:'username'},
				{label:"Request Pending", function: null, targetData: null},
				{label:'Connected', function: null, targetData: null},
				{label: 'Self', function:null, targetData:null}
			]}
			type="searchResults" 
		/>
	);
};

export default PotentialConnectionsList;