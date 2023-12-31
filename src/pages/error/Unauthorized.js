import React from "react";

import ErrorMessage from "../../components/error/ErrorMessage";

const Unauthorized = () => {
	const message = 'You Are Not Authorized to Be Here.'
	return (
		<ErrorMessage errorMessage={message} />
	)
}

export default Unauthorized