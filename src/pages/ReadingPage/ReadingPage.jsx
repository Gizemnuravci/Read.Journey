import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import Dashboard from "../../components/dashboard/Dashboard/Dashboard";
import AddReadingForm from "../../components/dashboard/AddReading/AddReadingForm";
import DetailsBlock from "../../components/reading/DetailsBlock/DetailsBlock";
import MyBook from "../../components/reading/MyBook/MyBook";
import SuccessModal from "../../components/books/SuccessModal/SuccessModal";
import partyPopperIcon from "../../assets/party-popper.png";
import Notification from "../../components/common/Notification/Notification";
import {
  getBookById,
  startReadingRequest,
  stopReadingRequest,
  deleteReadingRequest,
} from "../../api/booksApi";
import { fetchCurrentUser } from "../../store/authSlice";
import styles from "./ReadingPage.module.css";

export default function ReadingPage() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadBook = useCallback(async () => {
    try {
      const res = await getBookById(bookId);
      setBook(res.data);
      setIsReading(!!res.data?.isReading);
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to load book");
    }
  }, [bookId]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBook();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadBook]);

  const handleStartReading = async (page) => {
    try {
      await startReadingRequest({ id: bookId, page });
      setIsReading(true);
      loadBook();
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to start reading");
    }
  };

  const handleStopReading = async (page) => {
    try {
      await stopReadingRequest({ id: bookId, page });
      setIsReading(false);
      await loadBook();
      if (page >= book?.totalPages) {
        setShowComplete(true);
      }
    } catch (err) {
      setNotification(err.response?.data?.message || "Failed to stop reading");
    }
  };

  const handleToggleReading = () => {
    const input = document.getElementById("reading-page");
    input?.focus();
    input?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleDeleteReading = async (readingId) => {
    try {
      await deleteReadingRequest(bookId, readingId);
      loadBook();
    } catch (err) {
      setNotification(
        err.response?.data?.message || "Failed to delete reading",
      );
    }
  };

  return (
    <MainLayout onError={setNotification}>
      <div className={styles.pageLayout}>
        <Dashboard>
          <AddReadingForm
            isReading={isReading}
            onStartReading={handleStartReading}
            onStopReading={handleStopReading}
            maxPage={book?.totalPages}
          />
          <DetailsBlock
            book={book}
            readings={book?.readings || []}
            onDeleteReading={handleDeleteReading}
          />
        </Dashboard>
        <MyBook
          book={book}
          isReading={isReading}
          onToggleReading={handleToggleReading}
        />
      </div>

      <SuccessModal
        isOpen={showComplete}
        onClose={() => setShowComplete(false)}
        icon={partyPopperIcon}
        title="Congratulations!"
        message="You have finished reading this book! Great job on completing your reading journey."
      />

      <Notification
        message={notification}
        type="error"
        onClose={() => setNotification(null)}
      />
    </MainLayout>
  );
}
