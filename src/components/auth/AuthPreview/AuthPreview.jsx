import phonePreview from "../../../assets/phone-preview.png";
import styles from "./AuthPreview.module.css";

export default function AuthPreview() {
  return (
    <aside className={styles.rightPanel} aria-hidden="true">
      <img
        src={phonePreview}
        srcSet={`${phonePreview} 1x, ${phonePreview} 2x`}
        alt=""
        className={styles.phoneImage}
        loading="lazy"
        width={320}
        height={640}
      />
    </aside>
  );
}
