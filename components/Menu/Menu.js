import React from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { slide as BurgerMenu } from "react-burger-menu";
import goTo from "../../utils/goTo";

import styles from "./Menu.module.scss";

export default function Menu(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const burgerRef = React.createRef();
  const { className, children, light, ...rest } = props;
  const menuIcon = (
    <i
      className={cx("fa fa-bars text-2xl pt-2", {
        "text-j-white": !light,
        "text-j-magenta": light,
      })}
    />
  );
  const closeIcon = <i className="fal fa-times text-2xl text-j-magenta" />;

  const MenuButton = (
    <button
      className={styles.hamburgerButton}
      onClick={() => setIsOpen(!isOpen)}
      ref={burgerRef}
      aria-expanded={isOpen}
      aria-label="Navigation öffnen"
    >
      {menuIcon}
    </button>
  );

  React.useEffect(() => {
    if (focused && burgerRef.current) {
      burgerRef.current.focus();
      setFocused(false);
    }
  }, [focused]);

  return (
    <div className={cx(styles.menu, className)}>
      {MenuButton}
      <BurgerMenu
        right
        customBurgerIcon={false}
        customCrossIcon={false}
        isOpen={isOpen}
        width={"auto"}
        onStateChange={({ isOpen }) => {
          setIsOpen(isOpen);
          if (!isOpen) setFocused(true);
          document.body.style.overflow = isOpen ? "hidden" : "auto";
        }}
        {...{ rest }}
      >
        {isOpen && (
          <div>
            <div>
              <div className="text-j-black">
                {/*
                // TODO: Missing content
                <a href="#">
                  <b>Guest login</b>
                </a>
                <a href="#">Redeem certificate</a>
                */}
                <a
                  href="#"
                  onClick={goTo(router, "/routes", () => {
                    setIsOpen(false);
                  })}
                >
                  Find a cruise
                </a>
                <a
                  href="#"
                  onClick={goTo(router, "/destinations", () => {
                    setIsOpen(false);
                  })}
                >
                  Destinations
                </a>
                {/*
                // TODO: Missing content
                <a href="#">Promotions</a>
                */}
                <a
                  href="#"
                  onClick={goTo(router, "/contact", () => {
                    setIsOpen(false);
                  })}
                >
                  Contact
                </a>
              </div>
              <div>
                <a
                  href={process.env.NEXT_PUBLIC_AGENT_PORTAL_URL}
                  target="_blank"
                  className={styles.secondary}
                >
                  Agent Portal
                </a>
                {/*
                // TODO: Missing content
                <a href="#" className={styles.secondary}>
                  Cruise Expert
                </a>
                */}
              </div>
            </div>
            <button
              className={styles.closeButton}
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                burgerRef.current && burgerRef.current.focus();
              }}
            >
              {closeIcon}
            </button>
          </div>
        )}
      </BurgerMenu>
    </div>
  );
}
