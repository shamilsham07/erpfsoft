import React, { useState } from "react";
import Nav from "./nav";
import * as XLSX from "xlsx";

export default function AddExcel() {
  const [showmodal, setshowmodal] = useState(false);
  const [excelishere, setexcelishere] = useState(null);
  const [data, setdata] = useState([]);




const updatebank=async()=>{
  console.log(data)
const result=await fetch("http://localhost:8000/updateBank",{
  method:"POST",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({data:data})
})
const res=await result.json()
console.log(good)
if(res.message){
  console.log("yellam set ann")
}
else{
  console.log("not seems good")
}

}





// neeed to change

  const saveexcel = async (e) => {
    console.log(data);
    const result = await fetch("http://localhost:8000/savefile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    });
    const res=await result.json()
    if(res.message){
      console.log(res.message)
    }
    else{
      console.log("bad")
    }
    
  };
  const [exportdata, setexportdata] = useState([
    {
    
      Name: "",
      Action: "",
     
      IP: "",
      DOA: "",
      DOB: "",
      GENDER: "",
      AADHAR: "",
      UAN: "",
    },
  ]);

  const convertExcelDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + serial * 86400000);
  };

  const downloadExcel = () => {
    console.log(exportdata);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(exportdata);
    XLSX.utils.book_append_sheet(wb, ws, "mysheet");
    XLSX.writeFile(wb, "myExcel.xlsx");
  };
  const excel = () => {
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
      };
      reader.readAsBinaryString(excelishere);
      setshowmodal(false);
    } else {
      console.log("bad");
    }
  };

  return (
    <div className="bg-[#f5f5f5] h-screen">
      <Nav />

      {showmodal && (
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
                    onClick={() => setshowmodal(false)}
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
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                    onClick={() => setshowmodal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => excel()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container px-10">
        <div className="bg-white mt-3 overflow-x-auto px-4 py-3 h-[70vh]">
          <div className="flex justify-between">
            <div>
              <input
                type="text"
                placeholder="Search your keyword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-[300px] rounded focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="bg-theme text-white capitalize  text-sm px-3 py-2 font-normal text-normal cursor-pointer"
                onClick={() => downloadExcel()}
              >
                download
              </button>
              <button
                className="bg-green-900 text-white capitalize  text-sm px-3 py-2 font-normal text-normal cursor-pointer"
                onClick={() => setshowmodal(true)}
              >
                Import excel
              </button>
            </div>
          </div>

          <div class="relative  mt-3  h-[60vh]">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-neutral-700"
              id="table-for-excel"
            >
              <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr className="">
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    Action
                  </th>
              
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    ip
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    doa
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    dob
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    gender
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    aadhar
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-theme text-white border-3 border-white text-sm text-normal font-normal"
                  >
                    UAn
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-grey-1000 even:dark:bg-gray-800"
                  >
                    <td className="px-6 py-4  whitespace-nowrap text-sm text-black">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <i class="bi bi-pencil bg-blue-900  text-white px-3 py-2 rounded "></i>
                        <i class="bi bi-trash p-2 bg-red-800 text-white px-3 py-2 rounded"></i>
                      </div>
                    </td>

                   
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["IP Number (10 Digits Only)"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["Name (Alphabets Only)"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["Date of Appointment (DD/MM/YYYY)Eg : 01/01/1970"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["Date of Birth (DD/MM/YYYY) Eg : 01/01/1970"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["Gender (M/F/TG)"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["Aadhar"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item["UAN"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-end px-4 py-2 ">
          <button
            className="px-4 py-2 bg-green-900 text-white capitalize text-sm cursor-pointer"
            onClick={() =>updatebank()}
            type="button"
          >
            Add Staff
          </button>
        </div>
      </div>
    </div>
  );
}
