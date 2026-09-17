import styles from "./Statistics.module.css";

export default function Statistics({ book }) {
  const progress = Number(book?.progress) || 0;
  const pagesRead = Number(book?.pagesRead) || 0;
  const displayProgress = Math.min(Math.max(progress, 0), 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className={styles.statistics}>
      <p className={styles.description}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div className={styles.chartCard}>
        <div className={styles.chartWrapper}>
          <svg className={styles.chart} viewBox="0 0 120 120" aria-hidden="true">
            <circle
              className={styles.chartBg}
              cx="60"
              cy="60"
              r="45"
              fill="none"
              strokeWidth="10"
            />
            <circle
              className={styles.chartProgress}
              cx="60"
              cy="60"
              r="45"
              fill="none"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="65" className={styles.chartText} textAnchor="middle">
              {Math.round(displayProgress)}%
            </text>
          </svg>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendDot} />
          <div>
            <p className={styles.legendPercent}>{displayProgress.toFixed(2)}%</p>
            <p className={styles.legendPages}>{pagesRead} pages read</p>
          </div>
        </div>
      </div>
    </div>
  );
}
