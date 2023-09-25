import React, { useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { useMedicine } from "../context/MedicineContext";

function Calendar() {
  const date = new Date();
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [displayedDate, setDisplayedDate] = useState(
    new Date(date.getFullYear(), currentMonth, 1),
  );
  const { getMedicineByWeekday } = useMedicine();
  const [selectedMedicine, setSelectedMedicine] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handlePrevMonth() {
    setCurrentMonth((prevMonth) => prevMonth - 1);
    setDisplayedDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  }

  function handleNextMonth() {
    setCurrentMonth((prevMonth) => prevMonth + 1);
    setDisplayedDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  }

  const lastDay = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayIndex = displayedDate.getDay();

  const days = [];

  for (let x = firstDayIndex; x > 0; x--) {
    const prevMonthDay = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth(),
      0 - x + 1,
    ).getDate();
    days.push(prevMonthDay);
  }

  for (let i = 1; i <= lastDay; i++) {
    days.push(i);
  }

  const dateFormat = displayedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const openMedicineModal = (day) => {
    const selectedDate = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth(),
      day,
    );
    const lowercaseWeekday = selectedDate
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .toLowerCase();

    const medicine = getMedicineByWeekday(lowercaseWeekday);
    setSelectedMedicine(medicine);

    const modal = document.getElementById("medicineModal");
    modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("medicineModal");
    modal.close();
  };

  return (
    <div className="body">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold"> Calendar </h1>
      </div>
      <NavbarMobile />
      <div className="container w-full flex justify-center items-center">
        <div className="calendar w-full max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl">
          <div className="month w-full h-12 flex justify-between items-center text-center pb-5">
            <i
              onClick={handlePrevMonth}
              className="fas fa-angle-left prev text-3xl font-bold"
            ></i>
            <div className="date">
              <h1 className="font-bold text-3xl">{months[currentMonth]}</h1>
              <p>{dateFormat}</p>
            </div>
            <i
              onClick={handleNextMonth}
              className="fas fa-angle-right next text-3xl font-bold"
            ></i>
          </div>
          <div className="weekdays w-full h-5 flex items-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (weekday, index) => (
                <div
                  key={index}
                  className="text-xl font-bold w-[20rem] flex justify-center items-center"
                >
                  {weekday}
                </div>
              ),
            )}
          </div>
          <div className="days w-full flex flex-wrap">
            {days.map((day, index) => (
              <div
                key={index}
                className="opacity-50 flex justify-center items-center m-[0.3] h-[5rem] cursor-pointer"
                style={{ width: `calc(100% / 7)` }}
                onClick={() => openMedicineModal(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <dialog id="medicineModal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            X
          </button>
          {selectedMedicine.length > 0 ? (
            <div>
              {selectedMedicine.map((medicineEntry, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold">
                    {medicineEntry.medicine}
                  </h2>
                  <p>Doses: {medicineEntry.doses}</p>
                  <p>Scheduled Date: {medicineEntry.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No medicine scheduled for this day.</p>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default Calendar;
