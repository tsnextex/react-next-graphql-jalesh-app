import React from "react";
import cx from "classnames";

import styles from "./View.module.scss";

const View = ({
  children,
  title,
  description,
  theme,
  className,
  thin,
  id,
  ...rest
}) => (
  <div
    className={cx(
      styles.view,
      theme && styles[theme],
      { [styles.thinView]: thin },
      className
    )}
    id={id}
    {...rest}
  >
    {description && <h1 className="alt">{description}</h1>}
    {title && <h1>{title}</h1>}
    {children}
  </div>
);

export default View;
