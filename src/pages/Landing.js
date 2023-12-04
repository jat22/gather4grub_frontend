import React, { useContext } from 'react';
import PageHero from '../components/PageHero';
import InfoHighlight from '../components/InfoHighlight';
import UserContext from '../context/UserContext';


const buttons= [{text: "SignUp", route: '/signup'}, {text:"Login", route: '/login'}]
const infoPoints = [
  {
    title: "Gathering",
    description: "Bring your friends and family together"
  },
  {
    title: "Grub",
    description: "Share your favorite recipes and what see what everyone is bringing."
  },
  {
    title: "Connection",
    description: "Connect with others through to plan gatherings in the future."
  }
]
 
const coverImage = 'https://cdn.pixabay.com/photo/2016/11/23/13/45/celebration-1852926_1280.jpg'

const Landing = ()=>{

  const { user } = useContext(UserContext)



  return(
    <>
      <PageHero 
        coverImage={coverImage}
        header="For Whenever There's Grub at a Gathering"
        subHeader="Plan your next gathering now!"
        buttons={!user.username ? buttons : null}
      />
      <InfoHighlight
        infoPoints={infoPoints} />
    </>
  )
  
  

}

export default Landing;