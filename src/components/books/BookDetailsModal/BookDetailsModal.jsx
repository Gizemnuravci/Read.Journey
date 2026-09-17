import Modal from "../../common/Modal/Modal";
import styles from "./BookDetailsModal.module.css";

export default function BookDetailsModal({
  isOpen,
  onClose,
  book,
  actionLabel,
  onAction,
}) {
  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <img
          src={book.imageUrl}
          alt={`${book.title} cover`}
          className={styles.cover}
          srcSet={`${book.imageUrl} 1x, ${book.imageUrl} 2x`}
        />
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        {book.totalPages && (
          <p className={styles.pages}>{book.totalPages} pages</p>
        )}
        {actionLabel && onAction && (
          <button type="button" className={styles.actionBtn} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </Modal>
  );
}
