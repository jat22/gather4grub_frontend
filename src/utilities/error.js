
class ApiError extends Error {
	constructor(status, data) {
		super();
		this.status = status;
		this.data = data
	}
}

class LoginUnauthorizedError extends Error {
	constructor(message){
		super();

	}
}


export { ApiError }