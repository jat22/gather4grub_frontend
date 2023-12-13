
import React from "react";

import ErrorMessage from "../../components/error/ErrorMessage";

const NetworkError = () => {
	const message = 'Network Error. Unable to connect to server. Please try again later.'
	return (
		<ErrorMessage errorMessage={message} />
	)
}

export default NetworkError