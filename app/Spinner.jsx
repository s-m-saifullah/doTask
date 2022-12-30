import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <div className="w-8 h-8 border-2 border-black rounded-full animate-ping grid place-items-center">
        <div className="w-5 h-5 border-2 border-black rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default Spinner;
