import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { readingSchema } from "../../../schemas/authValidation";
import styles from "./AddReading.module.css";

export default function AddReadingForm({
  onStartReading,
  onStopReading,
  isReading = false,
  maxPage,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(readingSchema),
    defaultValues: { page: "" },
  });

  const onSubmit = (data) => {
    const page = Number(data.page);
    if (isReading) {
      if (onStopReading) onStopReading(page);
    } else if (onStartReading) {
      onStartReading(page);
    }
    reset();
  };

  return (
    <div className={styles.readingContainer}>
      <h3 className={styles.title}>{isReading ? "Stop page:" : "Start page:"}</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label htmlFor="reading-page" className={styles.label}>
            Page number:
          </label>
          <input
            id="reading-page"
            type="number"
            placeholder="0"
            min="1"
            max={maxPage || undefined}
            className={`${styles.input} ${errors.page ? styles.inputError : ""}`}
            {...register("page")}
          />
          {errors.page && (
            <span className={styles.error}>{errors.page.message}</span>
          )}
        </div>
        <button type="submit" className={styles.btnSubmit}>
          {isReading ? "To stop" : "To start"}
        </button>
      </form>
    </div>
  );
}
