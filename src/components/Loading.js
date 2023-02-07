import React from "react";
import styles from "../Styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={styles.circle} id={styles["circle-1"]}>
          <div className={styles.inner_circle}></div>
        </div>
        <div className={styles.circle} id={styles["circle-2"]}>
          <div className={styles.inner_circle}></div>
        </div>
        <div className={styles.circle} id={styles["circle-3"]}>
          <div className={styles.inner_circle}></div>
        </div>
        <div className={styles.circle} id={styles["circle-4"]}>
          <div className={styles.inner_circle}></div>
        </div>
        <div className={styles.circle} id={styles["circle-5"]}>
          <div className={styles.inner_circle}></div>
        </div>
      </div>
    </div>
  );
}
