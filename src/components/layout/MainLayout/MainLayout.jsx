import Header from "../Header/Header";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children, onError }) {
  return (
    <div className={styles.appContainer}>
      <Header onError={onError} />
      <main className={styles.mainLayout}>{children}</main>
    </div>
  );
}
