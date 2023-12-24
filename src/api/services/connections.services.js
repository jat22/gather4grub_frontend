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

	static async getPotential(input, currUsername){
		const res = await G4GApi.getPotentialConnections(input, currUsername)
		return res.data.users
	}

	static async getRequests(username){
		const res = await G4GApi.getConnectionRequests(username)
		return res.data.connectionRequests
	}

	static async acceptRequest(id, curUsername){
		const res = await G4GApi.acceptConnectionRequest(id, curUsername)
		return res.status
	}

	static async deleteRequest(id, curUsername){
		const res = await G4GApi.deleteConnectionRequest(id, curUsername)
		return res.status
	}

	static async unfollow(username, connectionId){
		const res = await G4GApi.unfollow(username, connectionId);
		return res.status
	}
}

export default ConnectionServices