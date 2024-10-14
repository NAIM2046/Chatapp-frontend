import React from "react";
import Scarch from "./Scarch";
import Users from "./Users";

const Left = () => {
  return (
    <div className="w-[30%] bg-black text-white">
      <Scarch></Scarch>
      <Users></Users>
    </div>
  );
};

export default Left;
