import G4GApi from "../G4GApi";

class UserServices {
	static async getUserConnections(username){
		const res = await G4GApi.getUserConnections(username);
		return res.data.connections
	}

	static async getUserProfile(username){
		const res = await G4GApi.getUserProfile(username);

		return res.data.profile
	}

	static async getUserInfo(username) {
		const res = await G4GApi.getUserInfo(username)
		return res.data.user
	}

	static async editUser(username, data){
		await G4GApi.editUser(username, data)
		return
	}

	static async updatePassword(data){
		const res = await G4GApi.updatePassword(data)
		if(res.status == 200) return {success:true, msg:''}
		else {
			return {success: false, msg: res.data.error.message}
		}
	}
}

export default UserServices