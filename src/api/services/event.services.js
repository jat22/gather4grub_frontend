import G4GApi from "../G4GApi"
import { parse,format } from 'date-fns'

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
}

export default EventServices