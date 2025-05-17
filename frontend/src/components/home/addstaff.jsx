import React, { useEffect, useState } from "react";
import Nav from "./nav";
import csrftoken from "../../../csrf";
import { ToastContainer, toast } from "react-toastify";
import "./home.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export default function Addstaff() {
  const params = useParams();

  const updatingstaff = async(e) => {
    e.preventDefault();
console.log(name)
console.log(ipno)
const formdata=new FormData()
formdata.append("name",name)
formdata.append("ipno",ipno)
formdata.append("UAN",uan)
formdata.append("aadhar",aadhar)
formdata.append("gender",gender)
formdata.append("accno", accno);
formdata.append("ifsccode", ifsccode);
const result=await fetch("http://localhost:8000/updtaingthestaff",{
  method:"POST",
  headers:{
    "X-CSRFToken": csrftoken,

  },
  body:formdata
})
  };

  const settingvalues = (e) => {
    console.log(e);

    setgender(e.gender);
    setname(e.Name);
    setuan(e.UAN);
    setaadhar(e.aadhar);
    setipno(e.inputnumber);
    setdob(e.dob);
    setdoa(e.doa);
  };

  const [id, setid] = useState();

  const createnull = () => {
    setname("");
    setdoa("");
    setdob("");
    setgender("");
    setipno("");
    setaadhar("");
    setuan("");
    setaccno("");
    setifsccode("");
  };
  const getthedataforupdate = async (e) => {
    console.log("USMAN");

    const result = await fetch("http://localhost:8000/getthedataforupdate", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id }),
    });
    const res = await result.json();
    if (res.data) {
      settingvalues(res.data);
    } else {
      console.log("bad");
    }
  };
  console.log("the", id);

  useEffect(() => {
    if (params.id) {
      setid(params.id);
      getthedataforupdate(params.id);
    }
  }, [params]);

  const [name, setname] = useState("");

  const [ipno, setipno] = useState();
  const [gender, setgender] = useState("");
  const [aadhar, setaadhar] = useState();
  const [uan, setuan] = useState();
  const [accno, setaccno] = useState();
  const[ifsccode,setifsccode]=useState()

  const [doa, setdoa] = useState(null);
  const [dob, setdob] = useState(null);

  const AddStafffunction = async (e) => {
    e.preventDefault();
    console.log("jabar");
    console.log("doa", doa);
    console.log("dob", dob);
    console.log("gender", gender);
    console.log("............................");

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("aadhar", aadhar);
    formdata.append("ipno", ipno);
    formdata.append("gender", gender);
    formdata.append("uan", uan);
    formdata.append("doa", doa);
    formdata.append("dob", dob);
    formdata.append("accno", accno);
    formdata.append("ifsccode", ifsccode);



    const result = await fetch("http://localhost:8000/addstaff", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      body: formdata,
    });
    const res = await result.json();
    if (res.message) {
      console.log("hello shamil");
      toast.success("Staff Add Successfully!", {
        toastClassName: "custom-toast",
      });
      createnull();
    } else {
      createnull();
    }
  };

  return (
    <section className="bg-[#f5f5f5] h-screen">
      <Nav />
      <div className="container p-4 px-10 py-2">
        <ToastContainer />
        <section class="bg-white box-shadows-nav p-6 rounded-md px-4 z-0">
          <h1 className="capitalize text-theme text-2xl font-semibold">
            Create staff
          </h1>
        </section>
        <div className="py-2">
          <section class="bg-white box-shadows-nav p-6 rounded-md px-4 z-0">
            <h2 className="text-black text-sm capitalize font-semibold ">
              staff details :
            </h2>

            <form
              action=""
              className="mt-3 px-5"
              onSubmit={id ? updatingstaff : AddStafffunction}
            >
              <div className="flex gap-3 items-center">
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="" className="text-sm font-normal">
                    Staff Name : *
                  </label>
                  <input
                    type=""
                    placeholder="Enter Staff Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    name="name"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className=" w-[50%]">
                  <label htmlFor="" className="text-sm font-normal">
                    Aadhar : *
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setaadhar(e.target.value)}
                    value={aadhar}
                    name="aadhar"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Staff Phone"
                  />
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="" className="text-sm font-normal">
                    Acc Number : *
                  </label>
                  <input
                    type=""
                    placeholder="Enter Account number"
                    value={name}
                    onChange={(e) => setaccno(e.target.value)}
                    name="acoountnumber"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className=" w-[50%]">
                  <label htmlFor="" className="text-sm font-normal">
                    IFSC code : *
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setifsccode(e.target.value)}
                    value={aadhar}
                    name="ifsccode"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
              <div className="mt-2 flex gap-3 items-center ">
                <div className="w-[50%]">
                  <label htmlFor="" className="text-sm font-normal">
                    IP Number :*
                  </label>
                  <input
                    type="number"
                    name="number"
                    onChange={(e) => setipno(e.target.value)}
                    value={ipno}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="w-[50%]">
                  <label htmlFor="" className="text-sm font-normal">
                    UAN :*
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setuan(e.target.value)}
                    value={uan}
                    name="number"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 w-[100%] flex gap-3">
                <div className="w-[33%]">
                  <label htmlFor="" className="text-sm font-normal">
                    Gender :*
                  </label>
                  <select
                    id="countries"
                    onChange={(e) => setgender(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="M">Male</option>
                    <option value="F">female</option>
                  </select>
                </div>
                {!id && (
                  <div className="w-[33%]">
                    <label htmlFor="" className="text-sm font-normal">
                      Date Of Appointment :*
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setdoa(e.target.value)}
                      value={doa}
                      name="date"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                )}
                {!id && (
                  <div className="w-[33%]">
                    <label htmlFor="" className="text-sm font-normal">
                      DOB :*
                    </label>
                    <input
                      onChange={(e) => setdob(e.target.value)}
                      value={dob}
                      type="date"
                      name="date"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
              <div className="mt-3 w-full">
                {id ? (
                  <button
                    className="w-full bg-green-700 text-white p-2  rounded-md text-md cursor-pointer"
                    type="submit"
                  >
                    update
                  </button>
                ) : (
                  <button
                    className="w-full bg-green-700 text-white p-2  rounded-md text-md cursor-pointer"
                    type="submit"
                  >
                    create Staff
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}
