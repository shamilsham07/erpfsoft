import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import "./home.css";
import Cookies from "universal-cookie";
import { useState } from "react";
import logo from "../../assets/new-logo.png";
import { authenticate } from "../redux/reducer";
import { useDispatch } from "react-redux";
export default function Nav(title) {
  console.log("i",title)
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [activeclass, setactive] = useState('null');

  const cookies = new Cookies();

  const Handler=(e,item)=> {
    try {
     setactive(item)
      navigation(`/${item}`) 
    } catch (error) {
      console.log("error", error);
    }
  }

  function logout() {
    console.log("jagu");
    cookies.remove("access");
    cookies.remove("refresh");
    dispatch(authenticate(false));
  }

  const goBack = () => {
    console.log("hi");
    navigation(-1);
  };

useEffect(()=>{
  console.log(title.text)
  console.log("thetitle",title)
  setactive(title.text)

},[title])


  return (
    <nav className="">
      <div className="container p-4 px-10 py-2">
        <div className="flex justify-between items-center py-2 px-5 bg-white rounded-lg box-shadows-nav">
          <div className="flex items-center">
            <div className="bg-theme mr-2 flex items-center justify-center p-3 rounded text-white w-[50px] h-[50px]">
              <i className="bi bi-journal text-2xl"></i>
            </div>
            <div>
              <p className="mb-0 text-theme text-xl font-bold  leading-5">
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
                onClick={(e) => {
                  Handler(e, "");
                }}
                className={activeclass == "" ? "active" : ""}
              >
                Dashboard
              </li>
              <li
                onClick={(e) => {
                  Handler(e, "staff");
                }}
                className={activeclass == "staff" ? "active" : ""}
              >
                staff managment
              </li>
              <li
                onClick={(e) => {
                  Handler(e, "Wage");
                }}
                className={activeclass == "wage" ? "active" : ""}
              >
                wage
              </li>
              <li
                onClick={() => {
                  {
                    logout();
                  }
                }}
              >
                {" "}
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
