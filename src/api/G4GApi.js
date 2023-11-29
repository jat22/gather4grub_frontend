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
		let res = await this.request(`users/${username}/events/upcoming`)
		
		return res
	}

	static async getHostingEvents(username) {
		let res = await this.request(`users/${username}/events/hosting`)
		return res
	}

	static async getUserConnections(username){
		let res = await this.request(`users/${username}/connections`);
		return res
	}

	static async acceptInvite(username, inviteId){
		let res = await this.request(`events/invitations/${username}/${inviteId}`, {rsvp:'accept'}, 'put')
		return res
	}

	static async declineInvite(username, inviteId){
		let res = await this.request(`events/invitations/${username}/${inviteId}`, {rsvp:'decline'}, 'put')
	}

	static async createEvent(data){
		let res = await this.request('events', data, 'post')
		return res
	}

	static async getAllEventInfo(id){
		let res = await this.request(`events/${id}/full`);
		return res
	}

	static async updateBasicDetails(eventId, data){
		console.log(data)
		let res = await this.request(`events/${eventId}/basic`, {data}, 'put')
		return res
	}

	static async inviteGuests(usernames, eventId){
		let res = await this.request(`events/${eventId}/guests`, {usernames}, 'post')
		return res
	}

	static async uninviteGuest(username, eventId){
		let res = await this.request(`events/${eventId}/guests/${username}`, {}, 'delete')
		return
	}

	static async getGuestList(eventId){
		let res = await this.request(`events/${eventId}/guests`)
		return res
	}

	static async addMenuCategory(eventId, newCategory){
		let res = await this.request(`events/${eventId}/menu/categories`, {newCategory}, 'post')
		return res
	};

	static async addMenuItem(eventId, newItem){
		let res = await this.request(`events/${eventId}/menu`, {newItem}, 'post')
		return res
	}

	static async removeDish(dishId, eventId){
		let res = await this.request(`dishes/${dishId}`, {}, 'delete')
		return
	}

	static async getEventMenu(eventId){
		let res = await this.request(`events/${eventId}/menu`)
		return res
	}

	static async addComment(comment, username, eventId){
		let res = await this.request(`events/${eventId}/comments`, {comment: comment, author:username}, 'post')
		return res
	}

	static async removeComment(commentId, eventId){
		let res = await this.request(`events/${eventId}/comments/${commentId}`, {}, 'delete')
		return
	}

	static async getEventComments(eventId) {
		let res = await this.request(`events/${eventId}/comments`)
		return res
	}
}
export default G4GApi