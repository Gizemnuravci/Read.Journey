import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addBookSchema } from "../../../schemas/authValidation";
import styles from "./AddBookForm.module.css";

export default function AddBookForm({ onAddBook }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addBookSchema),
    defaultValues: { title: "", author: "", totalPages: "" },
  });

  const onSubmit = async (data) => {
    if (onAddBook) {
      await onAddBook({
        title: data.title,
        author: data.author,
        totalPages: Number(data.totalPages),
      });
      reset();
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 className={styles.title}>Create your library</h3>
      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label htmlFor="book-title" className={styles.label}>
            Book title:
          </label>
          <input
            id="book-title"
            type="text"
            placeholder="Enter text"
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            {...register("title")}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="book-author" className={styles.label}>
            The author:
          </label>
          <input
            id="book-author"
            type="text"
            placeholder="Enter text"
            className={`${styles.input} ${errors.author ? styles.inputError : ""}`}
            {...register("author")}
          />
          {errors.author && (
            <span className={styles.error}>{errors.author.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="book-pages" className={styles.label}>
            Number of pages:
          </label>
          <input
            id="book-pages"
            type="number"
            placeholder="0"
            className={`${styles.input} ${errors.totalPages ? styles.inputError : ""}`}
            {...register("totalPages")}
          />
          {errors.totalPages && (
            <span className={styles.error}>{errors.totalPages.message}</span>
          )}
        </div>
      </div>
      <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
        Add book
      </button>
    </form>
  );
}
