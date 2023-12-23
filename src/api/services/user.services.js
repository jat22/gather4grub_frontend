import Format from "../../utilities/format";
import G4GApi from "../G4GApi";

class UserServices {
	static async login(input){
		try{
			const tokenRes = await G4GApi.getToken(input);
			const avatarRes = await G4GApi.getAvatar(input.username)
			const avatar = avatarRes.data.avatar || {}
			return {token:tokenRes.data.token, avatar:avatar}
		}catch(err){
			throw err;
		};	
	};	
	
	static async registerUser(data){
		try{
			const res = await G4GApi.register(data);
			return res;
		} catch(err){
			throw err;
		};
	};

	static async getUserConnections(username){
		try{
			const res = await G4GApi.getUserConnections(username);
			return res.data.connections;
		} catch(err){
			throw err;
		};
	};

	static async getUserProfile(username){
		try{
			const res = await G4GApi.getUserProfile(username);
			return res.data.profile;
		} catch(err){
			throw err;
		};
	};

	static async getUserInfo(username) {
		try{
			const res = await G4GApi.getUserInfo(username);
			return res.data.user;
		} catch(err){
			throw err;
		};
	}

	static async editUser(username, data){
		const cleanData = Format.emptyStringToNull(data)
		try{
			await G4GApi.editUser(username, cleanData);
			return;
		} catch(err){
			throw err;
		};
	};

	static async updatePassword(data){
		try{
			const res = await G4GApi.updatePassword(data);
			return ;
		}catch(err){
			throw err;
		};
	};

	static async checkUsernameExists(username){
		try{
			const res = await G4GApi.checkUsernameExists(username);
			return res.data.usernameExists;
		}catch(err){
			throw err;
		};	
	};

	static async checkEmailExists(email){
		try{
			const res = await G4GApi.checkEmailExists(email);
			return res.data.emailExists;
		}catch(err){
			throw err;
		};
	};

	static async checkUnique (inputs){
		// map of validation functions.
		const validationsMap = {
			username : this.checkUsernameExists,
			email : this.checkEmailExists
		};

		// promises created based on input fields.
		const fields = Object.keys(inputs);
		const checkUniquePromises = fields.map((f) => {
			return validationsMap[f](inputs[f]);
		})
		try{
			const results = await Promise.all(checkUniquePromises);
			const uniqueValueErrors = [];
			fields.forEach((f,i) => {
				if(results[i]){
					uniqueValueErrors.push(f);
				};
			});
	
			return uniqueValueErrors;
		} catch(err){
			throw err;
		};
	};

	static async getAvatarList (){
		try{
			const res = await G4GApi.getAvatarList();
			return res.data.avatars
		}catch(err){
			throw err
		}
	}

	static async updateAvatar (username, avatarId){
		try{
			const res = await G4GApi.updateAvatar(username, avatarId);
			return res.data.avatar
		}catch(err){
			throw err
		}
	}
};

export default UserServices;