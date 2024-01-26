import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          HELLO 
        </p>
        <div>
        </div>
      </div>

      <div className={styles.center}>
        WORLD 
      </div>
    </main>
  );
}
