import React from "react";
import team from "../../assets/team.jpg";
import teams from "../../assets/teams.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="pt-4 bg-primary h-auto mb-4 flex flex-col text-[0.8rem] md:flex-row md:justify-between min-h-[400px]">
        <div className="text-justify text-white px-4">
          <h1 className="pl-3 text-4xl">Who we are ?</h1>
          <p className="text-[1rem] my-6 leading-7 md:w-4/5">
            The Happy Reader is a recognised leader in enabling future ways of
            working. Our talented people operate with high energy to unleash our
            collective entrepreneurial potential to deliver great things for our
            clients.
          </p>
        </div>
        <div className="w-full  md:min-w-[400px] max-h-[400px]">
          <img
            src={team}
            alt="group of people working in laptop"
            className="w-full h-full md:min-w-[280px]"
          />
        </div>
      </div>

      <div className="flex flex-col mb-4 md:flex-row min-h-[400px]">
        <div className="w-full md:min-w-[400px] max-h-[400px]">
          <img
            src={teams}
            alt="3 people discussing by looking at laptop"
            className="w-full h-full"
          />
        </div>
        <div className="px-4 text-justify">
          <h1 className=" text-4xl mt-4 ">Our Details</h1>
          <p className="text-[1rem] my-6 leading-7 md:w-4/5">
            We are fortunate enough to have a team of brilliant people across
            the globe, who bring energy, a down to earth approach and relentless
            commitment to lead our customers to develop the skills, behaviours
            and capabilities to ensure their business performance. We have great
            clients who largely come to us via referral, making our reputation
            our most valuable asset.
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(AboutUs);
