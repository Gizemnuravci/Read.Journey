import Modal from "../../common/Modal/Modal";
import styles from "./SuccessModal.module.css";

export default function SuccessModal({ isOpen, onClose, title, message, icon }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        {icon && (
          <img
            src={icon}
            alt=""
            className={styles.icon}
            srcSet={`${icon} 1x, ${icon} 2x`}
          />
        )}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
      </div>
    </Modal>
  );
}
