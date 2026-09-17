import { NavLink } from "react-router-dom";
import styles from "./UserNav.module.css";

export default function UserNav({ onItemClick }) {
  return (
    <nav className={styles.userNav} aria-label="Main navigation">
      <NavLink
        to="/recommended"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.active : ""}`
        }
        onClick={onItemClick}
      >
        Home
      </NavLink>
      <NavLink
        to="/library"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.active : ""}`
        }
        onClick={onItemClick}
      >
        My library
      </NavLink>
    </nav>
  );
}
