import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import styles from "./EmployeeRow.module.css";
import { deleteEmployeeAction } from "../../services/apiEmployee";
import { useEmployeeContext } from "./context/EmployeeProvider";

import toast from "react-hot-toast";

function EmployeeRow({ employee = {} }) {
  const navigate = useNavigate();

  const { employeesArr, setEmployeesArr } = useEmployeeContext();

  function ExtractAndFormatDate(isoString) {
    const createdAt = new Date(isoString);
    const formattedDate = createdAt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  }

  function handleEmployeeUpdate() {
    // Navigate to the createemployeeform route with employee as state
    navigate("/app/createemployeeform", { state: { employee } });
  }

  async function handleEmployeeDelete() {
    try {
      const deletedEmployeeDoc = await deleteEmployeeAction(employee._id);
      setEmployeesArr((employeesArr) =>
        employeesArr.filter((emp) => emp._id !== deletedEmployeeDoc._id)
      );
      toast.success("Employee Deleted Successfully!!!", {
        duration: 3000,
        style: {
          backgroundColor: "green",
          color: "white",
        },
        closeButton: true, // This will add a close button to the toast
      });
    } catch (err) {
      console.log(err.message);
      toast.error("Employee could not be created. Please try again.", {
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
        closeButton: true, // This will add a close button to the toast
      });
    }
  }

  return (
    <Table.Row role="row">
      <p>{employee._id}</p>
      <img className={styles.imgTag} src={employee.pic} alt={employee.name} />
      <p>{employee.name}</p>
      <p>{employee.email}</p>
      <p>{employee.mobileNo}</p>
      <p>{employee.designation}</p>
      <p>{employee.gender}</p>
      <p>{employee.courses.join(", ")}</p>
      <p>{ExtractAndFormatDate(employee.createdAt)}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleEmployeeUpdate}>
          <i className={`${styles.icon} ${styles.editIcon} fas fa-edit`}></i>
        </button>
        <button className={styles.button} onClick={handleEmployeeDelete}>
          <i className={`${styles.icon} ${styles.deleteIcon} fas fa-trash`}></i>
        </button>
      </div>
    </Table.Row>
  );
}

export default EmployeeRow;
