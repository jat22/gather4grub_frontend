import axios from 'axios';
import { ApiError } from '../utilities/error';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class G4GApi {
	static token;

	static async request(endpoint, data = {}, method='get'){
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization : G4GApi.token}
		const params = method ==='get' ? data : {};

		try{
			const response = await axios({url, method, data, params, headers})
			return response
		} catch(err){
			if(err.response){
				console.log('API Error', err.response);
				throw new ApiError(err.response.status, err.response.data)
			} else if(err.request){
				console.log('Network Error', err)
				throw new ApiError(500, {error:{message:'Network Error'}})
			} else {
				console.log('Error', err);
				return {status: 'unknown', data : {error: {message: 'Unknown Error Occured'}}}
			}

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

	static async getConnections(username){
		let res = await this.request(`users/${username}/connections`)
		return res
	}

	static async createConnectionRequest(fromUsername, toUsername){
		let res = await this.request(`users/${fromUsername}/connections/requests`, { 'toUsername' : toUsername}, 'post')
		return
	}

	static async getPotentialConnections(input){
		let res = await this.request(`users/find/${input}`)
		return res
	}

	static async getConnectionRequests(username){
		let res = await this.request(`users/${username}/connections/requests`);
		return res
	}

	static async acceptConnectionRequest(id, curUsername){
		let res = await this.request(`users/${curUsername}/connections/requests/${id}`, {}, 'put')
		return
	}

	static async deleteConnectionRequest(id, curUsername){
		let res = await this.request(`users/${curUsername}/connections/requests/${id}`, {}, 'delete')
		return
	}

	static async getUserProfile(username){
		const res = await this.request(`users/${username}/profile`)
		return res
	}

	static async getUserInfo(username) {
		const res = await this.request(`users/${username}`)
		return res
	}

	static async editUser(username, data) {
		const res = await this.request(`users/${username}`, data, 'patch')
	}

	static async updatePassword(data) {
		const res = await this.request(`users/${data.username}/password`, data, 'patch')
		return res
	}

	static async checkUsernameExists(username){
		const res = await this.request(`auth/check/username`, {username:username}, 'get')
		return res
	};
	
	static async checkEmailExists(email){
		const res = await this.request(`auth/check/email`, {email:email}, 'get')
		return res
	}
}
export default G4GApi