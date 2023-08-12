"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image";

const CustomButton = ({title, containerStyles, handleClick, btnType, textStyles, rightIcon, isDisabled}: CustomButtonProps) => {
  return (
    <button
        disabled= {false} //At first, hard code it as {false}, make it dynamic later
        type= {btnType} //At first, hard code it as a string {'button'}, make it dynamic later
        className={`custom-btn ${containerStyles}`} //At first, hard code it as {`custom-btn`}, add dynamic classes later
        onClick={handleClick} // At first, hard code an empty function as {() => {}}. Handle it later
        
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        
        {/* If rightIcon prop exists, render the below image */}
        {rightIcon && (
          <div className="relative w-6 h-6">
            <Image 
            src={rightIcon}
            fill
            className="object-contain"
            alt="right-arrow" />
          </div>
        )}
    </button>
  )
}

export default CustomButton