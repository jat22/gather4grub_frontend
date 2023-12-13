
import React from "react";

import ErrorMessage from "../../components/error/ErrorMessage";

const GeneralError = () => {
	const message = 'Oh No! Something went wrong. Please try again.'
	return (
		<ErrorMessage errorMessage={message} />
	)
}

export default GeneralError