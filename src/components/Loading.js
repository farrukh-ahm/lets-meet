import React from "react";
import classes from "../Styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <div className={classes.circle} id={classes["circle-1"]}>
          <div className={classes.inner_circle}></div>
        </div>
        <div className={classes.circle} id={classes["circle-2"]}>
          <div className={classes.inner_circle}></div>
        </div>
        <div className={classes.circle} id={classes["circle-3"]}>
          <div className={classes.inner_circle}></div>
        </div>
        <div className={classes.circle} id={classes["circle-4"]}>
          <div className={classes.inner_circle}></div>
        </div>
        <div className={classes.circle} id={classes["circle-5"]}>
          <div className={classes.inner_circle}></div>
        </div>
      </div>
    </div>
  );
}
