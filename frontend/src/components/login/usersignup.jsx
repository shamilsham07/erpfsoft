import React from "react";
import image from "../../assets/Automobiel11.jpg";
import { useState } from "react";
import "./login.css";
import csrftoken from "../../../csrf";
export default function Usersignup() {
  const changingFocus = (event) => {
    if (event.key === "Enter") {
      console.log("hi");
      event.preventDefault();
      const number = parseInt(event.target.getAttribute("tabIndex"));
      console.log("number", number);
      const next = document.querySelector(`[tabindex="${number + 1}"]`);
      console.log(next);
      if (next) {
        next.focus();
      }
    } else {
      console.log("you are very bad");
    }
  };

  const [errorpassarray, seterropassarray] = useState({
    enterany: false,
    noCapitaal: false,
    nonumber: false,
    noleter: false,
  });

  const validatepass = (e) => {
    const val = e.targetvalue;

    if (e.target.value == "") {
      seterropassarray((prev) => ({
        ...prev,
        enterany: true,
      }));
    }
    if (e.target.value != "") {
      seterropassarray((prev)=>({
        ...prev,
        enterany:false,
      }))
      if (e.target.value.search(/[a-z]/i) < 0) {
        seterropassarray((prev) => ({
          ...prev,
          noleter: true,
        }));
      } else {
        seterropassarray((prev) => ({
          ...prev,
          noleter: false,
        }));
      }
    }
    if (e.target.value != "") {
      if (e.target.value.search(/[0-9]/) < 0) {
        seterropassarray((prev) => ({
          ...prev,
          nonumber: true,
        }));
      } else {
        seterropassarray((prev) => ({
          ...prev,
          nonumber: false,
        }));
      }
    }

    if (e.target.value != "") {
      if (!/^(?=.*[A-Z]).*$/.test(e.target.value)) {
        seterropassarray((prev) => ({
          ...prev,
          noCapitaal: true,
        }));
      } else {
        seterropassarray((prev) => ({
          ...prev,
          noCapitaal: false,
        }));
      }
    }
  };

  const checkpass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState();
  const [password, setpassword] = useState();
  const [togleicon, settogleicon] = useState(true);
  const [types, settypes] = useState(false);
  const [errors, seterrors] = useState({
    email: false,
    username: false,
    phonenumber: false,
  });
  const iconchanage = () => {
    settogleicon((prev) => {
      console.log(prev);
      if (prev == true) {
        settypes(true);
      } else {
        settypes(false);
      }
      return !prev;
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    if (email == "") {
      seterrors((prev) => ({ ...prev, email: true }));
    }
    if (email != "") {
      if (pattern.test(email)) {
      } else {
        seterrors((prev) => ({ ...prev, email: true }));
      }
    }
    if (username == "") {
      seterrors((prev) => ({ ...prev, username: true }));
    }
    if (username != "") {
      if (/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(username)) {
        console.log("verygood username");
      } else {
        seterrors((prev) => ({ ...prev, username: true }));
      }
    }
    if (phonenumber == "") {
      seterrors((prev) => ({
        ...prev,
        phonenumber: true,
      }));
    }
    if (phonenumber != "") {
      seterrors((prev) => ({ ...prev, phonenumber: false }));
    }

    if (
      errorpassarray.enterany == false &&
      errorpassarray.noCapitaal == false &&
      errorpassarray.noleter == false &&
      errorpassarray.nonumber == false &&
      errors.email == false &&
      errors.phonenumber == false &&
      errors.username == false
    ) {
      console.log("good very good");
      const formdata = new FormData();
      formdata.append("username", username), formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phonenumber", phonenumber);

      const result = await fetch("http://localhost:8000/createaccount", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formdata,
      });
      const res=await result.json()
      if(res.message){
        console.log(res.message)
      }
      else if(res.email){
        console.log(res.email)
      }
      else if(res.phonenumber){
        console.log(res.phonenumber)
      }
      else if(res.error){
        console.log(res.error)
      }
      else{
        console.log("something wrong")
      }
    } else {
      // alert("wrong submittion")
      console.log("bad call");
    }
  };

  return (
    <>
      <div className="bg-black h-screen w-full flex justify-center items-center px-5">
        <div className="grid grid-cols-2  max-w-6xl w-full">
          <div className="h-[600px]  overflow-hidden">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt="Image"
            />
          </div>
          <div className="bg-white h-[600px]  shadow-md">
            <div className="w-full h-full p-4">
              <div className="text-center">
                <h2 className="font-semibold">signup</h2>
              </div>
              <form action="" onSubmit={submit}>
                <div className="px-5 py-10 flex flex-col">
                  <div className="w-full justify-center flex flex-col mt-3">
                    <div className="w-full">
                      <label htmlFor="" className="text-start capitalize">
                        username *
                      </label>
                    </div>
                    <div>
                      <input
                        type="name"
                        name="username"
                        required
                        tabIndex={1}
                        className="border-none bg-gray-200 p-1 w-[80%] rounded-xs"
                        onChange={(event) => {
                          setusername(event.target.value);
                          seterrors((prev) => ({
                            ...prev,
                            username: false,
                          }));
                        }}
                        onKeyDown={changingFocus}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-700">invalid username !</p>
                    )}
                  </div>

                  <div className="w-full justify-center flex flex-col mt-3">
                    <div className="w-full">
                      <label htmlFor="" className="text-start">
                        Email *
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="email"
                        required
                        tabIndex={2}
                        className="border-none bg-gray-200 p-1 w-[80%] rounded-xs"
                        onChange={(event) => {
                          setemail(event.target.value);
                          seterrors((prev) => ({
                            ...prev,
                            email: false,
                          }));
                        }}
                        onKeyDown={changingFocus}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-700">invalid fromat!</p>
                    )}
                  </div>
                  <div className="w-full justify-center flex flex-col mt-3">
                    <div className="w-full">
                      <label htmlFor="" className="text-start capitalize">
                        phonenumber *
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="number"
                        required
                        maxlength="10"
                        tabIndex={3}
                        className="border-none bg-gray-200 p-1 w-[50%] rounded-xs"
                        onChange={(event) => {
                          setphonenumber(event.target.value);
                          seterrors((prev) => ({
                            ...prev,
                            phonenumber: false,
                          }));
                        }}
                        onKeyDown={changingFocus}
                      />
                    </div>
                  </div>
                  <div className="w-full justify-center flex flex-col mt-3">
                    <div className="w-full">
                      <label htmlFor="" className="text-start capitalize">
                        password *
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={types ? "password" : "text"}
                        name="password"
                        required
                        tabIndex={4}
                        value={password}
                        className="border-none bg-gray-200 p-1 w-[50%] rounded-xs"
                        onChange={(e) => {
                          setpassword(e.target.value);
                          validatepass(e);
                        }}
                        onKeyDown={changingFocus}
                      />
                      <i
                        class={`bi ${
                          togleicon ? "bi-eye-slash" : "bi-eye-fill"
                        } absolute eye-icons color-black cursor-pointer`}
                        onClick={() => iconchanage()}
                      ></i>
                    </div>
                    {errorpassarray.enterany && (
                      <p className="text-red-700">
                        not entered anything password !
                      </p>
                    )}
                    {errorpassarray.noCapitaal && (
                      <p className="text-red-700">
                        not entered capital letter password !
                      </p>
                    )}
                    {errorpassarray.noleter && (
                      <p className="text-red-700">
                        not entered any single letter password !
                      </p>
                    )}
                    {errorpassarray.nonumber && (
                      <p className="text-red-700">
                        not entered any single number !
                      </p>
                    )}
                  </div>
                  <div className="text-start mt-3">
                    <button
                      className="p-2 bg-black text-white rounded-md capitalize font-normal cursor-pointer"
                      type="submit"
                    >
                      signup
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
