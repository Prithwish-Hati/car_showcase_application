"use client";

import Image from "next/image";
import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react"; //Dialog is the Popup that has car details

import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModel: () => void; //Function that doesn't return anything
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModel, car }: CarDetailsProps) => {
  return (
    <>
      {/*
    appear tag means that the transition is gonna show up
    show tag defines when the transition will be shown
    */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModel}>
          {/* Backdrop of <Transition> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" //entering transition
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200" //leaving transition
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Actual Dialog Box */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" //entering transition
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100" //scale 95 to 100 makes the dialog expanding
                leave="ease-in duration-200" //leaving transition
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  {/* Popup closing button */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModel}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  {/* Content of the Pop-up */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src= {generateCarImageUrl(car)}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src= {generateCarImageUrl(car, '29')}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src= {generateCarImageUrl(car, '33')}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src= {generateCarImageUrl(car, '13')}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {/* Object.entries() returns an array of key/values of the enumerable properties of an object */}
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={key}
                        >
                          <h4 className="text-grey capitalize">
                            {/* Converts city_mpg to city mpg */}
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-black-100 font-semibold capitalize">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
