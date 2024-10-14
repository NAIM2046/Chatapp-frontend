import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Left from "./Home/Left/Left";
import Right from "./Home/Right/Right";
import Logout from "./Home/Left1/Logout";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Logout></Logout>
        <Left></Left>
        <Right></Right>
      </div>
    </>
  );
}

export default App;
