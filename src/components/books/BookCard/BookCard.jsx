import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./BookCard.module.css";

export default function BookCard({
  book,
  onClick,
  onDelete,
  showDelete = false,
}) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.coverBtn}
        onClick={() => onClick?.(book)}
        aria-label={`View details for ${book.title}`}
      >
        <img
          src={book.imageUrl}
          alt={`${book.title} cover`}
          className={styles.cover}
          loading="lazy"
          srcSet={`${book.imageUrl} 1x, ${book.imageUrl} 2x`}
        />
      </button>
      <div className={styles.meta}>
        <h3 className={styles.title}>{book.title}</h3>
        {showDelete ? (
          <div className={styles.row}>
            <p className={styles.author}>{book.author}</p>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => onDelete?.(book._id)}
              aria-label={`Delete ${book.title}`}
            >
              <SpriteIcon id="icon-trash" className={styles.deleteIcon} />
            </button>
          </div>
        ) : (
          <p className={styles.author}>{book.author}</p>
        )}
      </div>
    </article>
  );
}
