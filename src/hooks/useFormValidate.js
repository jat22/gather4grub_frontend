import { useState } from "react";
import Format from "../utilities/format";

/**
 * Hook that validates form inputs.
 * @returns {Array<Format(Object|Function)} - An array containing validationErrors state and validateForm function  
 */

const useFormValidate = (initialState={}) => {
	const [validationErrors, setValidationErrors] = useState(initialState);

	/**
	 * Validate required input fields.
	 * @param {String} field - field name. 
	 * @param {String} value - value of the field 
	 * @param {Boolean} ruleParam - placeholder
	 * @returns {(string|undefined)} if there is an error, returns error message, otherwise undefined.
	 */
	const validateRequired = (field, value, ruleParam) => {
		if(!value){
			return `${Format.varNameToDisplay(field)} is required`
		}
	}
	 /**
	  * Validate length of inputs that have a min/max length
	  * @param {String} field - field name.
	  * @param {String} value - field value.
	  * @param {{ min: number, max:number }} minMax - Object containing min and max length
	  * @returns {(string|undefined)} if there is an error, returns error message, otherwise undefined.
	  */
	const validateLength = (field, value, minMax) => {
		const fieldDisplay = Format.varNameToDisplay(field)
		const min = minMax.min;
		const max = minMax.max;
		const valLen = value.length
		
		if(min === max && valLen !== min){
			return `${fieldDisplay} must be ${min} characters.`
		} else if(min && valLen < min){
			return `${fieldDisplay} must be at least ${min} characters`
		} else if(max && valLen > max){
			return `${fieldDisplay} must be no more than ${max} characters`
		}
	}
	/**
	 * Validate inputs that need to be of a particular format
	 * @param {String} field - name of input field.
	 * @param {String} value - value of input field.
	 * @param {String} type - format type the value should match
	 * @returns {(string|undefined)} if there is an error, returns error message, otherwise undefined.
	 */
	const validateFormat = (field, value, type) => {
		const formatValidations = {
			'email' : {
				test: (val) => {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
				},
				msg: 'Must be a valid email address.'
			},
			'number' : {
				test: (val) => {
					return !!parseInt(val)
				},
				msg: 'Must contain only numeric values.'
			}
		}; 

		const passedTest = formatValidations[type].test(value)
		if(!passedTest){
			return formatValidations[type].msg
		}
	}
	
	const validateArray = (field, value, conditions) => {
		console.log(value)
		if(conditions.length){
			const min = conditions.length.min
			const max = conditions.length.max
			if(min && max){
				if(value.length < min || value.length > max){
					return true;
				} else return false;
			} else if(min && !max){
				if(value.length < min){
					return true;
				} else return false;
			} else if(max && !min){
				if(value.length > max){
					return true;
				} else return false;
			}
		}
	}

	const validationMap = {
		required : validateRequired,
		format : validateFormat,
		length : validateLength,
		array : validateArray
	};
	
	/**
	 * Validates form input data.
	 * @param {Object} formData - object containing form input.
	 * @param {{ field: {rule}}} validationRules - object containing validation rules.
	 * @returns {undefined} - sets validationErrors state and returns undefined.
	 */

	const validateForm = (formData, validationRules) => {
		setValidationErrors( e => {
			const newErrors = {};
	
			for(let field in validationRules){
				const value = formData[field];
				const rules = validationRules[field]
				for(let rule in rules){
					if(rules.hasOwnProperty(rule)){
						const ruleParams = rules[rule]
						const error = validationMap[rule](field, value, ruleParams)
						if(error){
							newErrors[field] = error
						}
					}
				}
			}
			return newErrors
		})
	}

	const resetValidationErrors = () => {
		setValidationErrors(e => initialState)
	}
	
	return { validationErrors, validateForm, resetValidationErrors }
}

export default useFormValidate



// rules = {
// 	field :[
// 		rule: {param}
// 	]
// }





// const validateRegisterForm = (formData, requiredFields) => {
// 	setValidationErrors((e) => {
// 		const newErrors ={}
// 		const requiredErrors = validateRequired(formData, requiredFields)
// 		if(Object.keys(requiredErrors).length !== 0){
// 			Object.assign(newErrors, requiredErrors)
// 		}
// 		if(!newErrors.email){
// 			const emailError = validateEmailFormat(formData.email)
// 			if(Object.keys(emailError).length !== 0){
// 				Object.assign(newErrors, emailError)
// 			}
// 		}
// 		return newErrors
// 	})
// }



// const validateForm = (formData, rules) => {
// 	setValidationErrors(e => {
// 		const newErrors = {};
// 		const ruleNames = Object.keys(rules);
// 		ruleNames.forEach(ruleName => {
// 			const validator = validationMap[ruleName]
// 			const specifics = rules[ruleName]
// 			const errors = validator(formData, specifics)
// 		})
// 	})
// }

// const validateRequired = (formData, requiredFields) => {
// 	const newErrors = {}
// 	for(let f of requiredFields){
// 		if(!formData[f].trim()){
// 			newErrors[f] = `${Format.varNameToDisplay(f)} is Required.`
// 		};
// 	}
// 	return newErrors
// };

// formData, specifics

// const validateEmailFormat = (formData, fields) => {

// 	if(!email) return
// 	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	if(!emailPattern.test(email)){
// 		return ({email: 'Please enter a valid email address.'})
// 	} else return {}
// }


// const validateLength = (reqs) => {
// 	// 	{field, value, min, max}
// 	const newErrors = {};
// 	reqs.forEach(r => {
// 		const field = r[field];
// 		const min = r[min];
// 		const max = r[max];
// 		const value = r[value].trim();
// 		const valueLength = value?.length;
// 		if(!valueLength || valueLength === 0) return;
// 		if(valueLength < min || valueLength > max){

// 			newErrors[field] = min === max 
// 				? `${Format.varNameToDisplay(field)} must be ${min} characters.`
// 				: `${Format.varNameToDisplay(field)} must be between ${min} and ${max} characters.`
// 		};
// 	});
// };

// const validateUserEdit = (formData, rules) => {
// 	setValidationErrors(e => {
// 		const fields
// 	})
// }
