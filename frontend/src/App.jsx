import { useEffect, useState } from "react";
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
import { authenticate } from "./components/redux/reducer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import Wage from "./components/wage/wage";
import Addwage from "./components/wage/addwage";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/loader";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authentication = useSelector((state) => state.auth.isAuthenticated);
  const cookiees = new Cookies();
  const refreshtoken = cookiees.get("refresh");

  const whilereferesh = async () => {
    try {
      console.log("hello");
      console.log("good", cookiees.get("refresh"));
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshtoken }),
      });
      const res = await response.json();
      console.log("item recived", res);
      if (res.access) {
        console.log("Auth", authentication);
        cookiees.set("access", res.access);
        dispatch(authenticate(true));
      } else {
        cookiees.remove("access");
        cookiees.remove("refresh");
        dispatch(authenticate(false));
        navigate("/login");
      }
    } catch (error) {
      print(error);
      cookiees.remove("access");
      cookiees.remove("refresh");
      dispatch(authenticate(false));
    }
  };

  useEffect(() => {
    console.log(refreshtoken, "kkkkk");
    if (refreshtoken) {
      whilereferesh();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={!authentication ? <Login /> : <Home />} />
        <Route path="/usersignup" element={<Usersignup />} />
        <Route path="/loader" element={<Loader />} />

        <Route path="/" element={authentication ? <Home /> : <Login />} />
        <Route path="/nav" element={authentication ? <Nav /> : <Login />} />
        <Route
          path="/staff"
          element={authentication ? <Staffs /> : <Login />}
        />
        <Route
          path="/AddExcel"
          element={authentication ? <AddExcel /> : <Login />}
        />
        <Route
          path="/Addstaff"
          element={authentication ? <Addstaff /> : <Login />}
        />
        <Route
          path="/Addstaff/:id"
          element={authentication ? <Addstaff /> : <Login />}
        />
        <Route path="/wage" element={authentication ? <Wage /> : <Login />} />
        <Route
          path="/addwage"
          element={authentication ? <Addwage /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
