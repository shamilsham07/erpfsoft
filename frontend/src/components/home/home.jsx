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
  const [name, setname] = useState(null);
  const [details, setdetails] = useState([]);

  const [count, setCount] = useState(0);
  const[moneths,setmoneths]=useState('')
  const [totalwage, settotalwage] = useState(0);
  const [total_epf, settotal_epf] = useState(0);
  const [attendence, setAttendence] = useState(0);
  const [CurrentDate, setCurrentDate] = useState();
  const[getdates,setgetdates]=useState([])
  const[chartdata,setchartdata]=useState(null)

  const [settingmonth,setsettingmonth]=useState([])

const getgraph=async(e)=>{
console.log(e)
const month=e.getMonth()
console.log(months[month])
console.log(months.length)
const temp=[]
const array=[]
 for(let i=month;i<months.length;i++){
  console.log("hi")
  temp.push(months[i])
  array.push(`${i+1}/${e.getFullYear()}`) 
 }
 setsettingmonth(temp.slice(0,3))
 console.log(temp.slice(0,3))
 const gg=array.slice(0,3)
 setgetdates(gg)
 console.log(array.slice(0,3))
 const result=await fetch("http://localhost:8000/getgraph",{
  method:"POST",
  headers:{
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
  },
  body:JSON.stringify({date:gg})
 })
 const res=await result.json()
 console.log(res)
 const data=res.message
 console.log(settingmonth)
 
  const labels=temp.slice(0,3).map((item)=>item)
  const values=data.map((item)=>item.wage)


    setchartdata({
      labels: labels,
      datasets: [
        {
          label: "Monthly Wages",
          data: values,
          backgroundColor: "#3f1d95",
          borderColor: "#3f1d95",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        }
      ]
    });
  };















const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const options = {};

  const goandgetdata = async (e) => {
    setdate(e.target.value);
    console.log(e.target.value);
    const month = e.target.value.getMonth() + 1;
   setmoneths(months[e.target.value.getMonth()+1])
    const year = e.target.value.getFullYear();
    const finaldate = `${month}/${year}`;

    const result = await fetch("http://localhost:8000/goandgetdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        date: finaldate,
      }),
    });
    const res = await result.json();
    console.log(res);
    if (res.message) {
      console.log(res.message);
      settotalwage(res.message[0].wage);
      settotal_epf(res.message[0].epf);
      setAttendence(res.message[0].attendence);
    } else {
      settotalwage(0);
      settotal_epf(0);
      setAttendence(0);
    }
  };

  async function recievedatabasedon(e,id) {
    if(id){
          const month = e.getMonth() + 1;
    const year = e.getFullYear();
    const finaldate = `${month}/${year}`;
    const result = await fetch("http://localhost:8000/recievedatabasedon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ date: finaldate }),
    });
    const res = await result.json();
    console.log(res);
    if (res.message) {
      setdetails(res.message);
    } else {
      setdetails([]);
    }

    }
    else{
        console.log(e.target.value);
    const month = e.target.value.getMonth() + 1;
    const year = e.target.value.getFullYear();
    const finaldate = `${month}/${year}`;
    const result = await fetch("http://localhost:8000/recievedatabasedon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ date: finaldate }),
    });
    const res = await result.json();
    console.log(res);
    if (res.message) {
      setdetails(res.message);
    } else {
      setdetails([]);
    }
  }

    }
  
  

  const getcountofusers = async () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const finaldate = `${month}/${year}`;
    const result = await fetch("http://localhost:8000/getcountofusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ date: finaldate }),
    });

    const res = await result.json();
    console.log(res);
    if (res.message) {
      setCount(res.message);
      console.log("good", res.totalwage[0].wage);
      settotalwage(res.totalwage[0].wage);
      settotal_epf(res.totalwage[0].total_epf);
      setAttendence(res.totalwage[0].attendence);
    } else {
      setCount(0);
    }
  };
  useEffect(() => {
    getcountofusers();
    getgraph(new Date())
    recievedatabasedon(new Date(),2)
  }, []);

  const [date, setdate] = useState();
  useEffect(() => {
    console.log(new Date());
    setdate(new Date());
    setCurrentDate(new Date());
  }, []);
  return (
    <section className="relative bg-[#f5f5f5] ">

    <Nav text={""} className="" />


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
              onChange={(e) => goandgetdata(e)}
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
                <div className="flex mt-3 items-center">
                  <label htmlFor="" className="capitalize text-sm">
                    scehduled date:
                  </label>
                  <Calendar
                    value={date}
                    onChange={(e) => recievedatabasedon(e)}
                    view="month"
                    className="w-full date-format"
                    dateFormat="mm/yy"
                  />
                </div>
                <div className="px-40 mt-5">
                  <div
                    className=" border-dashed
 border-1 border-gray-900"
                  ></div>
                </div>
                <div class="relative mt-2 max-h-96 overflow-y-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="sticky top-0 z-10 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
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
                    <tbody className="overflow-y-auto">
                      {details.map((item, index) => (
                        <tr
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-gray-900"
                          key={index}
                        >
                          <td
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                          >
                            {item.name}
                          </td>
                          <td
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                          >
                            {item.attendence}
                          </td>{" "}
                          <td
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                          >
                            {item.gender}
                          </td>{" "}
                          <td
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                          >
                            {item.doa}
                          </td>{" "}
                          <td
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                          >
                            {item.wage}
                          </td>
                        </tr>
                      ))}
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
                {
                  chartdata&&
                <Line options={options} data={chartdata} />

                }
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
