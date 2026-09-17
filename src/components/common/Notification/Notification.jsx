import SpriteIcon from "../SpriteIcon/SpriteIcon";
import styles from "./Notification.module.css";

export default function Notification({ message, type = "error", onClose }) {
  if (!message) return null;

  return (
    <div
      className={`${styles.notificationToast} ${styles[type]}`}
      role="alert"
    >
      <SpriteIcon
        id={type === "success" ? "icon-gg_check-o" : "icon-pajamas_error"}
        className={styles.statusIcon}
      />
      <span className={styles.message}>{message}</span>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close notification"
      >
        <SpriteIcon id="icon-Vector-5" className={styles.closeIcon} />
      </button>
    </div>
  );
}
