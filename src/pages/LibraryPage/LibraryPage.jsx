import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import Dashboard from "../../components/dashboard/Dashboard/Dashboard";
import AddBookForm from "../../components/dashboard/AddBookForm/AddBookForm";
import RecommendedPreview from "../../components/dashboard/RecommendedPreview/RecommendedPreview";
import MyLibraryBooks from "../../components/books/MyLibraryBooks/MyLibraryBooks";
import BookDetailsModal from "../../components/books/BookDetailsModal/BookDetailsModal";
import SuccessModal from "../../components/books/SuccessModal/SuccessModal";
import okeyIcon from "../../assets/okey.png";
import Notification from "../../components/common/Notification/Notification";
import {
  getOwnBooks,
  addBookRequest,
  deleteBookRequest,
} from "../../api/booksApi";
import { fetchCurrentUser } from "../../store/authSlice";
import styles from "./LibraryPage.module.css";

export default function LibraryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadBooks = useCallback(async () => {
    try {
      const res = await getOwnBooks(status);
      const ownBooks = Array.isArray(res.data)
        ? res.data
        : res.data?.results || res.data?.books || res.data?.data;
      setBooks(ownBooks || []);
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to load library");
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBooks();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadBooks]);

  const handleAddBook = async (data) => {
    try {
      await addBookRequest(data);
      setShowSuccess(true);
      await loadBooks();
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to add book");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBookRequest(id);
      loadBooks();
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to delete book");
    }
  };

  const handleStartReading = () => {
    navigate(`/reading/${selectedBook._id}`);
    setSelectedBook(null);
  };

  return (
    <MainLayout onError={setNotification}>
      <div className={styles.pageLayout}>
        <Dashboard>
          <AddBookForm onAddBook={handleAddBook} />
          <RecommendedPreview />
        </Dashboard>
        <MyLibraryBooks
          books={books}
          status={status}
          onStatusChange={setStatus}
          onBookClick={setSelectedBook}
          onDelete={handleDelete}
        />
      </div>

      <BookDetailsModal
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
        actionLabel="Start reading"
        onAction={handleStartReading}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={okeyIcon}
        title="Good job"
        message="Your book is now in the library! The joy knows no bounds and now you can start your training"
      />

      <Notification
        message={notification}
        type="error"
        onClose={() => setNotification(null)}
      />
    </MainLayout>
  );
}
