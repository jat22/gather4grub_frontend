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

	const handlePickerData = (val, name) => {
		setFormData(data => ({
			...data,
			[name] : val
		}))
	}

	const trimForSubmit = () => {
		const fields = Object.keys(formData);
		fields.forEach(f => formData[f] = formData[f].trim())
	}

	return [formData, setFormData, handleChange, resetFormData, updateFormData, handlePickerData, trimForSubmit]
}

export default useFields