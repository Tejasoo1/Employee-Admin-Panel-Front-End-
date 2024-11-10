import { NavLink } from "react-router-dom";
import styles from "./EmployeeList.module.css";
import { useEffect, useState } from "react";
import Table from "../../ui/Table";
import EmployeeRow from "./EmployeeRow";
import { useEmployeeContext } from "./context/EmployeeProvider";
import { getAllEmployees } from "../../services/apiEmployee";

function EmployeeList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { employeesArr, setEmployeesArr } = useEmployeeContext();

  //Derived state
  let filteredEmployeesArr =
    searchQuery.trim().length > 0
      ? employeesArr.filter((emp) =>
          emp.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      : employeesArr;

  useEffect(() => {
    async function fetchAllDocs() {
      try {
        let employeeDocs = await getAllEmployees();
        setEmployeesArr(employeeDocs);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchAllDocs();
  }, [employeesArr.length]);

  return (
    <div className={styles.employeecontainer}>
      <p className={styles.paraheader}>Employee List</p>
      <div className={styles.createEmployeeContainer}>
        <div className={styles.innerContainer}>
          <p>Total Count: {filteredEmployeesArr.length}</p>
          <NavLink to="/app/createemployeeform">Create Employee</NavLink>
        </div>
        <div className={styles.innerContainer}>
          <label htmlFor="searchemp">Search</label>
          <input
            className={styles.inputField}
            type="text"
            id="searchemp"
            placeholder="Enter employee by Name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Table of employess */}
      <Table columns="2fr 0.8fr 1.5fr 1.9fr 1.2fr 1fr 0.5fr 0.5fr 1fr 1.5fr">
        <Table.Header role="row">
          <div>Unique Id</div>
          <div>Image</div>
          <div>Name</div>
          <div>Email</div>
          <div>Mobile No</div>
          <div>Designation</div>
          <div>gender</div>
          <div>Course</div>
          <div>Create date</div>
          <div>Action</div>
        </Table.Header>

        <Table.Body
          data={filteredEmployeesArr}
          render={(employee) => (
            <EmployeeRow employee={employee} key={employee._id} />
          )}
        />
      </Table>
    </div>
  );
}

export default EmployeeList;
