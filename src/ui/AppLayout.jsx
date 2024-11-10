import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  console.log("AppLayout component");
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
