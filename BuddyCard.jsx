import {Heart} from "./Heart";
import Cookies from 'js-cookie';
import Link from 'next/link';

const BuddyCard = ({fname, lname, title, languages, description, hourlyRate, trialRate, id, photoURL}) => {

  const handleClick = () => {
    Cookies.set("otherUserID", id);
  }

  return (
    <>
      <div className="cardWidth pt-6 justify-center">
        <div className="relative w-1/2 shadow-lg darkColor rounded-lg md:rounded-lg lg:rounded-lg p-4 flex flex-col justify-between leading-normal">
          <div className="inline-block ml-4 mr-9 text-center ">
            <img
              className="w-24 h-24 rounded-full mb-4 "
              src={photoURL ? photoURL : '/noProfilePic.png'}
              alt={`Photo of ${fname} ${lname}`}
            />
            <p className="text-yellow-300 mb-4">Rating 1-5</p>
            <p className="text-sm mb-4 text-white"># of Lessons</p>
            <div className="rounded-md shadow">
            <Link href={`/buddy/${id}`}>
            <button onClick={handleClick}
                className="w-full flex items-center justify-center border border-transparent text-base font-small rounded-md text-white bg-orange hover:bg-red-700  md:text-md "
              >
                Meet
            </button>
            </Link>
            </div>
          </div>
          
          <div className="mb-8">
            <div className=" text-white flex-wrap font-bold text-xl mb-2">
              {fname} {lname} 
            </div>
            <div className="absolute top-4 right-6 heart"><Heart /></div>
            <p className=" left-6 text-md text-white mb-3">
              {title}
            </p>
            {/* Cap at 5 languages */}
            <p className="text-md text-white mb-3">
              {languages}
            </p>
            <p className="text-white text-base">
              {description}
            </p>
            {/* if userTitle = Teacher display following: */}
            {/* <div className="flex items-center grid grid-flow-col mt-5">
              <div>
                <p className="text-white leading-none">Hourly Rate</p>
                <p className="text-white">${hourlyRate}</p>
              </div>
              <div>
                <p className="text-white">Trial Rate</p>
                <p className="text-white">${trialRate}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
     
    </>
  );
};

export default BuddyCard;


