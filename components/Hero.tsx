"use client"; //Because we need to handle clicks

import Image from "next/image";

import { CustomButton } from ".";


const Hero = () => {
  const handleScroll = () => {

  }

  return (
    <div className="hero">
      <div className=" flex-1 pt-36 padding-x">
        <h1 className="hero__title">
            Find, Book or Rent a Car - Quickly and Easily!
        </h1>

        <p className="hero__subtitle">
            Streamline your car rental experience with our effortless booking process.
        </p>

        {/* Reusable Button that will be used across the app */}
        <CustomButton
          title= "Explore Cars"
          containerStyles= "bg-primary-blue text-white rounded-full mt-10"
          handleClick = {handleScroll} //This will handle all clickings
        />
      </div>

      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="Hero" fill className="object-contain"/>
          </div>
          <div className="hero__image-overlay"/>
        
      </div>
    </div>
  );
};

export default Hero;
