import G4GApi from "../G4GApi"
import { parse,format } from 'date-fns'
import dayjs from "dayjs"
import Format from "../../utilities/format"

class EventServices {
	static async getUpcoming(username) {
		try{
			const res = await G4GApi.getUpcomingEvents(username)
			const events = res.data.events

			if(events){
				events.upcoming.forEach(e => {
					const date = new Date(e.date)
					e.date = format(date, 'EEE, MMM d')
					if(e.startTime){
						const parsedTime = parse(e.startTime, 'HH:mm:ss', new Date());
						e.startTime = format(parsedTime, 'h:mm a');
					}
				});
			}
			return events
		}catch(err){
			throw err
		}
	}

	static async getHosting(username) {
		try{
			const res = await G4GApi.getHostingEvents(username)
			const events = res.data.events
	
			if(events){
				events.forEach(e => {
					const date = new Date(e.date)
					e.date = format(date, 'EEE, MMM d')
					if(e.startTime){
						const parsedTime = parse(e.startTime, 'HH:mm:ss', new Date());
						e.startTime = format(parsedTime, 'h:mm a');
					}
				});
			}
	
			return events
		}catch(err){
			throw err
		}
	}

	static async createEvent(data, username) {
		try{
			for(let key in data){
				if(data[key] === '') delete data[key]
			};
			data.date = dayjs(data.date).format('YYYY-MM-DD');
			if(data.startTime) data.startTime = dayjs(data.startTime).format('HH:mm:ss');
			if(data.endTime) data.endTime = dayjs(data.endTime).format('HH:mm:ss')
			const res = await G4GApi.createEvent(data, username)
			return res
		}catch(err){
			throw err
		}
	};

	static async updateBasicDetails(data) {
		const eventId = data.id;
		console.log(eventId)
		data.date = dayjs(data.date).format('YYYY-MM-DD');
		if(data.startTime) data.startTime = dayjs(data.startTime).format('HH:mm:ss');
		if(data.endTime) data.endTime = dayjs(data.endTime).format('HH:mm:ss');

		try{
			console.log(data)
			const res = await G4GApi.updateBasicDetails(eventId, data)
			const eventInfo = res.data.event;
			eventInfo.date = Format.displayDate(eventInfo.date);
			eventInfo['displayTime'] = Format.displayTime(eventInfo.startTime, eventInfo.endTime);
			return eventInfo;
		}catch(err){
			throw err
		};
	};

	static async getEventMenu(eventId){
		try{
			const res = await G4GApi.getEventMenu(eventId)
			return res.data.menu
		}catch(err){
			throw err
		}

	};

	static async getEventInfo(eventId) {
		try{
			const res = await G4GApi.getAllEventInfo(eventId)
			const eventInfo = res.data.event;
			if(!eventInfo) return
			eventInfo.date = Format.displayDate(eventInfo.date);
			eventInfo['displayTime'] = Format.displayTime(eventInfo.startTime, eventInfo.endTime)
			return eventInfo
		}catch(err){
			throw err
		}

	};

	static async getPotentialInvites (currentGuestList, username) {
		try{
			const connectionsRes = await G4GApi.getUserConnections(username)
			const connections = connectionsRes.data.connections
			if(!connections) return null
			const seenGuestSet = new Set();
			currentGuestList.map(g => seenGuestSet.add(g.username))
	
			const potentialInvites = connections.filter( c => {
				if(!seenGuestSet.has(c.username)){
					seenGuestSet.add(c.username)
					return c.username
				} 
			})
			return potentialInvites
		}catch(err){
			throw err
		}

	};

	static async uninvitedConnections (username, eventId) {
		try{
			const connectionsPromise = G4GApi.getUserConnections(username);
			const currentGuestsPromise = G4GApi.getGuests(eventId);
			const [ connectionsRes, currentGuestsRes ] = 
				await Promise.all([connectionsPromise, currentGuestsPromise]);
			const connections = connectionsRes.connections;
	
			const currGuestSet = new Set();
			currentGuestsRes.guests.map(g => currGuestSet.add(g.username))
	
			return connections ? connections.map( c => {
				if(!currGuestSet.has(c.username)) return c
			}) : null
		}catch(err){
			throw err
		}


	}

	static async inviteGuests(guestUsernames, eventId) {
		try{
			const res = await G4GApi.inviteGuests(guestUsernames, eventId)
			return res.data.guests
		}catch(err){
			throw err
		}

	}

	static async uninviteGuest(username, eventId){
		try{
			const uninviteRes = await G4GApi.uninviteGuest(username, eventId)
			const guestListRes = await G4GApi.getGuestList(eventId)
			return guestListRes.data.guests
		}catch(err){
			throw err
		}

	}

	static async addMenuCategory(eventId, newCategory){
		try{
			const res = await G4GApi.addMenuCategory(eventId, newCategory)
			return res.data.menu
		}catch(err){
			throw err
		}

	};

	static async addMenuItem(eventId, newItem){
		try{
			const res = await G4GApi.addMenuItem(eventId, newItem);
			return res.data.menu
		}catch(err){
			throw err
		}

	}

	static async removeMenuItem(dishId, eventId) {
		try{
			await G4GApi.removeMenuItem(dishId, eventId)
			const updatedMenu = await this.getEventMenu(eventId)
			return updatedMenu
		}catch(err){
			throw err
		}

	}

	static async addComment(comment, username, eventId){
		try{
			const res = await G4GApi.addComment(comment, username, eventId)
			return res.data.comments
		}catch(err){
			throw err;
		};

	};

	static async removeComment(commentId, eventId){
		try{
			await G4GApi.removeComment(commentId, eventId);
			const updatedComments = await G4GApi.getEventComments(eventId)
			return updatedComments.data.posts
		}catch(err){
			throw err;
		};

	}

	static async updateRsvp(username, rsvpId, rsvp){
		try{
			const res = await G4GApi.updateRsvp(username, rsvpId, rsvp)
			return res.data
		}catch(err){
			throw err
		};
	};

	static async getGuestList(eventId){
		try{
			const res = await G4GApi.getGuestList(eventId)
			return res.data.guests
		}catch(err){
			throw err
		}
	}

	static async acceptInvitation(username, id) {
		try{
			const res = await G4GApi.acceptInvite(username, id);
			return res.status
		}catch(err){
			throw(err)
		};
	};

	static async declineInvitation(username, id) {
		try{
			const res = await G4GApi.declineInvite(username, id)
			return res
		}catch(err){
			throw(err)
		};
	};

};

export default EventServices;