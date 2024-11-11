import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateEmployeeForm.module.css";
import { uploadImageToCloudinary } from "../../utility/helpers";
import { useEmployeeContext } from "./context/EmployeeProvider";
import {
  createEmployeeAction,
  isEmployeeEmailExistingAction,
  updateEmployeeAction,
} from "../../services/apiEmployee";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function CreateEmployeeForm() {
  const location = useLocation();

  const { employee: employeeToEdit } = location?.state || {}; // Access the employee data passed in state

  const isEditSession = Object.keys(employeeToEdit || {}).length > 0;

  console.log({ isEditSession });

  let defaultValuesObj = {};
  if (isEditSession) {
    defaultValuesObj = {
      name: employeeToEdit.name,
      email: employeeToEdit.email,
      mobileNo: employeeToEdit.mobileNo,
      designation: employeeToEdit.designation,
      gender: employeeToEdit.gender,
      course: employeeToEdit.courses,
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: isEditSession ? defaultValuesObj : {},
  });

  const [loading, setLoading] = useState(false);

  const { employeesArr, setEmployeesArr } = useEmployeeContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!isEditSession) {
      const doc = await isEmployeeEmailExistingAction(data.email);

      if (doc.emailExists) {
        setError("email", { type: "manual", message: "Email already exists" });
        return;
      }
    }

    try {
      setLoading(true);

      let imageUrl = "";

      // Check if the imgUpload is a valid File object
      if (!(data.imgUpload[0] instanceof File && data.imgUpload?.[0]?.name)) {
        console.log("File is not uploaded");
      } else {
        //Helper function (uploadImageToCloudinary)
        imageUrl = await uploadImageToCloudinary(data.imgUpload[0]);
      }

      let uploadData = { ...data };

      if (imageUrl) {
        uploadData = { ...uploadData, pic: imageUrl };
      } else {
        uploadData = { ...uploadData, pic: employeeToEdit.pic };
      }

      if (isEditSession) {
        console.log("Its an Edit Session !!!");
        await updateEmployeeAction(uploadData, employeeToEdit._id);
        toast.success("Employee Updated Successfully!!!", {
          duration: 3000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
          closeButton: true,
        });
        navigate("/app/employeelist");
      } else {
        //Logic to create a employee document inside of the 'employees' collection on server.
        await createEmployeeAction(uploadData, setEmployeesArr, employeesArr);
        toast.success("Employee Created Successfully!!!", {
          duration: 3000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
          closeButton: true,
        });
        reset();
        navigate("/app/employeelist");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Employee not Created OR Updated. Please try again.", {
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
        closeButton: true, // This will add a close button to the toast
      });
    } finally {
      setLoading(false);
    }
  };

  console.log({ errors });

  return (
    <>
      {isEditSession ? (
        <p className={styles.forminfo}>Edit Employee</p>
      ) : (
        <p className={styles.forminfo}>Create Employee</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={styles.input}
          />
          {errors?.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className={styles.input}
          />
          {errors?.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mobile No:</label>
          <input
            type="text"
            {...register("mobileNo", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numeric values are allowed",
              },
            })}
            className={styles.input}
          />
          {errors?.mobileNo && (
            <p className={styles.errorText}>{errors.mobileNo.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Designation:</label>
          <select
            {...register("designation", {
              required: "Designation is required",
            })}
            className={styles.select}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors?.designation && (
            <p className={styles.errorText}>{errors.designation.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gender:</label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              value="Male"
              {...register("gender", { required: "Gender is required" })}
            />
            <label>Male</label>
            <input
              type="radio"
              value="Female"
              {...register("gender", { required: "Gender is required" })}
            />
            <label>Female</label>
          </div>
          {errors?.gender && (
            <p className={styles.errorText}>{errors.gender.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Course:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              value="MCA"
              {...register("course", { required: "Course is required" })}
            />
            <label>MCA</label>
            <input
              type="checkbox"
              value="BCA"
              {...register("course", { required: "Course is required" })}
            />
            <label>BCA</label>
            <input
              type="checkbox"
              value="BSC"
              {...register("course", { required: "Course is required" })}
            />
            <label>BSC</label>
          </div>
          {errors?.course && (
            <p className={styles.errorText}>{errors.course.message}</p>
          )}
        </div>

        {isEditSession && (
          <div className={styles.imgGroup}>
            <img
              className={styles.imgEdit}
              src={employeeToEdit.pic}
              alt={employeeToEdit.name}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={`${styles.label} ${styles.imglabel}`}>
            Image Upload:
          </label>
          <input
            type="file"
            {...register("imgUpload", {
              required: !isEditSession ? "Image upload is required" : false,
              validate: (value) => {
                if (!value) return true; // If no file is uploaded, skip validation
                // Only check for file type if the file is uploaded and it's not an edit session
                if (
                  !isEditSession &&
                  value[0]?.type !== "image/jpeg" &&
                  value[0]?.type !== "image/png"
                ) {
                  return "Only JPG/PNG files are allowed";
                }
                return true;
              },
            })}
            className={styles.fileInput}
          />
          {errors?.imgUpload && (
            <p className={styles.errorText}>{errors.imgUpload.message}</p>
          )}
        </div>

        {isEditSession ? (
          <button type="submit" className={styles.submitButton}>
            {loading ? "Loading..." : "Update"}
          </button>
        ) : (
          <button type="submit" className={styles.submitButton}>
            {loading ? "Loading..." : "Submit"}
          </button>
        )}
      </form>
    </>
  );
}

export default CreateEmployeeForm;
