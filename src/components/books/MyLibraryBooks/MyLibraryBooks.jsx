import BookCard from "../BookCard/BookCard";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import bookIcon from "../../../assets/book.jpg";
import styles from "./MyLibraryBooks.module.css";

const STATUS_OPTIONS = [
  { value: "", label: "All books" },
  { value: "unread", label: "Unread" },
  { value: "inProgress", label: "In progress" },
  { value: "done", label: "Done" },
];

export default function MyLibraryBooks({
  books,
  status,
  onStatusChange,
  onBookClick,
  onDelete,
}) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>My library</h2>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter books by status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <SpriteIcon id="icon-chevron-left" className={styles.selectIcon} />
        </div>
      </div>

      {books.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyCircle} aria-hidden="true">
            <img src={bookIcon} alt="" className={styles.emptyBook} />
          </div>
          <p className={styles.emptyText}>
            To start training, add{" "}
            <span className={styles.highlight}>some of your books</span> or from
            the recommended ones
          </p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {books.map((book) => (
            <li key={book._id}>
              <BookCard
                book={book}
                onClick={onBookClick}
                onDelete={onDelete}
                showDelete
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
