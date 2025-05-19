import React, { useEffect, useState } from "react";
import "./login.css";
import csrftoken from "../../../csrf";
import image from "../../assets/top-skyscraper-surrounded-with-clouds.jpg";
import image1 from "../../assets/87_home_leaf.jpg";
import { useNavigate } from "react-router-dom";
import back from "../../assets/Vector_2658.jpg";
import Cookies from "universal-cookie";
import { authenticate } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const cookies = new Cookies();
  const authenticates = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch("");
  const [whichtype, setwhichtype] = useState(true);

  const [icon, seticon] = useState(true);
  const navigate = useNavigate();
  console.log("jabar ikka", cookies.get("refresh"));
  console.log("jabar mwon", cookies.get("access"));

  const makenull = () => {
    console.log("hi");
    setinputvalues({
      password: "",
      username: "",
    });
  };

  const login = async (e) => {
    console.log("firstssssssss");
    try {
      e.preventDefault();

      console.log("good");
      var username = inputvalues.username;
      var password = inputvalues.password;
      console.log(username, password);
      const body = JSON.stringify({ username, password });
      const result = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });
      const res = await result.json();

      if (res.refresh) {
        console.log(res);
        cookies.set("refresh", res.refresh);
        cookies.set("access", res.access);
        console.log("everything-seeems-good");
        dispatch(authenticate(true));
        makenull();

        navigate("/");
      } else {
        makenull();

        console.log("not-good");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [inputvalues, setinputvalues] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="bg-[#f5f5f5] w-full h-screen flex justify-center items-center">
      <div className="w-[90%] h-[80vh] rounded flex">
        <div className="w-[50%] bg-theme h-full rounded-tl-lg rounded-bl-lg flex justify-center items-center flex-col ">
          <i className="bi bi-journal text-white text-[237px]"></i>
          <h1 className=" text-white text-[65px] font-bold uppercase">
            ERPSOFT
          </h1>
        </div>
        <div className="w-[50%] flex justify-center items-center bg-white rounded-tr-lg rounded-br-lg flex-col">
          <div>
            <h1 className="text-theme text-2xl capitalize font-bold">
              Admin login
            </h1>
          </div>
          <div>
            <p className="text-xs">
              Hey,enter your credential to sign in to your account
            </p>
          </div>
          <form action="" onSubmit={login}>
            <div className="mt-4 border-boshadow p-2 w-[400px] rounded-md flex items-center">
              <i class="bi bi-lock"></i>
              <input
                type="text"
                className="ml-1 placeholder-black placeholder:text-sm px-2 w-full thiis-is-"
                placeholder="Enter Username"
                required
                value={inputvalues.username}
                onChange={(e) => {
                  setinputvalues((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mt-4 border-boshadow p-2 w-[400px] rounded-md flex items-center">
              <i class="bi bi-key"></i>
              <input
                type="password"
                value={inputvalues.password}
                className="ml-1 placeholder-black placeholder:text-sm px-2 w-full thiis-is-"
                placeholder="Enter password"
                required
                onChange={(e) => {
                  setinputvalues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              className="uppercase text-normal text-white bg-theme rounded-lg p-2 w-[400px] mt-4 text-xl"
              type="submit"
            >
              LOGIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
