import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

function EmployeeProvider({ children }) {
  const [employeesArr, setEmployeesArr] = useState([]);

  return (
    <EmployeeContext.Provider value={{ employeesArr, setEmployeesArr }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);

  if (context === undefined) {
    throw new Error(
      "Context value was accessed outside of its scope of availability !!!"
    );
  }

  return context;
}

export default EmployeeProvider;
