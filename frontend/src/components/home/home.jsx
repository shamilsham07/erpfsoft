import React, { useEffect, useState } from "react";
import "./home.css";
import { Calendar } from "primereact/calendar";
import Nav from "./nav";
import csrftoken from "../../../csrf";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Home() {
  const[count,setCount]=useState(0)
  const[totalwage,settotalwage]=useState(0)
  const[total_epf,settotal_epf]=useState(0)
  const[attendence,setAttendence]=useState(0)
  const options = {};
  const linechartdata = {
    labels: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "staurday",
      "sunday",
    ],
    datasets: [
      {
        label: "Steps",
        data: [3000, 200, 1010, 500, 900, 100, 90],
        borderColor: "#3f1d95",
        border: 1,
        backgroundColor: "#fafafa",
      },
    ],
  };

const getcountofusers=async()=>{
  const date=new Date();
  const month=date.getMonth()+1
  const year=date.getFullYear()
  const finaldate=`${month}/${year}`
  const result=await fetch("http://localhost:8000/getcountofusers",{
    method:"POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
          body:JSON.stringify({'date':finaldate})
        })



  const res=await result.json()
  console.log(res)
  if(res.message){
    setCount(res.message)
    console.log("good",res.totalwage[0].wage)
    settotalwage(res.totalwage[0].wage)
    settotal_epf(res.totalwage[0].total_epf)
    setAttendence(res.totalwage[0].attendence)
  }
  else{
    setCount(0)
  }

}
  useEffect(()=>{
    getcountofusers()

  },[])

  const [date, setdate] = useState();
  useEffect(() => {
    console.log(new Date());
    setdate(new Date());
  }, []);
  return (
    <section className="relative bg-[#f5f5f5] h-[100vh]">
      <Nav text={""} className="fixed" />

      <div className="px-10">
        <section>
          <div className="flex gap-2 items-center  font-normal ">
            <label htmlFor="" className="text-sm">
              Filter:
            </label>
            <Calendar
              value={date}
              view="month"
              className="dating"
              dateFormat="mm/yy"
            />
          </div>
          <section className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3 pb-2 pt-2">
              <div className="flex gap-3 ">
                <div className="bg-white w-[50%] h-[80px] pl-5 flex items-center gap-2 rounded">
                  <div className="bg-theme px-4 py-3 rounded">
                    <i className="bi bi-person text-white"></i>
                  </div>
                  <div className="text-theme font-bold text-lg">
                    <h1>{count}</h1>
                    <h6>Total users</h6>
                  </div>
                </div>
                <div className="bg-white w-[50%] h-[80px] pl-5 flex items-center gap-2">
                  <div className="bg-theme px-4 py-3 rounded">
                    <i class="bi bi-bank text-white"></i>
                  </div>
                  <div className="text-theme font-bold text-lg">
                    <h1>{totalwage}</h1>
                    <h6>Total wage</h6>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 ">
                <div className="bg-white w-[50%] h-[80px] pl-5 flex items-center gap-2 rounded">
                  <div className="bg-theme px-4 py-3 rounded">
                    <i class="bi bi-journal text-white"></i>
                  </div>
                  <div className="text-theme font-bold text-lg">
                    <h1>{total_epf}</h1>
                    <h6>Epf</h6>
                  </div>
                </div>
                <div className="bg-white w-[50%] h-[80px] pl-5 flex items-center gap-2    rounded">
                  <div className="bg-theme px-4 py-3 rounded">
                    <i class="bi bi-clipboard2 text-white"></i>
                  </div>
                  <div className="text-theme font-bold text-lg">
                    <h1>{attendence}</h1>
                    <h6>Total Attendence</h6>
                  </div>
                </div>
              </div>

              <div className="bg-white px-2 py-2">
                <div className="bg-theme p-2 rounded-xs text-center text-white">
                  <h3 className="capitalize font-bold text-sm">details</h3>
                </div>
                <div className="flex mt-3">
                  <label htmlFor="" className="capitalize text-sm">
                    scehduled date:
                  </label>
                  <input
                    type="date"
                    className="w-full border-2 rounded border-[#efefef] bg-[#fafafa] px-2"
                  />
                </div>
                <div className="px-40 mt-5">
                  <div
                    className=" border-dashed
 border-1 border-gray-900"
                  ></div>
                </div>
                <div class="relative overflow-x-auto mt-2">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          attendence
                        </th>
                        <th scope="col" class="px-6 py-3">
                          gender
                        </th>
                        <th scope="col" class="px-6 py-3">
                          date of Appointment
                        </th>
                        <th scope="col" class="px-6 py-3">
                          wage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-gray-900">
                        <td
                          scope="row"
                          class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                        >
                          shamil
                        </td>
                        <td class="px-6 py-4">1</td>
                        <td class="px-6 py-4">m</td>
                        <td class="px-6 py-4">$2999</td>
                        <td class="px-6 py-4">400</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">White</td>
                        <td class="px-6 py-4">Laptop PC</td>
                        <td class="px-6 py-4">$1999</td>
                        <td class="px-6 py-4">
                          <a
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr class="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">Black</td>
                        <td class="px-6 py-4">Accessories</td>
                        <td class="px-6 py-4">$99</td>
                        <td class="px-6 py-4">
                          <a
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-white h-[500px] w-full ">
              <div className="px-2 py-2">
                <div className="w-full bg-theme p-2 text-center rounded">
                  <h4 className="text-white capitalize text-lg font-normal">
                    Leaderboard
                  </h4>
                </div>
                <Line options={options} data={linechartdata} />
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
