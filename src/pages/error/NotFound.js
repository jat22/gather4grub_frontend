import React from "react";

import ErrorMessage from "../../components/error/ErrorMessage";

const NotFound = () => {
	const message = '404: The Page You Are Looking For Was Not Found.'
	return (
		<ErrorMessage errorMessage={message} />
	)
}

export default NotFound