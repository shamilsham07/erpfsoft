import React from "react";
import Nav from "../home/nav";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";

export default function Wage() {
    const navigation=useNavigate()
  const [date, setDate] = useState(null);
  function dateisseted(e) {
    console.log("jjj");
    console.log(e.value);
  }

  return (
    <section className="bg-[#f5f5f5] w-full h-screen">
      <Nav />
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
            <div>
              <button className="bg-green-900 text-white text-sm px-2 py-2 font-normal capitalize transition-opacity duration-300 hover:opacity-80"onClick={()=>navigation("/addwage")}>
                Add wage
              </button>
            </div>
          </div>
          <div class="-m-1.5 overflow-x-auto mt-3">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className=" text-white ">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white  uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        select
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white  uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white  uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white  uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        wage
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white  uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white   uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        attendence
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal  text-white uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        epf
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white   uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        ebi
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white   uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        total
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-sm font-normal text-white   uppercase  bg-[#3f1d95] dark:text-neutral-500  border-x-3 border-white"
                      >
                        netamount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4 align-middle">
                        {" "}
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-4 align-middle">1</td>
                      <td className="px-6 py-4">shamillll</td>
                      <td className="">
                        <input
                          type="number"
                          className="bg-[#f7f7f7] border-2 border-solid border-[#e6e6e6] px-2 py-2 rounded-sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <Calendar
                          value={date}
                          onChange={(e) => {
                            setDate(e.value);
                            dateisseted(e);
                          }}
                          view="month"
                          className="bg-[#f5f5f5]"
                          dateFormat="mm/yy"
                        />
                      </td>
                      <td className="">
                        <input
                          type="number"
                          className="bg-[#f5f5f5] px-2 py-2"
                        />
                      </td>

                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-[#f5f5f5] even:dark:bg-[#f5f5f5] border-b dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4 align-middle">
                        {" "}
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>

                      <td className="px-6 py-4 align-middle">2</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">1</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-900 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4 align-middle">
                        {" "}
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>

                      <td className="px-6 py-4 align-middle">3</td>
                      <td className="px-6 py-4">shamil</td>
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">8</td>
                      <td className="px-6 py-4">900</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">7000</td>
                      <td className="px-6 py-4">9000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
