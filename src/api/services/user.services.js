import G4GApi from "../G4GApi";

class UserServices {
	static async getUserConnections(username){
		const res = await G4GApi.getUserConnections(username);
		return res.data.connections
	}
}

export default UserServices