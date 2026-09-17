import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecommendedBooks } from "../../../api/booksApi";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./RecommendedPreview.module.css";

export default function RecommendedPreview() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getRecommendedBooks(1, 3)
      .then((res) => setBooks(res.data.results || []))
      .catch(() => setBooks([]));
  }, []);

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>Recommended books</h3>
      <ul className={styles.list}>
        {books.map((book) => (
          <li key={book._id} className={styles.item}>
            <img
              src={book.imageUrl}
              alt={`${book.title} cover`}
              className={styles.cover}
              loading="lazy"
              srcSet={`${book.imageUrl} 1x, ${book.imageUrl} 2x`}
            />
            <div className={styles.info}>
              <p className={styles.bookTitle}>{book.title}</p>
              <p className={styles.author}>{book.author}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/recommended" className={styles.link}>
        Home
        <SpriteIcon id="icon-log-in-1" className={styles.arrowIcon} />
      </Link>
    </section>
  );
}
