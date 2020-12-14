import React from "react";
import cx from "classnames";

import styles from "./View.module.scss";
import { ArrowLinkButton } from "../Button/Button";

const HealthyWavesView = ({ children, title }) => (
  <div className={cx(styles.view, "bg-j-blue-lighter")}>
    <h2 className="alt text-j-magenta pb-5">{title}</h2>
    {children}
  </div>
);

export const HealthyWavesItem = ({ title, icon, children }) => (
  <div className="flex mt-6">
    <div className={styles.healthyItem}>
      <i className={cx("inline-block", icon)}></i>
    </div>
    <div className="flex-grow">
      <h4 className="pb-2 font-medium">{title}</h4>
      <p className="leading-tiny text-xs text-j-magenta">{children}</p>
    </div>
  </div>
);

export default HealthyWavesView;
