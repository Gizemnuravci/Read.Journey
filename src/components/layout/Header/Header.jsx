import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearAuth } from "../../../store/authSlice";
import UserNav from "../UserNav/UserNav";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./Header.module.css";

export default function Header({ onError }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      if (onError) onError(err);
    } finally {
      dispatch(clearAuth());
      navigate("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <SpriteIcon id="icon-Logo-1" className={styles.logoIcon} />
        <span>READ JOURNEY</span>
      </div>

      <div className={styles.desktopOnly}>
        <UserNav />
      </div>

      <div className={`${styles.userBar} ${styles.desktopOnly}`}>
        <div className={styles.avatar}>{user?.name?.charAt(0) || "U"}</div>
        <span className={styles.userName}>{user?.name || "User"}</span>
        <button type="button" onClick={handleLogout} className={styles.btnLogout}>
          Log out
        </button>
      </div>

      <button
        type="button"
        className={styles.mobileTabletOnly}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <SpriteIcon
          id={isMenuOpen ? "icon-Vector-5" : "icon-Icon-1"}
          className={styles.burgerIcon}
        />
      </button>

      {isMenuOpen && (
        <div className={styles.mobileDrawer}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <SpriteIcon id="icon-Vector-5" className={styles.closeIcon} />
          </button>

          <UserNav onItemClick={() => setIsMenuOpen(false)} />

          <div className={styles.mobileUserActions}>
            <div className={styles.avatar}>{user?.name?.charAt(0) || "U"}</div>
            <span className={styles.userName}>{user?.name}</span>
            <button type="button" onClick={handleLogout} className={styles.btnLogout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
