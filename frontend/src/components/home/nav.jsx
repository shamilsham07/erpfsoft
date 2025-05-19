import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./home.css";
import Cookies from "universal-cookie";
import logo from "../../assets/new-logo.png";
import { authenticate } from "../redux/reducer";
import { useDispatch } from "react-redux";
export default function Nav() {
  const dispatch=useDispatch()
  const cookies=new Cookies()
  
  function logout() {
    console.log("jagu");
    cookies.remove("access")
    cookies.remove("refresh")
    dispatch(authenticate(false))

  }

  const navigation = useNavigate();
  const location = useLocation();
  const goBack = () => {
    console.log("hi");
    navigation(-1);
  };

  const getActiveNav = () => {
    const path = location.pathname;
    if (path === "/") {
      return "dashboard";
    }
    if (path === "/AddExcel") {
      return "staff";
    }
    if (path === "/Addstaff") {
      return "staff";
    }
    if (path === "/addwage") {
      return "wage";
    }
    return path.replace("/", "");
  };

  const activeNav = getActiveNav();

  const handleClick = (e) => {
    navigation(e === "dashboard" ? "/" : `/${e}`);
  };

  return (
    <nav className="">
      <div className="container p-4 px-10 py-2">
        <div className="flex justify-between items-center py-2 px-5 bg-white rounded-lg box-shadows-nav">
          <div className="flex items-center">
            <div className="bg-theme mr-2 flex items-center justify-center p-3 rounded text-white w-[50px] h-[50px]">
              <i className="bi bi-journal text-2xl"></i>
            </div>
            <div>
              <p className="mb-0 text-theme text-xl font-bold mb-0 leading-5">
                ERPSOFT
              </p>
              <p className="text-sm mb-0">Staff Payroll</p>
            </div>
            <div className="flex gap-1 ml-2 ">
              <i
                class="bi bi-arrow-left-circle text-theme text-2xl"
                onClick={() => goBack()}
              ></i>
              <i class="bi bi-arrow-right-circle text-theme text-2xl"></i>
            </div>
          </div>
          <div>
            <ul className="flex text-black gap-5 font-normal text-sm items-center">
              <li
                className={activeNav === "dashboard" ? "activenav" : ""}
                onClick={() => handleClick("dashboard")}
              >
                Dashboard
              </li>
              <li
                className={activeNav === "staff" ? "activenav" : ""}
                onClick={() => handleClick("staff")}
              >
                Staff Management
              </li>
              <li
                className={activeNav === "wage" ? "activenav" : ""}
                onClick={() => handleClick("wage")}
              >
                Wage
              </li>
              <li
                className={activeNav === "logout" ? "activenav" : ""}
                onClick={() => {
                  // handleClick("logout");
                  logout();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
