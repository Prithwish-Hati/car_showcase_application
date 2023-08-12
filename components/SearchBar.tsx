"use client"; //For using event handlers like onSubmit

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react"; //For handling states for currently chosen manufacturer

import { SearchManufacturer } from ".";

//<SearchButton/> is used only in Searchbar
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //To prevent the default action on submitting form which is to refresh the webpage

    if (manufacturer === "" && model === "") {
      return alert("Please fill in the search bar");
    }

    updateSearchParams(
      model.toLowerCase(),
      manufacturer.toLowerCase()
      )
  };


  //To update the URL
  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search); //Stores the existing URLSearchParams, if any

    if (model) {
      searchParams.set("model", model); // For adding model name in searchParams
    } else {
      searchParams.delete("model"); // For deleting the previous model in searchParams when model doesn't exist
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`; //Pre-existing pathname?searchParams

    router.push(newPathName, {scroll: false});
  };

  return (
    <form onSubmit={handleSearch} className="searchbar">
      <div className="searchbar__item">
        {/* Combo-box Component that autocompletes search term with the pre-existing array */}
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          //To change the model use types
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
