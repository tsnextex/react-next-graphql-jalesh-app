import cx from "classnames";

export const IconLink = ({ children, icon, onClick }) => (
  <a className="cursor-pointer text-j-orange flex" onClick={onClick}>
    <i className={cx("pr-2 self-center text-2xl w-8 inline-block", icon)} />
    <span className="underline self-center">{children}</span>
  </a>
);

export default IconLink;
