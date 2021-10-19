import BuddyCard from "../components/BuddyCard";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import Floater from "../components/messages/Floater";
import { withProtected } from "../components/auth/routes";
import Layout from '../components/layout/Layout';

const fcb = () => {
  const [buddyCard, setBuddyCard] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("test")
      .onSnapshot((snapshot) => {
        setBuddyCard(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      <Layout>
        <div className="w-full ">
          <div className="px-7 pt-4">
            <p className="text-2xl text-white">Find the best Buddy for you.</p>
            <p className="text-white">
              Choose from our ever growing list of Buddies!
            </p>
          </div>
          <div className="pl-10 w-11/12 sm:pl-0 sm:w-full">
            {buddyCard.map((card) => (
              <BuddyCard
                name={card.name}
                title={card.title}
                languages={card.languages}
                description={card.description}
                hourlyRate={card.hourlyRate}
                trialRate={card.trialRate}
                fname={card.fname} lname={card.lname} 
                photoURL={card.photoURL}
                id={card.id}
              />
            ))}
          </div>
          <div className="hidden sm:block">
            <Floater />
          </div>
        </div>
     </Layout>
    </>
  );
};

// export default fcb;
export default withProtected(fcb);