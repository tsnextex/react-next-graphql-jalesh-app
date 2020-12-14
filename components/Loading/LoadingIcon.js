import React from "react";
import cx from "classnames";

const LoadingIcon = ({ className }) => (
  <div className={cx("w-100 text-center", className)}>
    <i className="fas fa-spinner fa-pulse" />
  </div>
);

export default LoadingIcon;
