import { useState } from "react";
import UserServices from "../api/services/user.services";


const useApiValidation = (initialState) => {
	const [apiValidationErrors, setApiValidationErrors] = useState(initialState);


	const validateUniqueFields = async (uniqueFields) => {
		// checks api for duplicate values
		try {

			const uniqueErrors = await UserServices.checkUnique(uniqueFields)
			setApiValidationErrors(e => {
				const newErrors = {}
				if(uniqueErrors.length !== 0){
					uniqueErrors.forEach(u => {
						const fieldValue = uniqueFields[u]
						newErrors[u] = `${fieldValue} is already in use.`
					})
				}
				return newErrors
			})
		} catch(err){
			throw err
		}
	}

	return { apiValidationErrors, validateUniqueFields }
}

export default useApiValidation
