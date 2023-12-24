
class ApiError extends Error {
	constructor(status, data) {
		super();
		this.status = status;
		this.data = data
	}
}

export { ApiError }