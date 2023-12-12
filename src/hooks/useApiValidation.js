import { useState } from "react";
import UserServices from "../api/services/user.services";


const useApiValidation = (initialState) => {
	const [apiErrors, setApiErrors] = useState(initialState)

	const validateUniqueFields = async (uniqueFields) => {
		const uniqueErrors = await UserServices.checkUnique(uniqueFields)
		setApiErrors(e => {
			const newErrors = {}
			if(uniqueErrors.length !== 0){
				uniqueErrors.forEach(u => {
					const fieldValue = uniqueFields[u]
					newErrors[u] = `${fieldValue} is already in use.`
				})
			}
			return newErrors
		})
	}
	return { apiErrors, validateUniqueFields }
}

export default useApiValidation
