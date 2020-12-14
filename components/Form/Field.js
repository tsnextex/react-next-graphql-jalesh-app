import React from "react";
import cx from "classnames";

const Field = ({
  children,
  icon,
  className,
  right,
  left,
  error,
  inverseError,
  lessSpace,
}) => (
  <div className={cx("relative", lessSpace ? "mb-6" : "mb-10", className)}>
    <div
      className={cx(
        "flex bg-j-white focus-within:border-j-magenta p-2 transition ease-in-out duration-300",
        {
          "rounded-tiny border": !right && !left,
          "rounded-l-tiny border": left,
          "rounded-r-tiny border-t border-b border-r": right,
          "border-j-red shadow-error": error && !inverseError,
          "border-j-orange shadow-error": error && inverseError,
          "border-j-gray-light": !error,
        }
      )}
    >
      {icon && <i className={cx("text-j-gray-lighter text-2xl", icon)}></i>}
      {children}
    </div>
    {error && (
      <small
        className={cx(
          "absolute text-xs",
          lessSpace ? "pt-1" : "pt-2",
          inverseError ? "text-j-orange" : "text-j-red"
        )}
      >
        {error}
      </small>
    )}
  </div>
);

export default Field;
