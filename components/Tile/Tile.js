import cx from "classnames";
import styles from "../View/View.module.scss";

export const Tile = ({
  children,
  className,
  theme,
  shadow,
  hugeShadow,
  padded,
  tiny,
  ...rest
}) => (
  <div
    className={cx(
      "rounded-big flex flex-col",
      theme ? styles[theme] : "text-j-black bg-j-white",
      shadow && "shadow-tile",
      hugeShadow && "shadow-tile-huge",
      padded ? (tiny ? "p-6" : "px-6 py-10") : "",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export const InnerTile = ({
  children,
  className,
  theme,
  tiny,
  as = "div",
  ...rest
}) => {
  const Component = as;
  return (
    <Component
      className={cx(
        "px-5",
        tiny ? "py-5" : "py-8",
        theme && styles[theme],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
export const TopTile = ({ children, className, theme, ...rest }) => (
  <InnerTile className={cx("rounded-t-big", className)} theme={theme} {...rest}>
    {children}
  </InnerTile>
);
export const BottomTile = ({ children, className, theme, ...rest }) => (
  <InnerTile className={cx("rounded-b-big", className)} theme={theme} {...rest}>
    {children}
  </InnerTile>
);

Tile.Inner = InnerTile;
Tile.Top = TopTile;
Tile.Bottom = BottomTile;

export default Tile;
