import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMedicine } from "./context/MedicineContext";
import logo from "./assets/logo.png";
import NavbarMobile from "./components/NavbarMobile";
import "./App.css";

function App() {
  const [drugData, setDrugData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [descriptionData, setDescriptionData] = useState({});
  const { addMedicineEntry } = useMedicine();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.fda.gov/drug/drugsfda.json?count=openfda.brand_name.exact&limit=26776",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDrugData(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFetchDescription = () => {
    if (searchTerm.trim() !== "") {
      fetch(
        `https://api.fda.gov/drug/label.json?search=description:${searchTerm}&limit=1`,
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDescriptionData(data.results[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleAddMedicine = () => {
    const newMedicine = document.getElementById("medicine-input").value;
    const newDoses = document.getElementById("doses-input").value;
    const weekdays = document.getElementById("weekday");
    const weekdaysText = weekdays.options[weekdays.selectedIndex].text;
    const hour = document.getElementById("hour-input").value;
    const amPm = document.getElementById("ampm");
    const amPmText = amPm.options[amPm.selectedIndex].text;
    const date = weekdaysText + " " + hour + amPmText;
    if (hour < 1 || hour > 12) {
      alert("Please enter a number between 1 and 12");
    } else {
      const storedMedications =
        JSON.parse(localStorage.getItem("medications")) || [];
      const newEntry = { medicine: newMedicine, doses: newDoses, date };
      storedMedications.push(newEntry);
      localStorage.setItem("medications", JSON.stringify(storedMedications));

      addMedicineEntry(newMedicine, newDoses, date);
      navigate(`/list`);

      document.getElementById("medicine-input").value = "";
      document.getElementById("doses-input").value = "";
    }
  };

  return (
    <div className="App">
      <h1 className="text-5xl font-bold"> PharmaPal </h1>
      <NavbarMobile />
      <img className="mx-auto" src={logo} alt="Logo" />
      <input
        id="medicine-input"
        list="drug-list"
        type="text"
        className="input input-bordered input-primary max-w-x"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {drugData.length > 0 && (
        <datalist id="drug-list">
          {drugData.map((drug, index) => (
            <option key={index} value={drug.term}>
              {drug.term}
            </option>
          ))}
        </datalist>
      )}
      <button
        className="btn w-64 rounded-full my-4"
        onClick={() => {
          document.getElementById("my_modal_3").showModal();
          handleFetchDescription();
          setSelectedDrug(searchTerm);
        }}
      >
        Add medication
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              X
            </button>
          </form>
          <h3 className="font-bold text-lg">{selectedDrug}</h3>
          {descriptionData && (
            <div>
              <h4>Description Data:</h4>
              <p className="max-h-40 overflow-y-scroll">
                {descriptionData.information_for_patients}
              </p>
              <button
                onClick={() => {
                  document.getElementById("dosis_input_modal").showModal();
                }}
                className="btn mt-2"
              >
                {" "}
                Add to Current List{" "}
              </button>
            </div>
          )}
          <div className="modal-action"></div>
        </div>
      </dialog>
      <dialog id="dosis_input_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              X
            </button>
          </form>
          <h3> Please insert Doses </h3>
          <input id="doses-input" className="mt-2" min="1" type="number" />{" "}
          <p> mL </p>
          <button
            onClick={() => {
              document.getElementById("dosis_schedule_modal").showModal();
            }}
            className="btn mt-2"
          >
            {" "}
            Add to Current List{" "}
          </button>
          <div className="modal-action"></div>
        </div>
      </dialog>
      <dialog id="dosis_schedule_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              X
            </button>
          </form>
          <h3> Please insert Weekdays and Hour of Taking </h3>
          <select className="w-1/2" id="weekday">
            {" "}
            <option className="center" value="mon">
              {" "}
              Monday{" "}
            </option>{" "}
            <option value="tue"> Tuesday </option>{" "}
            <option value="wed"> Wednesday </option>{" "}
            <option value="thur"> Thursday </option>{" "}
            <option value="fri"> Friday </option>{" "}
            <option value="sat"> Saturday </option>{" "}
            <option value="sun"> Sunday </option>{" "}
          </select>
          <br />
          <input
            id="hour-input"
            name="hour"
            min="1"
            max="12"
            className="mt-2 w-10  "
            type="number"
          />{" "}
          <select id="ampm">
            {" "}
            <option value="AM"> A.M </option> <option value="PM"> P.M </option>{" "}
          </select>
          <br />
          <button
            onClick={() => {
              handleAddMedicine();
            }}
            className="btn mt-2"
          >
            {" "}
            Add to Current List{" "}
          </button>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
}

export default App;
