import React, { useContext } from 'react';
import LandingHero from '../components/landing/LandingHero'
import InfoHighlight from '../components/landing/InfoHighlight';
import UserContext from '../context/UserContext';


const buttons= [{text: "SignUp", route: '/signup'}, {text:"Login", route: '/login'}]
const infoPoints = [
	{
		title: "Gather",
		description: `"Friendship, like wine, gives its fragrance in the gathering of dear friends." - Rumi`
	},
	{
		title: "Grub",
		description: `"One cannot think well, love well, sleep well, if one has not dined well." - Virginia Woolf`
	},
	{
		title: "Connection",
		description: `"Alone, we can do so little; together, we can do so much." - Helen Keller`
	}
]
 
const coverImage = 'https://cdn.pixabay.com/photo/2016/11/23/13/45/celebration-1852926_1280.jpg'

const Landing = ()=>{
	const { user } = useContext(UserContext);

	return(
		<>
			<LandingHero 
				coverImage={coverImage}
				buttons={!user.username ? buttons : null}
			/>
			<InfoHighlight infoPoints={infoPoints} />
		</>
	);
}

export default Landing;