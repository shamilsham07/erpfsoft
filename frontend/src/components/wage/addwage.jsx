import React, { useState } from "react";
import Nav from "../home/nav";
import "../home/home.css";
import { Calendar } from "primereact/calendar";

export default function Addwage() {

const[epf,setepf]=useState(null)
const[esi,setesi]=useState(null)
const[wage,setwage]=useState(null)


function calculation(e){
if(e){
    setepf(e.target.value*3)
}
}


  return (
    <section className="bg-[#f5f5f5] w-full h-screen">
      <Nav />
      <div className="container px-10">
        <section className="bg-white box-shadows-nav p-6 rounded-md px-4 z-0">
          <div className="card flex justify-content-center items-center gap-2">
            <label
              htmlFor=""
              className="text-sm text-theme capitalize font-bold"
            >
              Date
              <span>:</span>
            </label>
            <Calendar
              // value={date}
              className="dating"
              view="month"
              dateFormat="mm/yy"
            />
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-white">
                  <th
                    scope="col"
                    className="px-6 py-3 bg-theme border-2 border-white"
                  >
                    select
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-theme border-2 border-white"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-theme border-2 border-white"
                  >
                    <div class="flex items-center">Name</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-2 border-white bg-theme"
                  >
                    <div class="flex items-center">attendence</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-2 border-white bg-theme"
                  >
                    <div class="flex items-center">wage</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-2 border-white bg-theme"
                  >
                    <div class="flex items-center">Date</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-2 border-white bg-theme"
                  >
                    <div class="flex items-center">epf</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-2 border-white bg-theme"
                  >
                    <div class="flex items-center">esi</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-2 border-white bg-theme"
                  >
                    <div class="flex items-center">total net</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4 text-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                  </th>
                  <td class="px-6 py-4 text-black">Silver</td>
                  <td class="px-6 py-4 text-start">
                    <input type="number" className="bg-[#f7f7f7] px-2 py-2 rounded-sm border border-[#e6e6e6]" />
                  </td>
                  <td class="px-6 py-4 text-start">
                    <input type="number" className="bg-[#f7f7f7] px-2 py-2 rounded-sm border border-[#e6e6e6]"
                    onChange={(e)=>{
calculation(e)
                    }} />
                  </td>
                  <td class="px-6 py-4">
                   
                    <Calendar
                      // value={date}
                      className="dating"
                      view="month"
                      dateFormat="mm/yy"
                    />
                  </td>
                  <td class="px-6 py-4 text-center text-black">{epf?epf:0}</td>
                  <td class="px-6 py-4 text-black">5</td>
                  <td class="px-6 py-4 text-black">9</td>


                </tr>
              
             
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-end">
            <button className="bg-green-800 text-white test-sm px-2 py-1 capitalize">save</button>
          </div>
        </section>
      </div>
    </section>
  );
}
