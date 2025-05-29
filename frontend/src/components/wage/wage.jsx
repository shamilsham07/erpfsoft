import React, { useEffect, useRef } from "react";
import Nav from "../home/nav";
import csrftoken from "../../../csrf";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function Wage() {
  const[isitchecked,setisitchecked]=useState("sheet1")
  const [staffPerPage, setStaffPerPage] = useState(10);
  const [currentpage, setcurrentpage] = useState(1);
  const [downloadmodal, setdownloadmodal] = useState(false);
  const [sheetvalue,setsheetvalue]=useState(null)

  const [staffdetails, setstaffdetails] = useState([]);
  const [staffdetailsafterpage, setstaffdetailsafterpage] = useState([]);
  const tableref = useRef(null);

  const totalpage = staffdetails.length / staffPerPage;
  const onDownload = async () => {
    console.log("good",isitchecked)
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fdate = `${month}/${year}`;
    const result = await fetch("http://localhost:8000/onDownload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ date: fdate,sheet:isitchecked}),
    });
    const blob = await result.blob();
    console.log(blob);
    const url = window.URL.createObjectURL(blob);


    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const previouspagination = () => {
    const nextPage = currentpage - 1;
    setcurrentpage(nextPage);
  };

  const pagination = (e) => {
    setcurrentpage(currentpage + e);
  };

  useEffect(() => {
    if (staffdetails.length) {
      const lastindex = currentpage * staffPerPage;
      const firstindex = lastindex - staffPerPage;
      console.log(firstindex);

      const pagedata = staffdetails.slice(firstindex, lastindex);
      console.log(pagedata);
      setstaffdetailsafterpage(pagedata);
    }
  }, [currentpage, staffdetails]);

  const lastindex = currentpage * staffPerPage;
  const firstindex = lastindex - staffPerPage;

  async function goandfetchdata() {
    const currentdate = new Date();
    console.log("hi");
    const curentmonth = currentdate.getMonth() + 1;
    console.log(curentmonth);
    const currentyear = currentdate.getFullYear();
    console.log(currentyear);
    const finaldate = `${curentmonth}/${currentyear}`;
    console.log("date", finaldate);
    console.log("un", date);

    console.log("nope");
    const result = await fetch("http://localhost:8000/goandfetchdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ date: finaldate }),
    });
    const res = await result.json();
    console.log(res);
    if (res.data) {
      setstaffdetails(res.data);

      setstaffdetailsafterpage(res.data.slice(firstindex, lastindex));
    } else {
      setstaffdetails({});
    }
  }

  const navigation = useNavigate();
  const [date, setDate] = useState(null);
  async function dateisseted(e) {
    try {
      console.log("jjj");
      console.log(e.value);
      const month = e.value.getMonth() + 1;
      const year = e.value.getFullYear();
      const finaldate = `${month}/${year}`;
      console.log(`${month}/${year}`);

      if (finaldate) {
        console.log("hi");
        const result = await fetch("http://localhost:8000/calenderdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ date: finaldate }),
        });
        const res = await result.json();
        console.log(res);
        if (res.data) {
          console.log("hellllllllllllllllllllllllllllllllll");
          console.log("kkkk", res.data);
          setstaffdetails(res.data);
          setcurrentpage(1);
        } else {
          console.log("jjjjjjjjjjj");
          setstaffdetails({});
          setstaffdetailsafterpage({});
          setcurrentpage(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(new Date());
    setDate(new Date());
    goandfetchdata();
  }, []);

function callthefunction(e){
  console.log(e.target.value)
  setisitchecked(true)

}


  return (
    <section className="bg-[#f5f5f5] w-full h-screen">
      <Nav text={"wage"} />
      <div className="container px-10">
        <section className="bg-white box-shadows-nav p-6 rounded-md px-4 z-0">
          <div className="flex justify-between items-center">
            <div className="card flex justify-content-center items-center gap-2">
              <label
                htmlFor=""
                className="text-sm text-theme capitalize font-bold"
              >
                filter by <span>:</span>
              </label>
              <Calendar
                value={date}
                onChange={(e) => {
                  setDate(e.value);
                  dateisseted(e);
                }}
                view="month"
                dateFormat="mm/yy"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setdownloadmodal(true)}
                className="bg-yellow-500 px-2 py-2 text-white capitalize text-sm"
              >
                download
              </button>
              <button
                className="bg-green-900 text-white text-sm px-2 py-2 font-normal capitalize transition-opacity duration-300 hover:opacity-80"
                onClick={() => navigation("/addwage")}
              >
                Add wage
              </button>
            </div>
          </div>

          <div class="relative overflow-x-auto shadow-md  mt-2 ">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              ref={tableref}
            >
              <thead class="text-xs uppercase bg-theme text-white align-middle ">
                <tr className="">
                  <th
                    scope="col"
                    class=""
                    rowSpan={2}
                    className="border-white border-1 text-normal font-normal text-center py-4"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    class=" "
                    rowSpan={2}
                    className="border-white border-1 text-normal font-normal text-center"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    class=""
                    rowSpan={2}
                    className="border-white border-1 text-normal font-normal text-center"
                  >
                    date
                  </th>
                  <th
                    scope="col"
                    class=""
                    rowSpan={2}
                    className="border-white border-1 text-normal font-normal text-center"
                  >
                    Uan
                  </th>
                  <th
                    scope="col"
                    colSpan={4}
                    className="border-white border-1 text-normal font-normal text-center py-2"
                  >
                    wage
                  </th>
                  <th
                    scope="col"
                    colSpan={4}
                    className="border-white border-1 text-normal font-normal text-center py-2"
                  >
                    contributed
                  </th>
                  <th
                    scope="col"
                    class=""
                    rowSpan={2}
                    className="border-white border-1 text-normal font-normal text-center"
                  >
                    refund
                  </th>
                </tr>
                <tr>
                  <th className="border-white border-1 text-normal font-normal text-center py-2">
                    gross
                  </th>
                  <th className="border-white border-1 text-normal font-normal text-center">
                    epf
                  </th>{" "}
                  <th className="border-white border-1 text-normal font-normal text-center">
                    eps
                  </th>{" "}
                  <th className="border-white border-1 text-normal font-normal text-center">
                    edli
                  </th>
                  <th className="border-white border-1 text-normal font-normal text-center">
                    EE
                  </th>
                  <th className="border-white border-1 text-normal font-normal text-center">
                    eps_employer
                  </th>
                  <th className="border-white border-1 text-normal font-normal text-center">
                    er
                  </th>
                  <th className="border-white border-1 text-normal font-normal text-center">
                    ncp_days
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffdetailsafterpage.length > 0 &&
                  staffdetailsafterpage.map((staff, index) => (
                    <tr key={index + 1} className="text-gray-900">
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {index + 1}
                      </td>
                      <td className="text-center py-3 ">{staff.name}</td>
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {staff.date}
                      </td>
                      <td className="text-center py-3 ">{staff.uan}</td>
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {staff.gross}
                      </td>
                      <td className="text-center py-3 ">{staff.epf}</td>
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {staff.eps}
                      </td>
                      <td className="text-center py-3 ">{staff.edli}</td>
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {staff.ee}
                      </td>
                      <td className="text-center py-3 ">
                        {staff.eps_employer}
                      </td>
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {staff.er}
                      </td>
                      <td className="text-center py-3 ">{staff.ncp_days}</td>
                      <td className="text-center py-3 bg-gray-50 dark:bg-gray-800">
                        {staff.refund}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex gap-2">
            {currentpage > 1 && (
              <button
                className="text-sm font-bold text-black   px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] "
                onClick={() => previouspagination()}
              >
                prev
              </button>
            )}
            {currentpage != 0 && (
              <button className="text-sm font-bold text-black   px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
                {currentpage}
              </button>
            )}

            {currentpage + 1 <= totalpage && (
              <button
                className="text-sm font-bold text-black   px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] "
                onClick={() => pagination(1)}
              >
                {currentpage + 1}
              </button>
            )}
            {currentpage + 2 <= totalpage && (
              <button
                className="text-sm font-bold text-black   px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] "
                onClick={() => pagination(2)}
              >
                {currentpage + 2}
              </button>
            )}

            {currentpage < 5 && (
              <button
                className="text-sm bg-theme px-1 py-1  text-white"
                onClick={() => pagination(1)}
              >
                Next
              </button>
            )}
          </div>

          {downloadmodal && (
            <div
              id="crud-modal"
              tabindex="-1"
              class=" overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)  h-screen"
            >
              <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Download
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="crud-modal"
                      onClick={() => setdownloadmodal(false)}
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5 flex justify-center items-center flex-col">
                    <div class="flex items-center mb-2">
                      <input
                        id='sheet1'
                        name="sheet"
                        type="radio"
                        value="sheet1"
                          defaultChecked
                        onClick={(e)=>setisitchecked(e.target.value)}
                        
                       
                   className="text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
                      <label
                        for="default-checkbox"
                        class="ms-2 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                      >
                        sheet 1
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="sheet2"
                        name="sheet"
                        type="radio"
                      
                        value="sheet2"
                        onClick={(e)=>setisitchecked(e.target.value)}

                       
                      className="text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
                      <label
                        for="default-checkbox"
                        class="ms-2 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                      >
                        sheet 2
                      </label>
                    </div>
                  </div>
                  <div className="p-4 md:5 text-end">
                    <button className="bg-theme text-white px-2 py-1 text-sm font-medium" onClick={(e)=>onDownload(e)}>Download</button>

                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
