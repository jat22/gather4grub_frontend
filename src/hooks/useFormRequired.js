import { useState } from "react";

const useFormRequired = (initialState) => {
	const [errors, setErrors] = useState(initialState)

	const validateRequired = (formData, requiredFields) => {
		const newErrors = {}
		for(let f of requiredFields){
			if(!formData[f].trim()){
				newErrors[f] = true
			}
		}
		setErrors(e => newErrors)
	}

	return [errors, validateRequired]
}	

export default useFormRequired