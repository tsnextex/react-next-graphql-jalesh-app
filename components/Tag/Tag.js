import React from "react";
import cx from "classnames";

export const Tag = ({ className, children, ...rest }) => (
  <div
    className={cx(
      "text-tiny leading-loose px-5 uppercase rounded-r-full rounded-l-full",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Tag;
