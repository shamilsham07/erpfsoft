import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="w-full h-full inset-0 opactiy-3 fixed justify-center items-center flex">
 
      <ScaleLoader 
        color="blue"
        cssOverride={{
          
         
          margin: "0 auto",
          borderColor: "blue",
        }}
        size={50}
      />
    </div>
  );
}
