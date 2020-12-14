import React from "react";
import cx from "classnames";
import styles from "./ContactFloater.module.scss";

const ContactFloater = ({ className }) => (
  <div className={cx(styles.floater, className)}>
    <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
      <i className="fal fa-phone-alt"></i>
    </a>
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
      target="_blank"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  </div>
);

export default ContactFloater;
