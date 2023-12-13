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
				throw new ApiError('unknown', {error: {message: 'Unknown Error Occured'}})
			}

		}
	}

	static async getToken(data) {
		try{
			return await this.request('auth/token', data, "post")
		}catch(err){
			throw err
		}

	}

	static async register(data) {
		try{
			let res = await this.request('auth/register', data, 'post')
			return res
		}catch(err){
			throw err
		}

	}

	// static async getUser(username){
	// 	try{
	// 		let res = await this.request('')
	// 	}catch(err){
	// 		throw err
	// 	}

	// }

	static async getUserInvitations(username){
		try{
			let res = await this.request(`users/${username}/invitations`, {}, 'get')
			return res
		}catch(err){
			throw err
		}

	}

	static async getUpcomingEvents(username){
		try{
			let res = await this.request(`users/${username}/events/upcoming`)
			return res
		}catch(err){
			throw err
		}

	}

	static async getHostingEvents(username) {
		try{
			let res = await this.request(`users/${username}/events/hosting`)
			return res
		}catch(err){
			throw err
		}
	}

	static async getUserConnections(username){
		try{
			let res = await this.request(`users/${username}/connections`);
			return res
		}catch(err){
			throw err
		}
	}

	static async acceptInvite(username, inviteId){
		try{
			let res = await this.request(`events/invitations/${username}/${inviteId}`, {rsvp:'accept'}, 'put')
			return res
		}catch(err){
			throw err
		}
	}

	static async declineInvite(username, inviteId){
		try{
			let res = await this.request(`events/invitations/${username}/${inviteId}`, {rsvp:'decline'}, 'put')
		}catch(err){
			throw err
		}
	}

	static async createEvent(data){
		try{
			let res = await this.request('events', data, 'post')
			return res
		}catch(err){
			throw err
		}

	}

	static async getAllEventInfo(id){
		try{
			let res = await this.request(`events/${id}/full`);
			return res
		}catch(err){
			throw err
		}

	}

	static async updateBasicDetails(eventId, data){
		try{
			console.log(data)
			let res = await this.request(`events/${eventId}/basic`, {data}, 'put')
			return res
		}catch(err){
			throw err
		}

	}

	static async inviteGuests(usernames, eventId){
		try{
			let res = await this.request(`events/${eventId}/guests`, {usernames}, 'post')
			return res
		}catch(err){
			throw err
		}

	}

	static async uninviteGuest(username, eventId){
		try{
			let res = await this.request(`events/${eventId}/guests/${username}`, {}, 'delete')
			return
		}catch(err){
			throw err
		}

	}

	static async getGuestList(eventId){
		try{
			let res = await this.request(`events/${eventId}/guests`)
			return res
		}catch(err){
			throw err
		}

	}

	static async addMenuCategory(eventId, newCategory){
		try{
			let res = await this.request(`events/${eventId}/menu/categories`, {newCategory}, 'post')
			return res
		}catch(err){
			throw err
		}

	};

	static async addMenuItem(eventId, newItem){
		try{
			let res = await this.request(`events/${eventId}/menu`, {newItem}, 'post')
			return res
		}catch(err){
			throw err
		}

	}

	static async removeDish(dishId, eventId){
		try{
			let res = await this.request(`dishes/${dishId}`, {}, 'delete')
			return
		}catch(err){
			throw err
		}

	}

	static async getEventMenu(eventId){
		try{
			let res = await this.request(`events/${eventId}/menu`)
			return res
		}catch(err){
			throw err
		}

	}

	static async addComment(comment, username, eventId){
		try{
			let res = await this.request(`events/${eventId}/comments`, {comment: comment, author:username}, 'post')
			return res
		}catch(err){
			throw err
		}

	}

	static async removeComment(commentId, eventId){
		try{
			let res = await this.request(`events/${eventId}/comments/${commentId}`, {}, 'delete')
			return
		}catch(err){
			throw err
		}

	}

	static async getEventComments(eventId) {
		try{
			let res = await this.request(`events/${eventId}/comments`)
			return res
		}catch(err){
			throw err
		}

	}

	static async getConnections(username){
		try{
			let res = await this.request(`users/${username}/connections`)
			return res
		}catch(err){
			throw err
		}

	}

	static async createConnectionRequest(fromUsername, toUsername){
		try{
			let res = await this.request(`users/${fromUsername}/connections/requests`, { 'toUsername' : toUsername}, 'post')
			return
		}catch(err){
			throw err
		}

	}

	static async getPotentialConnections(input){
		try{
			let res = await this.request(`users/find/${input}`)
			return res
		}catch(err){
			throw err
		}

	}

	static async getConnectionRequests(username){
		try{
			let res = await this.request(`users/${username}/connections/requests`);
			return res
		}catch(err){
			throw err
		}

	}

	static async acceptConnectionRequest(id, curUsername){
		try{
			let res = await this.request(`users/${curUsername}/connections/requests/${id}`, {}, 'put')
			return
		}catch(err){
			throw err
		}

	}

	static async deleteConnectionRequest(id, curUsername){
		try{
			let res = await this.request(`users/${curUsername}/connections/requests/${id}`, {}, 'delete')
			return
		}catch(err){
			throw err
		}

	}

	static async getUserProfile(username){
		try{
			const res = await this.request(`users/${username}/profile`)
			return res
		}catch(err){
			throw err
		}

	}

	static async getUserInfo(username) {
		try{
			const res = await this.request(`users/${username}`)
			return res
		}catch(err){
			throw err
		}

	}

	static async editUser(username, data) {
		try{
			const res = await this.request(`users/${username}`, data, 'patch')
		}catch(err){
			throw err
		}

	}

	static async updatePassword(data) {
		try{
			const res = await this.request(`users/${data.username}/password`, data, 'patch')
			return res
		}catch(err){
			throw err
		}

	}

	static async checkUsernameExists(username){
		try{
			const res = await this.request(`auth/check/username`, {username:username}, 'get')
			return res
		}catch(err){
			throw err
		}

	};
	
	static async checkEmailExists(email){
		try{
			const res = await this.request(`auth/check/email`, {email:email}, 'get')
			return res
		}catch(err){
			throw err
		}

	}
}
export default G4GApi