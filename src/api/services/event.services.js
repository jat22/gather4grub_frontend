import G4GApi from "../G4GApi"
import { parse,format } from 'date-fns'
import dayjs from "dayjs"
import Format from "../../utilities/format"

class EventServices {
	static async getUpcoming(username) {
		const res = await G4GApi.getUpcomingEvents(username)
		const events = res.data.events
		console.log(events)

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
	}

	static async getHosting(username) {
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
	}

	static async createEvent(data, username) {
		for(let key in data){
			if(data[key] === '') delete data[key]
		};
		data.date = dayjs(data.date).format('YYYY-MM-DD');
		if(data.startTime) data.startTime = dayjs(data.startTime).format('HH:mm:ss');
		if(data.endTime) data.endTime = dayjs(data.endTime).format('HH:mm:ss')

		const res = await G4GApi.createEvent(data, username)
		console.log(res)
		return res
	};

	static async updateBasicDetails(eventId, data) {
		const res = await G4GApi.updateBasicDetails(eventId, data)
		return res.data.event
	};

	static async getBasicDetails(eventId) {

	};

	static async getEventMenu(eventId){
		const res = await G4GApi.getEventMenu(eventId)
		return res.data.menu
	};

	static async getEventInfo(eventId) {
		const res = await G4GApi.getAllEventInfo(eventId)
		console.log(res.data.event)
		const eventInfo = res.data.event;
		if(!eventInfo) return
		eventInfo.date = Format.displayDate(eventInfo.date);
		eventInfo['displayTime'] = Format.displayTime(eventInfo.startTime, eventInfo.endTime)

		return eventInfo
	};

	static async getPotentialInvites (currentGuestList, username) {
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
	};

	static async uninvitedConnections (username, eventId) {
		const connectionsPromise = G4GApi.getConnections(username);
		const currentGuestsPromise = G4GApi.getGuests(eventId);
		const [ connectionsRes, currentGuestsRes ] = 
			await Promise.all([connectionsPromise, currentGuestsPromise]);
		const connections = connectionsRes.connections;

		const currGuestSet = new Set();
		currentGuestsRes.guests.map(g => currGuestSet.add(g.username))

		return connections ? connections.map( c => {
			if(!currGuestSet.has(c.username)) return c
		}) : null

	}

	static async inviteGuests(guestUsernames, eventId) {
		const res = await G4GApi.inviteGuests(guestUsernames, eventId)
		return res.data.guests
	}

	static async uninviteGuest(username, eventId){
		const uninviteRes = await G4GApi.uninviteGuest(username, eventId)
		const guestListRes = await G4GApi.getGuestList(eventId)
		return guestListRes.data.guests
	}

	static async addMenuCategory(eventId, newCategory){
		const res = await G4GApi.addMenuCategory(eventId, newCategory)
		return res.data.menu
	};

	static async addMenuItem(eventId, newItem){
		const res = await G4GApi.addMenuItem(eventId, newItem);
		return res.data.menu
	}

	static async removeDish(dishId, eventId) {
		await G4GApi.removeDish(dishId, eventId)
		const updatedMenu = await this.getEventMenu(eventId)
		return updatedMenu
	}

	static async addComment(comment, username, eventId){
		const res = await G4GApi.addComment(comment, username, eventId)
		return res.data.comments
	}

	static async removeComment(commentId, eventId){
		await G4GApi.removeComment(commentId, eventId);
		const updatedComments = await G4GApi.getEventComments(eventId)
		return updatedComments.data.comments
	}
};

export default EventServices;

// {
// 	id: '1',
// 	title: 'Thanksgiving Throw Down',
// 	host: 'jimmy43',
// 	date: 'Thursday, November 23, 2023',
// 	location: 'Jimmy\'\s place',
// 	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
// 	menu: [
// 		{
// 			courseName: 'Appetizers',
// 			items: [
// 				{
// 					name: 'Pigs In a Blanket',
// 					description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
// 					user: 'sally_r'
// 				},
// 				{
// 					name: 'Chicken Nuggest',
// 					description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
// 					user: 'joey'
// 				}
// 			]
// 		},
// 		{
// 			courseName: 'Meat',
// 			items: [
// 				{
// 					name: 'Lemon Pepper Chicken',
// 					description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
// 					user: 'nelly_armstrong'
// 				}
// 			]
// 		},
// 		{
// 			courseName: 'Veggies',
// 			items: [
// 				{
// 					name: 'Asparagus',
// 					description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
// 					user: 'assface123'
// 				}
// 			]
// 		}
// 	],
// 	guests: [
// 		{
// 			username: 'sally_r',
// 			rsvp: 'Attending'
// 		},
// 		{
// 			username: 'joey',
// 			rsvp: 'Attending'
// 		},
// 		{
// 			username: 'nelly_armstrong',
// 			rsvp: 'Attending'
// 		},
// 		{
// 			username: 'assface123',
// 			rsvp: 'Attending'
// 		},
// 		{
// 			username: 'jack',
// 			rsvp: 'Not Attending'
// 		},
// 		{
// 			username: 'off',
// 			rsvp: 'TBD'
// 		}
// 	],
// 	comments: [
// 		{
// 			username: 'sally_r',
// 			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
// 		},
// 		{
// 			username: 'assface123',
// 			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
// 		},
// 		{
// 			username: 'nelly_armstrong',
// 			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
// 		}
// 	]
// }
// )
// }