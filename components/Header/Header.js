import React from "react";
import cx from "classnames";
import Link from "next/link";
import Menu from "../Menu/Menu";

import styles from "./Header.module.css";

const Header = ({ children, style, className, light }) => {
  return (
    <>
      <header className={cx(styles.container, className)} style={style}>
        <div className="flex px-7 justify-between w-full">
          <div className={cx(styles.logo, "cursor-pointer")}>
            <Link href="/">
              <img src="/images/logo.png" />
            </Link>
          </div>
          <Menu light={light} />
        </div>
        {children && (
          <div className="flex px-7 justify-center w-full flex-grow">
            {children}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
