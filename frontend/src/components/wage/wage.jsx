import React from "react";
import Nav from "../home/nav";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";

export default function Wage() {
  const navigation = useNavigate();
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
              <button
                className="bg-green-900 text-white text-sm px-2 py-2 font-normal capitalize transition-opacity duration-300 hover:opacity-80"
                onClick={() => navigation("/addwage")}
              >
                Add wage
              </button>
            </div>
          </div>
      
        </section>
      </div>
    </section>
  );
}
