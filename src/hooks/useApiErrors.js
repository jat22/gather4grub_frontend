import { useState } from 'react';

const useApiErrors = () => {
	const [errors, setErrors] = useState([]);

	

	return { errors, setErrors }
}

export default useApiErrors