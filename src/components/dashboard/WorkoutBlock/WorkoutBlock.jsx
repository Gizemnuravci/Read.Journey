import { Link } from "react-router-dom";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./WorkoutBlock.module.css";

export default function WorkoutBlock() {
  return (
    <section className={styles.block}>
      <h3 className={styles.title}>Start your workout</h3>
      <ol className={styles.list}>
        <li className={styles.item}>
          <span className={styles.number}>1</span>
          <p>
            Create a personal library:{" "}
            <span className={styles.highlight}>add</span> the books you intend
            to read to it.
          </p>
        </li>
        <li className={styles.item}>
          <span className={styles.number}>2</span>
          <p>
            Create your first workout:{" "}
            <span className={styles.highlight}>define</span> a goal, choose a
            period, start training.
          </p>
        </li>
      </ol>
      <Link to="/library" className={styles.link}>
        My library
        <SpriteIcon id="icon-log-in-1" className={styles.arrowIcon} />
      </Link>
    </section>
  );
}
