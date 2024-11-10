import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import AdminDetails from "../features/admin/AdminDetails";

function Header() {
  return (
    <header className={styles.appHeader}>
      <nav className={styles.navigationtab}>
        <NavLink to="/app/dashboard">HOME</NavLink>
        <NavLink to="/app/employeelist">Employee List</NavLink>
      </nav>
      <AdminDetails />
    </header>
  );
}

export default Header;
