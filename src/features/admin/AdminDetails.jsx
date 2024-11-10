import { useNavigate } from "react-router-dom";
import styles from "./AdminDetails.module.css";
import Cookies from "js-cookie"; // Import js-cookie

function AdminDetails() {
  const adminInfo = JSON.parse(localStorage.getItem("userAdmin")) || {};

  const navigate = useNavigate();

  function handleLogOut() {
    console.log("handleLogOut func.");
    localStorage.removeItem("userAdmin");

    // Remove the token from cookies
    Cookies.remove("token");
    navigate("/");
  }

  return (
    <div className={styles.admincontainer}>
      <p>{adminInfo.username}</p>
      <img src={adminInfo.pic} alt={adminInfo.username} />
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default AdminDetails;
