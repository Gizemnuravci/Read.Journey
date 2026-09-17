import styles from "./MyBook.module.css";

export default function MyBook({ book, isReading, onToggleReading }) {
  if (!book) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>My reading</h2>
        {book.timeLeftToFinish && (
          <p className={styles.timeLeft}>{book.timeLeftToFinish}</p>
        )}
      </div>
      <div className={styles.bookDisplay}>
        <img
          src={book.imageUrl}
          alt={`${book.title} cover`}
          className={styles.cover}
          srcSet={`${book.imageUrl} 1x, ${book.imageUrl} 2x`}
        />
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <button
          type="button"
          className={`${styles.recordBtn} ${isReading ? styles.recording : ""}`}
          onClick={onToggleReading}
          aria-label={isReading ? "Stop reading" : "Start reading"}
        >
          <span className={isReading ? styles.stopIcon : styles.playIcon} />
        </button>
      </div>
    </section>
  );
}
