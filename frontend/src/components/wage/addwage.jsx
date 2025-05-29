import React, { useEffect, useState } from "react";
import Nav from "../home/nav";
import "../home/home.css";
import csrftoken from "../../../csrf";
import { Calendar } from "primereact/calendar";
import Loader from "../loader/loader";
import { ScaleLoader } from "react-spinners";
export default function Addwage() {
  const [isChecked, setIsChecked] = useState({});
  const [updategross, setupdategrosss] = useState();
  const [date, setdate] = useState(null);
  const [epsvlaue, setepsvalue] = useState();
  const [userdetails, setuserdetails] = useState({});
  const [epf, setepf] = useState({});
  const [esi, setesi] = useState(null);
  const [gross, setgross] = useState({});
  const [updatewage, setupdatewage] = useState();
  const [activeModal, setactivemodal] = useState(false);
  const [buttonActive, setbuttonactive] = useState(false);
  const [isLoading, setisloading] = useState(false);

  async function setAttendence(e, id) {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newdate = new Date(year, month, 0).getDate();

    const updating = userdetails.map((staff, index) => {
      if (staff.id === id) {
        {
          e.target.value === 0 && setupdategrosss(0);
        }

        return {
          ...staff,

          attendence: e.target.value,
          ncp_days: e.target.value != 0 ? newdate - e.target.value : 0,
          gross: e.target.value == 0 ? 0 : staff.gross,
          epf: e.target.value == 0 ? 0 :staff.gross,
          eps:e.target.value==0?0:staff.gross>15000?15000:staff.gross,
          edli:e.target.value==0?0:staff.gross>15000?15000:staff.gross,
          ee:e.target.value==0?0:Math.round((staff.gross * 12) / 100),
          eps_employer:e.target.value==0?0: staff.gross > 15000
              ? Math.round((15000 * 8.33) / 100)
              : Math.round((staff.gross* 8.33) / 100),
          er:e.target.value==0?0:staff.gross > 15000
              ? Math.round((15000 * 3.67) / 100)
              : Math.round((staff.gross * 3.67) / 100),

        };
      }
      return staff;
    });
    setuserdetails(updating);
  }

  const changedDateGetdata = async (e) => {
    setuserdetails({});
    let year = e.target.value.getFullYear();
    let month = e.target.value.getMonth() + 1;
    let finaldate = `${month}/${year}`;
    console.log(finaldate);

    try {
      const result = await fetch("http://localhost:8000/gettotaldetails", {
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
        console.log("hhhhh", res.data);
        setuserdetails(res.data);
      } else if (res.afterdate) {
        console.log(res.afterdate);
        setuserdetails(res.afterdate);
      } else {
        res;
        console.log("he");
        setuserdetails(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const save = async () => {
    setisloading(true);
    console.log(userdetails);
    console.log(date);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    console.log(year);

    let finaldate = `${month}/${year}`;
    console.log(finaldate);

    const result = await fetch("http://localhost:8000/savingorupdatewage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ details: userdetails, date: finaldate }),
    });
    const res = await result.json();
    if (res.data) {
      console.log("hi");
      setisloading(false);
    } else {
      console.log("hello");
      setisloading(false);
    }
  };

  const updatingvalue = (e) => {
    console.log("hieeeeee");
    console.log("jjdhfg", isChecked);
    const updating = userdetails.map((staff) => {
      if (isChecked[staff.id]) {
        return {
          ...staff,
          gross: updategross,
          epf: updategross,
          eps: updategross > 15000 ? 15000 : updategross,
          edli: updategross > 15000 ? 15000 : updategross,
          ee: Math.round((updategross * 12) / 100),
          eps_employer:
            updategross > 15000
              ? Math.round((15000 * 8.33) / 100)
              : Math.round((updategross * 8.33) / 100),
          er:
            updategross > 15000
              ? Math.round((15000 * 3.67) / 100)
              : Math.round((updategross * 3.67) / 100),
        };
      }
      return staff;
    });
    setIsChecked({});
    setuserdetails(updating);
    setactivemodal(false);
  };

  function changewage() {
    setactivemodal(true);
  }

  function handleCheckboxChange(e, id) {
    console.log(id);
    console.log(e.target.checked);
    console.log(isChecked);
    if (e.target.checked) {
      setIsChecked((prev) => ({
        ...prev,
        [id]: id,
      }));
    } else {
      console.log("ll");
      setIsChecked((prev) => {
        const checkings = { ...prev };
        delete checkings[id];
        return checkings;
      });
    }
  }

  function setupdategross(e, id) {
    console.log("the gross", id);
    const updatedetails = userdetails.map((staff) => {
      if (staff.id === id) {
        console.log("eps", staff.eps);
        return {
          ...staff,
          gross: e.target.value,
          epf: e.target.value,
          eps: e.target.value > 15000 ? 15000 : e.target.value,
          edli: e.target.value > 15000 ? 15000 : e.target.value,
          ee: Math.round((e.target.value * 12) / 100),
          eps_employer:
            e.target.value > 15000
              ? Math.round((15000 * 8.33) / 100)
              : Math.round((e.target.value * 8.33) / 100),
          er:
            e.target.value > 15000
              ? Math.round((15000 * 3.67) / 100)
              : Math.round((e.target.value * 3.67) / 100),
        };
      }
      return staff;
    });
    setuserdetails(updatedetails);
  }

  async function getdetails() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let finaldate = `${month}/${year}`;
    console.log("k", finaldate);
    try {
      const result = await fetch("http://localhost:8000/gettotaldetails", {
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
        console.log("hhhhh", res.data);
        setuserdetails(res.data);
        // console.log("j", res.data);
        // const ourdata = res.data.map((user) => ({
        //   ...user,
        //   gross: "",
        //   edli: "",

        //   epf: "",
        //   esi: "",
        //   ee: "",
        //   eps_employer: "",
        //   er: "",
        //   ncp_days: "",
        //   refund: "",
        // }));
        // setuserdetails(ourdata);
        // console.log("jabarikka", ourdata);
      } else {
        res;
        console.log("he");
        setuserdetails(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (Object.keys(isChecked).length === 0) {
      setbuttonactive(false);
    } else {
      setbuttonactive(true);
    }
  }, [isChecked]);

  useEffect(() => {
    console.log(new Date());
    setdate(new Date());
    getdetails();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-blue-70/40 backdrop-blur-sm z-[100000] flex justify-center items-center">
          <ScaleLoader
            color="blue"
            cssOverride={{
              margin: "0 auto",
              borderColor: "blue",
            }}
            height={60}
            width={7}
            radius={2}
          />
        </div>
      )}

      <section className="bg-[#f5f5f5] w-full h-screen z-0">
        <Nav text={"wage"} />
        <div className="container px-10 relative z-0">
          <section className="bg-white box-shadows-nav p-6 rounded-md px-4 z-0">
            <div className="flex justify-between">
              <div className="card flex justify-content-center items-center gap-2">
                <label
                  htmlFor=""
                  className="text-sm text-theme capitalize font-bold"
                >
                  Date
                  <span>:</span>
                </label>
                <Calendar
                  value={date}
                  className="dating"
                  view="month"
                  dateFormat="mm/yy"
                  onChange={(e) => {
                    setdate(e.target.value);
                    changedDateGetdata(e);
                  }}
                />
              </div>
              <div>
                {buttonActive && (
                  <button
                    className="bg-green-900 rounded text-white text-sm px-2 py-2 capitalize  changing-wage"
                    onClick={() => changewage()}
                  >
                    change wage
                  </button>
                )}
              </div>
            </div>

            <div class="-m-1.5 overflow-x-auto mt-3 h-[50vh] overflow-y-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700  addpage-div">
                    <thead className="bg-theme text-white text-sm font-normal capitalize ">
                      <tr className="">
                        <th
                          rowSpan="3"
                          className="border-white border-1 text-normal font-normal"
                        >
                          select
                        </th>
                        <th
                          rowSpan="3"
                          className="border-white border-1 text-normal font-normal "
                        >
                          id
                        </th>
                        <th
                          rowSpan="3"
                          className="border-white border-1 font-normal"
                        >
                          Uan
                        </th>
                        <th
                          rowSpan="3"
                          className="border-white border-1 font-normal"
                        >
                          Name
                        </th>
                        <th
                          rowSpan="3"
                          className="border-white border-1 font-normal"
                        >
                          attendence
                        </th>
                        <th
                          colSpan="4"
                          className="wage border-white border-1 font-normal"
                        >
                          wages
                        </th>
                        <th
                          colSpan="4"
                          className="border-white border-1 font-normal"
                        >
                          contributed
                        </th>
                        <th
                          rowSpan="3"
                          className="border-white border-1 font-normal"
                        >
                          refund
                        </th>
                      </tr>
                      <tr>
                        <th className="border-white border-1 font-normal">
                          gross
                        </th>
                        <th className=" font-normal border-white border-1">
                          epf
                        </th>
                        <th className="font-normal border-white border-1">
                          eps
                        </th>

                        <th className=" font-normal border-white border-1">
                          edli
                        </th>
                        <th className="border-white border-1 font-normal">
                          EE
                        </th>
                        <th className="border-white border-1 font-normal">
                          {" "}
                          eps_employer
                        </th>
                        <th className="border-white border-1 font-normal">
                          ER
                        </th>
                        <th className="border-white border-1 font-normal">
                          NCPDAYS
                        </th>
                      </tr>
                      <tr></tr>
                    </thead>
                    {userdetails.length > 0 &&
                      userdetails.map((staff, index) => (
                        <tr key={index} className="text-sm">
                          <td className="px-6 py-4 text-center">
                            <input
                              id="default-checkbox"
                              checked={!!isChecked[staff.id]}
                              onChange={(e) =>
                                handleCheckboxChange(e, staff.id)
                              }
                              type="checkbox"
                              value=""
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </td>

                          <td className="text-center px-3 py-5 bg-gray-50 dark:bg-gray-800 ">
                            {index + 1}
                          </td>
                          <td className="text-center ">{staff.uan}</td>
                          <td className="text-center bg-gray-50 dark:bg-gray-800">
                            {staff.name}
                          </td>
                          <td className="text-center ">
                            <input
                              type="number"
                              className="w-[100px] bg-[#f5f5f5] px-2 py-2 rounded border-[#e6e6e6] outline-none "
                              value={staff.attendence}
                              onChange={(e) => setAttendence(e, staff.id)}
                            />
                          </td>
                          <td className="text-center ">
                            <input
                              type="number"
                              className="w-[100px] bg-[#f5f5f5] px-2 py-2 rounded border-[#e6e6e6] outline-none "
                              value={staff.gross}
                              disabled={!staff.attendence}
                              onChange={(e) => setupdategross(e, staff.id)}
                            />
                          </td>
                          <td className="text-center bg-gray-50 dark:bg-gray-800 ">
                            {staff.epf}
                          </td>
                          <td className="text-center  ">{staff.eps}</td>
                          <td className="text-center bg-gray-50 dark:bg-gray-800 ">
                            {staff.edli}
                          </td>
                          <td className="text-center">{staff.ee}</td>
                          <td className="text-center bg-gray-50 dark:bg-gray-800">
                            {staff.eps_employer}
                          </td>
                          <td className="text-center">{staff.er}</td>
                          <td className="text-center bg-gray-50 dark:bg-gray-800">
                            {staff.ncp_days}
                          </td>
                          <td className="text-center"></td>
                        </tr>
                      ))}
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-3 text-end">
              <button
                className="bg-green-800 text-white test-sm px-2 py-1 capitalize"
                onClick={() => save()}
              >
                save
              </button>
            </div>
          </section>
          {activeModal && (
            <div
              id="authentication-modal"
              tabindex=""
              class=" overflow-y-auto overflow-x-hidden absolute z-1000 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="absolute left-[500px] top-[200px] p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                      add wage
                    </h3>
                    <button
                      type="button"
                      class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={() => setactivemodal(false)}
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

                  <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#">
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Wage
                        </label>
                        <input
                          type="number"
                          name="wage"
                          onChange={(e) => setupdategrosss(e.target.value)}
                          id="number"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter the wage"
                          required
                        />
                      </div>

                      <button
                        type="button"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase"
                        onClick={() => updatingvalue()}
                      >
                        confirm
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
