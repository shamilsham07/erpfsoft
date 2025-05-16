import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/login/login";
import "./App.css";
import Usersignup from "./components/login/usersignup";
import Home from "./components/home/home";
import Nav from "./components/home/nav";
import Staffs from "./components/home/staffs";
import AddExcel from "./components/home/excelimport";
import Addstaff from "./components/home/addstaff";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/usersignup" element={<Usersignup />} />
          <Route path="/" element={<Home />} />
          <Route path='/nav' element={<Nav/>}/>
          <Route path='/staff' element={<Staffs/>}/>
          <Route path='/AddExcel' element={<AddExcel/>}/>
          <Route path='/Addstaff' element={<Addstaff/>}/>
          <Route path='/Addstaff/:id' element={<Addstaff/>}/>





        </Routes>
      </Router>
    </>
  );
}

export default App;
