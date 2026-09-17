import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./Diary.module.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Diary({ readings, onDeleteReading }) {
  if (!readings?.length) {
    return (
      <div className={styles.diary}>
        <p className={styles.empty}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className={styles.emptyCircle} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={styles.diary}>
      <ul className={styles.list}>
        {readings.map((entry) => (
          <li key={entry._id} className={styles.item}>
            <div className={styles.timeline}>
              <span className={styles.dot} />
            </div>
            <div className={styles.content}>
              <div className={styles.topRow}>
                <span className={styles.date}>{formatDate(entry.date)}</span>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onDeleteReading(entry._id)}
                  aria-label="Delete reading entry"
                >
                  <SpriteIcon id="icon-trash" className={styles.deleteIcon} />
                </button>
              </div>
              <p className={styles.pages}>{entry.pagesRead} pages</p>
              <p className={styles.details}>
                {entry.percentage?.toFixed(1)}% · {entry.time} minutes
              </p>
              {entry.speed && (
                <p className={styles.speed}>
                  <SpriteIcon id="icon-gg_check-o" className={styles.speedIcon} />
                  {entry.speed} pages per hour
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
