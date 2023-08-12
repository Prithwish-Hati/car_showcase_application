"use client"; //For using Combobox (a client component) and Hooks

import { useState,Fragment } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react"; // Headless UI is a Tailwind CSS UI Component library

import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
  query === ""
    ? manufacturers //When query is Empty shows all manufacturers
    : manufacturers.filter((item) => (
      item.toLowerCase() //makes the 'item' string to small-case
      .replace(/\s+/g, "") //replaces all spaces in 'item' string
      .includes(query.toLowerCase().replace(/\s+/g, "")) // makes the query small case and without spaces to filter better
  ))

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car Logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer} // Catches the input value and displays that value. As using TS, declared the type of input
            onChange={(e) => setQuery(e.target.value)} // To update the input value everytime we change it
          />

          <Transition
            as={Fragment} // By default <Transition> is a specific element but we don't want it as additional DOM element, hence using react Fragment
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')} //This function clears the query
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== "" ? (
                  <Combobox.Option
                    value={query}
                    className="search-manufacturer__option text-red-400"
                  >
                    Manufacturer doesn't exist!
                    {/* When "filteredManufacturers" doesn't exist but "query" exists then give user an option to create a new manufacturer*/}
                  </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                  key={item} //Must have for mapping
                  value={item} //Must have attribute for Combox.Option
                  className={({active}) => `
                  relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'} 
                  `} //Combox.Option uses functions in className attribute to style active(blue bg n white text) and non-active(white bg and black text) options separately
                  >
                   {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )} 
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
