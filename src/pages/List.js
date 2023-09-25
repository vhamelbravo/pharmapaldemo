import React, { useEffect, useState } from "react";
import { useMedicine } from "../context/MedicineContext";
import NavbarMobile from "../components/NavbarMobile";

function List() {
  const { medicineEntries, addMedicineEntry } = useMedicine();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [displayedDoses, setDisplayedDoses] = useState("");
  const [displayedDate, setDisplayedDate] = useState("");

  const handleEditClick = (index) => {
    setSelectedEntry(index);
    document.getElementById("list_modal").showModal();
  };
  const handleChange = () => {
    const changedDoses = document.getElementById("doses-input").value;
    const changeWeekdays = document.getElementById("weekday-change");
    const changeWeekdaysText =
      changeWeekdays.options[changeWeekdays.selectedIndex].text;
    const changeHour = document.getElementById("hour-change").value;
    const changeAmPm = document.getElementById("ampm-change");
    const changeAmPmText = changeAmPm.options[changeAmPm.selectedIndex].text;
    const changedDate = changeWeekdaysText + " " + changeHour + changeAmPmText;

    if (changedDoses !== "") {
      setDisplayedDoses(changedDoses);
    }

    if (changeHour < 1 || changeHour > 12) {
      setDisplayedDate(displayedDate);
    } else {
      setDisplayedDate(changedDate);
    }

    document.getElementById("list_modal").close();
  };
  const handleDeleteEntry = () => {
    const entry = document.getElementById("entry");
    entry.remove();
  };
  useEffect(() => {
    if (selectedEntry !== null) {
      setDisplayedDoses(medicineEntries[selectedEntry].doses);
    }
  }, [selectedEntry, medicineEntries]);
  useEffect(() => {
    const storedMedications =
      JSON.parse(localStorage.getItem("medications")) || [];
    storedMedications.forEach(({ medicine, doses, date }) => {
      addMedicineEntry(medicine, doses, date);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold"> List </h1>
      </div>
      <NavbarMobile />
      <div id="list">
        {medicineEntries.map((entry, index) => (
          <div key={index} className="p-4 mb-4 ">
            <div id="entry" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold"> Name </h2>
                <h3 className="text-2xl"> {entry.medicine} </h3>
              </div>
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold"> Doses </h2>
                <h3 id="doses" className="text-2xl">
                  {" "}
                  {selectedEntry === index ? displayedDoses : entry.doses} mL
                </h3>
              </div>
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold"> Scheduled for </h2>
                <h3 className="text-2xl">
                  {" "}
                  {selectedEntry === index ? displayedDate : entry.date}{" "}
                </h3>
              </div>
              <div className="md:col-span-1 flex justify-end items-center">
                <button onClick={() => handleEditClick(index)} className="btn">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end items-center -my-10 pr-5">
          <dialog id="list_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  X
                </button>
              </form>
              {selectedEntry !== null && (
                <>
                  <h3 className="font-bold text-lg">Change Doses</h3>
                  <input id="doses-input" className="my-5" type="text" />
                  <h3 className="font-bold text-lg"> Change Scheduled Date </h3>
                  <br />
                  <div className="flex justify-evenly">
                    <select id="weekday-change">
                      <option value="monday"> Monday </option>{" "}
                      <option value="tuesday"> Tuesday </option>{" "}
                      <option value="wednesday"> Wednesday </option>{" "}
                      <option value="thursday"> Thursday </option>{" "}
                      <option value="friday"> Friday </option>{" "}
                      <option value="saturday"> Saturday </option>{" "}
                      <option value="sunday"> Sunday </option>{" "}
                    </select>
                    <input
                      className="w-8"
                      placeholder="hr"
                      min="1"
                      max="12"
                      id="hour-change"
                    />
                    <select id="ampm-change">
                      {" "}
                      <option value="AM"> A.M </option>{" "}
                      <option value="PM"> P.M </option>{" "}
                    </select>
                  </div>
                  <br />

                  <div className="flex justify-evenly">
                    <button onClick={() => handleChange()} className="btn">
                      {" "}
                      Save Changes{" "}
                    </button>

                    <button
                      onClick={() =>
                        document.getElementById("warning_modal").showModal()
                      }
                      className="btn bg-red-600"
                    >
                      {" "}
                      Delete Entry{" "}
                    </button>
                  </div>
                </>
              )}
            </div>
          </dialog>
          <dialog id="warning_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  X
                </button>
              </form>
              <h3 className="font-bold text-3lg"> Warning </h3>
              <p>
                {" "}
                The next action will delete the medication entry. Are you sure
                you want to continue?{" "}
              </p>
              <div className="flex justify-evenly">
                <form method="dialog">
                  <button onClick={() => handleDeleteEntry()} className="btn">
                    {" "}
                    Yes{" "}
                  </button>
                </form>
                <form method="dialog">
                  <button className="btn"> No </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}

export default List;
