import G4GApi from "../G4GApi"
import { parse,format } from 'date-fns'
import dayjs from "dayjs"

class EventServices {
	static async getUpcoming(username) {
		const res = await G4GApi.getUpcomingEvents(username)
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

		console.log(data)

		const res = await G4GApi.createEvent(data, username)
		console.log(res)
		return res
	}

	static async getEventInfo(eventId) {
		return (
			{
				id: '1',
				title: 'Thanksgiving Throw Down',
				host: 'jimmy43',
				date: 'Thursday, November 23, 2023',
				location: 'Jimmy\'\s place',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				menu: [
					{
						courseName: 'Appetizers',
						items: [
							{
								name: 'Pigs In a Blanket',
								description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								user: 'sally_r'
							},
							{
								name: 'Chicken Nuggest',
								description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								user: 'joey'
							}
						]
					},
					{
						courseName: 'Meat',
						items: [
							{
								name: 'Lemon Pepper Chicken',
								description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								user: 'nelly_armstrong'
							}
						]
					},
					{
						courseName: 'Veggies',
						items: [
							{
								name: 'Asparagus',
								description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								user: 'assface123'
							}
						]
					}
				],
				guests: [
					{
						username: 'sally_r',
						rsvp: 'Attending'
					},
					{
						username: 'joey',
						rsvp: 'Attending'
					},
					{
						username: 'nelly_armstrong',
						rsvp: 'Attending'
					},
					{
						username: 'assface123',
						rsvp: 'Attending'
					},
					{
						username: 'jack',
						rsvp: 'Not Attending'
					},
					{
						username: 'off',
						rsvp: 'TBD'
					}
				],
				comments: [
					{
						username: 'sally_r',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					},
					{
						username: 'assface123',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					},
					{
						username: 'nelly_armstrong',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					}
				]
			}
		)
	}
}

export default EventServices