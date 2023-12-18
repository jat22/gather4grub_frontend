

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

	static varNameToDisplay (name) {
		let formatted = ''
		for(let i = 0; i < name.length; i++){
			if(i === 0){
				formatted += name[i].toUpperCase()
			} else if(name[i] === name[i].toUpperCase()){
				formatted += ` ${name[i]}`
			} else {
				formatted += name[i]
			}
		}
		return formatted
	}

	static emptyStringToNull (data) {
		const fields = Object.keys(data);
		fields.forEach(f => {
			if(data[f] === ''){
				data[f] = null
			}
		})
		return data
	}
	
	static stateMap = {
		"Alabama": "AL",
		"Alaska": "AK",
		"American Samoa": "AS",
		"Arizona": "AZ",
		"Arkansas": "AR",
		"California": "CA",
		"Colorado": "CO",
		"Connecticut": "CT",
		"Delaware": "DE",
		"District of Columbia": "DC",
		"Florida": "FL",
		"Georgia": "GA",
		"Guam": "GU",
		"Hawaii": "HI",
		"Idaho": "ID",
		"Illinois": "IL",
		"Indiana": "IN",
		"Iowa": "IA",
		"Kansas": "KS",
		"Kentucky": "KY",
		"Louisiana": "LA",
		"Maine": "ME",
		"Maryland": "MD",
		"Massachusetts": "MA",
		"Michigan": "MI",
		"Minnesota": "MN",
		"Mississippi": "MS",
		"Missouri": "MO",
		"Montana": "MT",
		"Nebraska": "NE",
		"Nevada": "NV",
		"New Hampshire": "NH",
		"New Jersey": "NJ",
		"New Mexico": "NM",
		"New York": "NY",
		"North Carolina": "NC",
		"North Dakota": "ND",
		"Northern Mariana Islands": "MP",
		"Ohio": "OH",
		"Oklahoma": "OK",
		"Oregon": "OR",
		"Pennsylvania": "PA",
		"Puerto Rico": "PR",
		"Rhode Island": "RI",
		"South Carolina": "SC",
		"South Dakota": "SD",
		"Tennessee": "TN",
		"Texas": "TX",
		"Utah": "UT",
		"Vermont": "VT",
		"Virgin Islands": "VI",
		"Virginia": "VA",
		"Washington": "WA",
		"West Virginia": "WV",
		"Wisconsin": "WI",
		"Wyoming": "WY"
	}
}

export default Format