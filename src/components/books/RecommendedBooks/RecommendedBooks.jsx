import BookCard from "../BookCard/BookCard";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./RecommendedBooks.module.css";

export default function RecommendedBooks({
  books,
  page,
  totalPages,
  onPageChange,
  onBookClick,
}) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recommended</h2>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <SpriteIcon id="icon-chevron-left-1" className={styles.chevron} />
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <SpriteIcon id="icon-chevron-left" className={styles.chevronRight} />
          </button>
        </div>
      </div>
      <ul className={styles.grid}>
        {books.map((book) => (
          <li key={book._id}>
            <BookCard book={book} onClick={onBookClick} />
          </li>
        ))}
      </ul>
    </section>
  );
}
