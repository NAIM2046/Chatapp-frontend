import React from "react";
import ChatUer from "./ChatUer";
import Messages from "./messages";
import TypeSent from "./TypeSent";
import { CiMenuFries } from "react-icons/ci";
const Right = () => {
  return (
    <div className="w-[70%] bg-slate-900 text-white">
      <ChatUer></ChatUer>
      <div
        className=" flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(88vh - 8vh)" }}
      >
        <Messages></Messages>
      </div>

      <TypeSent></TypeSent>
    </div>
  );
};

export default Right;
