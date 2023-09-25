import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MedicineContext = createContext();

export function MedicineProvider({ children }) {
  const [medicineEntries, setMedicineEntries] = useState([]);

  const addMedicineEntry = (medicine, doses, date) => {
    setMedicineEntries([...medicineEntries, { medicine, doses, date }]);
  };
  const getMedicineByWeekday = (weekday) => {
    return medicineEntries.filter((entry) => {
      // Extract the weekday from the date string (e.g., "Monday 8AM")
      const entryWeekday = entry.date.split(" ")[0];
      return entryWeekday.toLowerCase() === weekday.toLowerCase();
    });
  };

  return (
    <MedicineContext.Provider
      value={{
        medicineEntries,
        addMedicineEntry,
        getMedicineByWeekday,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

MedicineProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useMedicine() {
  return useContext(MedicineContext);
}
