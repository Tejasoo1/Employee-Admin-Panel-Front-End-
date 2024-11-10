import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.dashboardinfo}>DashBoard</p>
      <p className={styles.adminheader}>Welcome to Admin Panel !!!</p>
    </div>
  );
}

export default Dashboard;
