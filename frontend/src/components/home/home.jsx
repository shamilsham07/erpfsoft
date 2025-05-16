import React, { useEffect } from "react";
import "./home.css";

import { useState } from "react";
import Staffs from "./staffs";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import usersicon from "../../assets/crowd.png";
import cards from "../../assets/credit-card.png";
import revenueicon from "../../assets/revenue (1).png";
import Nav from "./nav";
export default function Home() {
  const [uservalue, setuservalue] = useState(0);
  const [creditcount, setcreditcount] = useState(0);

  const array = [1, 23, 34, 546, 54, 4, 7, 4, 4, 456, 9];
  useEffect(() => {
    const interval = setInterval(() => {
      setuservalue((prev) => {
        if (prev < array.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 0);

    const clinterval = setInterval(() => {
      setcreditcount((prev) => {
        if (prev < 10) {
          return prev + 1;
        } else {
          clearInterval(clinterval);
          return prev;
        }
      });
    }, 0);
    return () => {
      clearInterval(clinterval);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative">
      <div className="fixed w-full">
        <Nav />
      </div>
      <div className="bg-[#E3E6ED] h-auto">
        <div className="container px-5 py-20">
          <div className="grid grid-cols-6 gap-3">
            <div className=" shadow-for rounded-md px-4 py-4 flex justify-start items-center bg-white h-[115px]">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#3f1d95]">
                  <img
                    src={usersicon}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="capitalize font-semibold text-[#3f1d95]">
                    {uservalue}
                  </h5>
                  <h6 className="capitalize font-semibold text-[#3f1d95]">
                    total users
                  </h6>
                </div>
              </div>
            </div>
            <div className=" shadow-for rounded-md px-4 py-4 flex justify-center bg-white items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#3f1d95]">
                  <img
                    src={cards}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="capitalize font-semibold text-[#3f1d95]">
                    {creditcount}
                  </h5>
                  <h6 className="capitalize font-semibold text-[#3f1d95]">
                    total credits
                  </h6>
                </div>
              </div>
            </div>
            <div className=" shadow-for rounded-md px-4 py-4 flex justify-center bg-white items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#3f1d95]">
                  <img
                    src={revenueicon}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="capitalize font-semibold text-[#3f1d95]">
                    {creditcount}
                  </h5>
                  <h6 className="capitalize font-semibold text-[#3f1d95]">
                    total users
                  </h6>
                </div>
              </div>
            </div>
            <div className=" shadow-for rounded-md px-4 py-4 flex justify-center bg-white items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#3f1d95]">
                  <img
                    src={revenueicon}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="capitalize font-semibold text-[#3f1d95]">
                    {creditcount}
                  </h5>
                  <h6 className="capitalize font-semibold text-[#3f1d95]">
                    total users
                  </h6>
                </div>
              </div>
            </div>{" "}
            <div className=" shadow-for rounded-md px-4 py-4 flex justify-center bg-white items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#3f1d95]">
                  <img
                    src={revenueicon}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="capitalize font-semibold text-[#3f1d95]">
                    {creditcount}
                  </h5>
                  <h6 className="capitalize font-semibold text-[#3f1d95]">
                    total users
                  </h6>
                </div>
              </div>
            </div>{" "}
            <div className=" shadow-for rounded-md px-4 py-4 flex justify-center bg-white items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#3f1d95]">
                  <img
                    src={revenueicon}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="capitalize font-semibold text-[#3f1d95]">
                    {creditcount}
                  </h5>
                  <h6 className="capitalize font-semibold text-[#3f1d95]">
                    total users
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 mt-5">
            <div className="col-span-8">
            <div
  class="relative flex flex-col w-full h-[500px] overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
  <table class="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Name
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Attendence
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Employed
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            John Michael
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>
      <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Alexa Liras
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Developer
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>
      <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>
      <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>    <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>    <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>    <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>    <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>    <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>
      <tr>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Michael Levi
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Developer
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            24/12/08
          </p>
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>
      <tr>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Richard Gran
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            04/10/21
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
            </div>
            <div className="col-span-4">
              <div className="flex justify-start">
                <div className="flex justify-center items-center w-[500px]  px-4 py-4 bg-white rounded-md">
                  <Bar
                    data={{
                      labels: ["may", "november", "december"],
                      datasets: [
                        {
                          labels: "revenue",
                          data: [200, 300, 400],
                        },
                      ],
                      backgroundColor: [
                        "rgba(43,63,229,0.8)",
                        "black",
                        "green",
                      ],
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center mt-4 ">
                <div className="bg-white w-[500px] rounded-md px-3 py-3">
                  <Line
                    data={{
                      labels: ["may", "january", "december"],
                      datasets: [
                        {
                          data: [2, 1, 4],
                        },
                      ],
                      backgroundColor: [
                        "rgba(43,63,229,0.8)",
                        "black",
                        "green",
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
