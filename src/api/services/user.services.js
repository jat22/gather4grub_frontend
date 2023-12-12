import G4GApi from "../G4GApi";

class UserServices {
	static async login(input){
		try{
			const res = await G4GApi.getToken(input)
			return res.data
		}catch(err){
			
		}
		
	}		
	
	static async registerUser(data){
		const res = await G4GApi.register(data)
		return res
	}

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

	static async checkUsernameExists(username){
		const res = await G4GApi.checkUsernameExists(username)
		return res.data.usernameExists
	}

	static async checkEmailExists(email){
		const res = await G4GApi.checkEmailExists(email);
		return res.data.emailExists
	}

	static async checkUnique (inputs){
		const validations = {
			username : this.checkUsernameExists,
			email : this.checkEmailExists
		}

		const fields = Object.keys(inputs)
		const checkUniquePromises = fields.map((f) => {
			return validations[f](inputs[f])
		})

		const results = await Promise.all(checkUniquePromises)

		const uniqueValueErrors = []
		fields.forEach((f,i) => {
			if(results[i]){
				uniqueValueErrors.push(f)
			}
		})

		return uniqueValueErrors
	}
}

export default UserServices