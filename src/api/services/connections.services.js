import G4GApi from "../G4GApi"


class ConnectionServices {
	static async getConnections(username) {

		const res = await G4GApi.getConnections(username)
		return res.data.connections
	}

	static async createRequest(fromUsername, toUsername){
		await G4GApi.createConnectionRequest(fromUsername, toUsername)
		return 
	}

	static async getPotential(input){
		const res = await G4GApi.getPotentialConnections(input)
		return res.data.users
	}

	static async getRequests(username){
		const res = await G4GApi.getConnectionRequests(username)
		return res.data.connectionRequests
	}

	static async acceptRequest(id, curUsername){
		await G4GApi.acceptConnectionRequest(id, curUsername)
	}

	static async deleteRequest(id, curUsername){
		await G4GApi.deleteConnectionRequest(id, curUsername)
	}
}

export default ConnectionServices