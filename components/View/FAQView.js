import React from "react";
import cx from "classnames";

import styles from "./View.module.scss";
import { ArrowLinkButton } from "../Button/Button";

const FAQView = ({ children, title, icon, theme, className }) => (
  <div className={cx(styles.view, theme && styles[theme], className)}>
    <i className={cx("text-4xl block", icon)}></i>
    <h1 className="alt text-j-gray">{title}</h1>
    {children}
  </div>
);

export const FAQItem = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  const doSwitch = () => setOpen(!isOpen);
  return (
    <div className="pb-4">
      <h2 className="pb-1 cursor-pointer" onClick={doSwitch}>
        {title}
      </h2>
      <ArrowLinkButton
        down={!isOpen}
        up={isOpen}
        onClick={doSwitch}
        className="text-j-orange text-xs pb-2 focus:outline-none"
      >
        {isOpen ? "collapse" : "expand"}
      </ArrowLinkButton>
      {isOpen && (
        <p className="text-lg leading-7 text-j-gray pb-4">{children}</p>
      )}
    </div>
  );
};

export default FAQView;
