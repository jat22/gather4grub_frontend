

class Format {
	static displayDate(databaseDate) {
		if(!databaseDate) return null;
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
		const date = new Date(databaseDate);
		const dayOfWeek = daysOfWeek[date.getUTCDay()];
		const month = months[date.getUTCMonth()];
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();
	
		return `${dayOfWeek}, ${month} ${day}, ${year}`;
	}

	static displayTime(startTime, endTime) {
		if(!startTime) return null;
		const displayStartTime = this.createDisplayTime(startTime);
		const displayEndTime = this.createDisplayTime(endTime);
		
		if(!displayEndTime){
			return displayStartTime
		} else {
			return `${displayStartTime} until ${displayEndTime}`
		}
	}
	
	static createDisplayTime (time){
		if(!time) return null;
		const [hour, minutes] = time.split(':').map(Number)

		const date = new Date();
		date.setHours(hour);
		date.setMinutes(minutes);

		const formatted = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true})

		return formatted.toLowerCase();
	}

}

export default Format