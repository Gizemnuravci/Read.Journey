import styles from "./QuoteBlock.module.css";

export default function QuoteBlock() {
  return (
    <blockquote className={styles.quote}>
      &ldquo;Books are <span className={styles.highlight}>windows</span> to the
      world, and reading is a journey into the unknown.&rdquo;
    </blockquote>
  );
}
