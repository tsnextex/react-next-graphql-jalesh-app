import React, { useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import goTo from "../../utils/goTo";
import { useScrollPosition } from "../../hooks/useScroll";
import View from "../View/View";
import Button from "../Button/Button";
import ContactFloater from "../ContactFloater/ContactFloater";
import PriceCounter from "../PriceCounter/PriceCounter";

import styles from "./Footer.module.scss";

const FooterView = ({ showPromoBanner }) => {
  const router = useRouter();
  const [scrolledFurther, setScrolledFurther] = useState(null);

  typeof window !== "undefined" &&
    useScrollPosition(
      ({ prevPos, currPos }) => {
        const newValue = currPos.y < -60;
        if (scrolledFurther != newValue) setScrolledFurther(currPos.y < -60);
      },
      [scrolledFurther],
      null,
      false,
      25
    );

  return (
    <>
      <View theme="orange">
        <p className="text-justify text-sm leading-7">
          Jalesh Cruises is India’s first and only premium cruiseline. Karnika,
          the cruise ship of Jalesh Cruises, has 837 state rooms on board,
          making it the largest hotel in South Asia. Jalesh Cruises offers
          cruise holidays to several exotic locations in and around India.
        </p>
      </View>
      <View theme="magenta">
        <div className="flex justify-around text-j-white text-huge my-4">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
          >
            <i className="fab fa-whatsapp"></i>
          </a>

          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
            <i className="fal fa-phone-alt"></i>
          </a>
          <a
            className="cursor-pointer"
            onClick={goTo(router, { pathname: "/contact", query: { f: 1 } })}
          >
            <i className="fal fa-envelope"></i>
          </a>
        </div>
        {/*
        // TODO: Missing content
        <Button className="text-j-orange mb-8 mt-12">Guest Login</Button>
        */}
        <nav className="leading-10 text-xs text-j-white">
          {/*
          // TODO: Missing content
          <a href="#" className="block arrow-right">
            Find a cruise expert near you
          </a>
          <a href="#" className="block arrow-right">
            Redeem certificate
          </a>
          */}
          <a
            onClick={goTo(router, "/destinations")}
            className="block arrow-right cursor-pointer"
          >
            Destinations
          </a>
          {/*
          // TODO: Missing content
          <a href="#" className="block arrow-right">
            Promotions
          </a>
          <a
            onClick={goTo(router, "/tos")}
            className="block arrow-right cursor-pointer"
          >
            Terms of use
          </a>
          <a
            onClick={goTo(router, "/privacy")}
            className="block arrow-right cursor-pointer"
          >
            Privacy policy
          </a>
          */}
          <a
            href={process.env.NEXT_PUBLIC_AGENT_PORTAL_URL}
            target="_blank"
            className="block arrow-right"
          >
            Agent portal
          </a>
        </nav>
        <div className="flex justify-center text-j-white text-2xl my-10">
          <a href="https://m.facebook.com/jaleshcruises/" target="_blank">
            <i className="fab fa-facebook px-2"></i>
          </a>
          <a
            href="https://www.instagram.com/jaleshcruises/?hl=en"
            target="_blank"
          >
            <i className="fab fa-instagram px-2"></i>
          </a>
          <a href="https://twitter.com/JaleshCruises" target="_blank">
            <i className="fab fa-twitter px-2"></i>
          </a>
        </div>
        <small
          className={cx("text-center block", { "pb-14": showPromoBanner })}
        >
          &copy; 2020 Jalesh Cruises All Rights Reserved
        </small>
      </View>
      {showPromoBanner && (
        <div
          className={cx(
            styles.stickyFooter,
            scrolledFurther && styles.scrollFurther
          )}
        >
          <div className="flex flex-col pl-3 justify-center">
            <h4 className="leading-none pb-0">
              <PriceCounter>Prices go up in</PriceCounter>
            </h4>
          </div>
          <Button className="text-lg text-j-magenta" center unbold smallPadding>
            Search
          </Button>
        </div>
      )}
      <ContactFloater
        className={cx({
          [styles.scrollFurtherContactFloater]:
            scrolledFurther && showPromoBanner,
        })}
      />
    </>
  );
};

export default FooterView;
