import { useCallback, useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import Dashboard from "../../components/dashboard/Dashboard/Dashboard";
import FiltersForm from "../../components/dashboard/FiltersForm/FiltersForm";
import WorkoutBlock from "../../components/dashboard/WorkoutBlock/WorkoutBlock";
import QuoteBlock from "../../components/dashboard/QuoteBlock/QuoteBlock";
import RecommendedBooks from "../../components/books/RecommendedBooks/RecommendedBooks";
import BookDetailsModal from "../../components/books/BookDetailsModal/BookDetailsModal";
import Notification from "../../components/common/Notification/Notification";
import { getRecommendedBooks, addBookByIdRequest } from "../../api/booksApi";
import { fetchCurrentUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import styles from "./RecommendedPage.module.css";

export default function RecommendedPage() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [notification, setNotification] = useState(null);

  const loadBooks = useCallback(async () => {
    try {
      const res = await getRecommendedBooks(
        page,
        10,
        filters.title,
        filters.author,
      );
      setBooks(res.data.results || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to load books");
    }
  }, [page, filters]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBooks();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadBooks]);

  const handleFilter = (data) => {
    setFilters(data);
    setPage(1);
  };

  const handleAddToLibrary = async () => {
    try {
      await addBookByIdRequest(selectedBook._id);
      setSelectedBook(null);
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <MainLayout onError={setNotification}>
      <div className={styles.pageLayout}>
        <Dashboard>
          <FiltersForm onFilter={handleFilter} />
          <WorkoutBlock />
          <QuoteBlock />
        </Dashboard>
        <RecommendedBooks
          books={books}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onBookClick={setSelectedBook}
        />
      </div>

      <BookDetailsModal
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
        actionLabel="Add to library"
        onAction={handleAddToLibrary}
      />

      <Notification
        message={notification}
        type="error"
        onClose={() => setNotification(null)}
      />
    </MainLayout>
  );
}
