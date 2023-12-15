import { useState } from "react";
import UserServices from "../api/services/user.services";
import Format from "../utilities/format";

const useFormValidate = () => {
	const [validationErrors, setValidationErrors] = useState({});

	const validateRegisterForm = (formData, requiredFields) => {
		setValidationErrors((e) => {
			const newErrors ={}
			const requiredErrors = validateRequired(formData, requiredFields)
			if(Object.keys(requiredErrors).length !== 0){
				Object.assign(newErrors, requiredErrors)
			}
			if(!newErrors.email){
				const emailError = validateEmail(formData.email)
				if(Object.keys(emailError).length !== 0){
					Object.assign(newErrors, emailError)
				}
			}
			return newErrors
		})
	}

	const validateRequired = (formData, requiredFields) => {
		console.log(formData)
		const newErrors = {}
		for(let f of requiredFields){
			console.log(formData[f])
			// if(!formData[f].trim()){
			// 	newErrors[f] = `${Format.varNameToDisplay(f)} is Required.`
			// };
		}
		return newErrors
	};

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!emailPattern.test(email)){
			return ({email: 'Please enter a valid email address.'})
		} else return {}
	}

	return { validationErrors, validateRegisterForm, validateEmail, validateRequired }
}	

export default useFormValidate