import { useState } from "react"

const useFields = (initialState) => {
	const [formData, setFormData] = useState(initialState);
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(data => ({
			...data,
			[name] : value
		}))
	}

	const resetFormData = () => {
		setFormData(initialState)
	}

	const updateFormData = (newData) => {
		setFormData(newData)
	}
	return [formData, handleChange, resetFormData, updateFormData]
}

export default useFields