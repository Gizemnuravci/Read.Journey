import { useForm } from "react-hook-form";
import styles from "./FiltersForm.module.css";

export default function FiltersForm({ onFilter }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { title: "", author: "" },
  });

  const onSubmit = (data) => {
    if (onFilter) onFilter(data);
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.title}>Filters:</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="filter-title" className={styles.label}>
            Book title:
          </label>
          <input
            id="filter-title"
            type="text"
            placeholder="Enter text"
            className={styles.input}
            {...register("title")}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="filter-author" className={styles.label}>
            The author:
          </label>
          <input
            id="filter-author"
            type="text"
            placeholder="Enter text"
            className={styles.input}
            {...register("author")}
          />
        </div>
        <button type="submit" className={styles.btnSubmit}>
          To apply
        </button>
      </form>
    </div>
  );
}
