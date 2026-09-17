import { useState } from "react";
import hourglassIcon from "../../../assets/hourglass.png";
import Diary from "../Diary/Diary";
import Statistics from "../Statistics/Statistics";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./DetailsBlock.module.css";

export default function DetailsBlock({ book, readings, onDeleteReading }) {
  const [view, setView] = useState("diary");
  const hasReadings = readings?.length > 0;
  const sectionTitle =
    view === "statistics"
      ? "Statistics"
      : hasReadings
        ? "Diary"
        : "Progress";

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <h3 className={styles.title}>{sectionTitle}</h3>
        <div className={styles.icons}>
          <button
            type="button"
            className={`${styles.iconBtn} ${view === "diary" ? styles.iconBtnActive : ""}`}
            onClick={() => setView("diary")}
            aria-label="Show diary"
            aria-pressed={view === "diary"}
          >
            <img
              src={hourglassIcon}
              alt=""
              className={styles.hourglassIcon}
              srcSet={`${hourglassIcon} 1x, ${hourglassIcon} 2x`}
            />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${view === "statistics" ? styles.iconBtnActive : ""}`}
            onClick={() => setView("statistics")}
            aria-label="Show statistics"
            aria-pressed={view === "statistics"}
          >
            <SpriteIcon
              id={view === "statistics" ? "icon-pie-chart-02" : "icon-pie-chart-021"}
              className={`${styles.chartIcon} ${view === "statistics" ? styles.chartIconActive : ""}`}
            />
          </button>
        </div>
      </div>

      {view === "diary" ? (
        <Diary readings={readings} onDeleteReading={onDeleteReading} />
      ) : (
        <Statistics book={book} />
      )}
    </section>
  );
}
