import cx from "classnames";

export const ArrowRight = ({ className, color }) => (
  <i
    className={cx(
      "fas fa-long-arrow-right inline-block",
      { "text-j-orange": !color, [`text-j-${color}`]: color },
      className
    )}
  ></i>
);
