import React, { useEffect, useState } from "react";
import "./home.css";
import csrftoken from "../../../csrf";
import { useNavigate } from "react-router-dom";
import usericon from "../../assets/team.png";
import cards from "../../assets/credit-cards.png";
import salaryicon from "../../assets/salary.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import logo from "../../assets/new-logo.png";
import Nav from "./nav";
import * as XLSX from "xlsx";
import AddExcel from "./excelimport";
import Addstaff from "./addstaff";

export default function Staffs() {
  const [searchvalue, setSearchvalue] = useState([]);
  








  const navigation = useNavigate();
  const [modalactive, setmodalactive] = useState(false);
  const [excelishere, setexcelishere] = useState(null);
  const [selectedids, setselectedids] = useState([]);
  const [data, setdata] = useState([]);
  const [filtdata, setfilterdata] = useState([]);


  const gotoupdatepage=(e)=>{
    console.log(e)
navigation(`/Addstaff/${e}`)
  }



  const searching = (e) => {
    console.log("hioi");
    console.log(e.target.value);

    const result = data.filter((obj) => {
      return obj.Name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setfilterdata(result);
    console.log("result", filtdata);
  };

  const selected = (id) => {
    console.log(selectedids);
    setselectedids((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const convertExcelDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + serial * 86400000);
  };

  const getdata = async () => {
    const res = await fetch("http://localhost:8000/getdata", {
      method: "GET",
    });
    const result = await res.json();
    if (result.data) {
      console.log("good");
      setdata(result.data);
      setfilterdata(result.data)
      console.log(result.data);
    } else if (result.wrong) {
      console.log("bad");
    } else if (result.error) {
      console.log("not good");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const savefile = async (datas) => {
    console.log("ghsgddauiogljhjiuiuihgi");
    console.log(datas);
    const result = await fetch("http://localhost:8000/savefile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: datas }),
    });
  };

  const handlefunction = () => {
    console.log("good");
    console.log(excelishere);
    if (excelishere) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        const dateFields = [
          "Date of Appointment (DD/MM/YYYY)Eg : 01/01/1970",
          "Date of Birth (DD/MM/YYYY) Eg : 01/01/1970",
        ];

        const formattedData = rawData.map((item) => {
          const newItem = { ...item };
          dateFields.forEach((field) => {
            const value = newItem[field];
            if (typeof value === "number") {
              newItem[field] =
                convertExcelDate(value).toLocaleDateString("en-GB");
            }
          });
          return newItem;
        });

        setdata(formattedData);
        console.log("j", formattedData);
        savefile(formattedData);
      };
      reader.readAsBinaryString(excelishere);
      setmodalactive(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-full h-[screen] m-0 p-0">
      <Nav />
      <div className="container  px-10  relative">
        {modalactive && (
          <div className="absolute flex justify-center items-center w-full">
            <div
              id="hs-basic-modal"
              className=" z-50 flex items-center justify-center   bg-opacity-50 transition-opacity duration-500"
              role="dialog"
            >
              <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      Excel
                    </h3>
                    <button
                      type="button"
                      onClick={() => setmodalactive(false)}
                      className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400"
                      aria-label="Close"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto">
                    <form>
                      <input
                        type="file"
                        name="file-input-medium"
                        id="file-input-medium"
                        class="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:text-neutral-400
      file:bg-gray-50 file:border-0
      file:me-4
      
      file:py-3 file:px-4
      w-[500px]
      dark:file:bg-neutral-700 dark:file:text-neutral-400"
                        accept=".xlsx,.xls"
                        onChange={(event) => {
                          setexcelishere(event.target.files[0]);
                        }}
                      />
                    </form>
                  </div>
                  <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => setmodalactive(false)}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handlefunction()}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="bg-white box-shadows-nav p-6 rounded-md px-4 z-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold capitalize text-[#3f1d95] text-2xl">
                Staffs Management
              </h2>
            </div>

            <div className="flex justify-center items-center gap-2">
              <h3 className="text-sm">
                Total Members : <span className="font-bold">{data.length}</span>
              </h3>
              <button
                className="bg-[#3f1d95] px-4 py-1 text-white  text-sm capitalize"
                onClick={() => navigation("/Addstaff")}
              >
                Add staff
              </button>
              <button
                className="bg-green-900 px-4 py-1 text-white text-sm capitalize"
                type="button"
                onClick={() => navigation("/AddExcel")}
              >
                Import excel
              </button>
            </div>
          </div>
        </section>
        <section className="box-shadows-nav bg-white rounded-sm p-6 px-4 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex bg-green-800 gap-2 px-4 py-1 text-white text-sm">
                <i class="bi bi-file-excel"></i>
                <h3 className="capitalize">excel</h3>
              </div>
            </div>
            <div>
              <h3 className="text-black text-sm">
                Displayed Members:{" "}
                <span className="font-bold">{data.length}</span>
              </h3>
            </div>
            <div className="gap-1 flex items-center">
              <label htmlFor="" className="text-black font-normal text-sm">
                Search :
              </label>
              <input
                type="text"
                placeholder="Search By Name"
                onChange={(e) => {
                  searching(e);
                }}
                className="shadow-for-inputs p-1 rounded-sm"
              />
            </div>
          </div>
          <div className="mt-3">
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead className=" text-white ">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-sm font-normal   uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                          >
                            SI No
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-sm font-normal bg-[#3f1d95] uppercase  dark:text-neutral-500  border-x-3 border-white"
                          >
                            Action
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-sm font-normal bg-[#3f1d95] uppercase dark:text-neutral-500  border-x-3 border-white"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-sm font-normal uppercase bg-[#3f1d95]  dark:text-neutral-500  border-x-3 border-white"
                          >
                            dob
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start  text-sm font-normal uppercase bg-[#3f1d95]  dark:text-neutral-500  border-x-3 border-white"
                          >
                            doa
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start  text-sm font-normal uppercase bg-[#3f1d95]  dark:text-neutral-500  border-x-3 border-white"
                          >
                            UAN
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start  text-sm font-normal uppercase bg-[#3f1d95]  dark:text-neutral-500  border-x-3 border-white"
                          >
                            Aadhar
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start  text-sm font-normal uppercase bg-[#3f1d95]  dark:text-neutral-500  border-x-3 border-white"
                          >
                            IP
                          </th>
                        </tr>
                      </thead>
                      {filtdata.map((item, index) => (
                        <tbody key={index}>
                          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-grey-1000 even:dark:bg-gray-800">
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {index + 1}
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap">
                              <div className="flex gap-1">
                                <button className="bg-blue-800 px-2 py-1 rounded-sm cursor-pointer ">
                                  <i className="bi bi-pencil text-white " onClick={()=>gotoupdatepage(item.id)}></i>
                                </button>
                                <button className="bg-red-800 px-2 py-1 rounded-sm cursor-pointer ">
                                  <i className="bi bi-trash text-white"></i>
                                </button>
                              </div>
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {item.Name}
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {item.dob}
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {item.DateOfAppointment}
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {item.UAN}
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {item.aadhar}
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm">
                              {item.inputnumber}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
