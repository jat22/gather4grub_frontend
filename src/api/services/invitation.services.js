import G4GApi from "../G4GApi"
import { format } from 'date-fns'


class InvitationServices{
	static async getInvites(username) {
		const res = await G4GApi.getUserInvitations(username);
		const invites = res.data.invitations
		if(invites){
			invites.forEach(i => {
				const date = new Date(i.date)
				i.date = format(date, 'EEE, MMM d, yyyy')
			})
			return invites
		}
		
	}

	static async accept(id){

	}

	static async decline(id){

	}
}

export default InvitationServices