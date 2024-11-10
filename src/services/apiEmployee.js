import Axios from "axios";

export const createEmployeeAction = async (
  uploadData,
  onUpdateEmployeesArr,
  employeesArr
) => {
  try {
    const { data } = await Axios.post(
      "http://localhost:5000/api/employee/create/employee",
      { ...uploadData },
      { withCredentials: true }
    );

    // console.log({ newEmployeeDoc: data });
    onUpdateEmployeesArr([...employeesArr, data]);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAllEmployees = async () => {
  try {
    const { data } = await Axios.get(
      "http://localhost:5000/api/employee/get/allemployees",
      { withCredentials: true }
    );

    // console.log({ allEmployeeDocs: data });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateEmployeeAction = async (uploadData, empID) => {
  try {
    const { data } = await Axios.put(
      "http://localhost:5000/api/employee/update/employee",
      { ...uploadData, empID },
      { withCredentials: true }
    );

    // console.log({ newEmployeeDoc: data });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteEmployeeAction = async (empid) => {
  try {
    const { data } = await Axios.delete(
      `http://localhost:5000/api/employee/delete/employee/${empid}`,
      { withCredentials: true }
    );

    // console.log({ deletedEmployeeDoc: data });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const isEmployeeEmailExistingAction = async (email) => {
  try {
    const { data } = await Axios.post(
      "http://localhost:5000/api/employee/check/emailexists",
      { email },
      { withCredentials: true }
    );

    return data;
  } catch (err) {
    throw new Error(err);
  }
};
