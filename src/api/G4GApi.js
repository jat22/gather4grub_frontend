import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class G4GApi {
	static token;

	static async request(endpoint, data = {}, method='get'){
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization : G4GApi.token}
		const params = method ==='get' ? data : {};
		try{
			return(await axios({url, method, data, params, headers}));
		} catch(err){
			console.log('API Error', err.response);
			return err.response
		}
	}

	static async getToken(data) {
		return await this.request('auth/token', data, "post")
	}

	static async register(data) {
		let res = await this.request('auth/register', data, 'post')
		return res
	}

	static async getUser(username){
		let res = await this.request('')
	}

	static async getUserInvitations(username){
		let res = await this.request(`users/${username}/invitations`, {}, 'get')
		return res
	}

	static async getUpcomingEvents(username){
		let res = await this.request(`users/${username}/gatherings/upcoming`)
		return res
	}

	static async getHostingEvents(username) {
		let res = await this.request(`users/${username}/gatherings/hosting`)
		return res
	}

	static async getUserConnections(){

	}
}
export default G4GApi