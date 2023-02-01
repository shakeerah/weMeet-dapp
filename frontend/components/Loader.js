import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";


export default function Loader () {

  return (
    <div className="w-full h-full p-3 backdrop-blur-sm bg-white/30 flex place-content-center place-items-center">
      <div className="w-36 h-36 mt-20 flex bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('/images/preloader_icon.gif')" }}>
    </div>
   </div>
  );
}
