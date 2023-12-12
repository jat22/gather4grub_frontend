import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ErrorBoundary = ({ children }) => {
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const errorHandler = () => setHasError(true);
		window.addEventListener('error', errorHandler)
	})

}