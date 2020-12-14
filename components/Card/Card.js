import React from "react";
import cx from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button, { ArrowLinkButton } from "../Button/Button";
import Tile from "../Tile/Tile";

import styles from "./Card.module.scss";

export const BaseImageCard = ({ src, children, id, ...rest }) => (
  <Tile className="mt-8 mb-20" hugeShadow id={id} {...rest}>
    <LazyLoadImage
      src={src}
      className="object-cover w-full rounded-t-big"
      style={{ height: "calc(100vh/4)" }}
    />
    <Tile.Bottom>{children}</Tile.Bottom>
  </Tile>
);

const Card = ({ title, src, children, className }) => (
  <BaseImageCard src={src}>
    <h3 className={cx("pb-4", className)}>{title}</h3>
    <h4>{children}</h4>
    <ArrowLinkButton>Learn more</ArrowLinkButton>
  </BaseImageCard>
);

export const MiniCard = ({ title, src, className }) => (
  <div className={cx(styles.minicard, className)}>
    <div
      className={styles.image}
      style={{ backgroundImage: "url(" + src + ")" }}
    >
      &nbsp;
    </div>
    <h2 className="p-0 text-center">
      <span>{title}</span> <i className="fal fa-arrow-right"></i>
    </h2>
  </div>
);

export const PromotionCard = ({ title, children, validity, className }) => (
  <div
    className={cx(
      "rounded-big w-full bg-j-magenta mb-12 p-7 text-j-white",
      className
    )}
  >
    <h1 className="text-center text-j-orange uppercase">{title}</h1>
    <p className="leading-6 text-sm">{children}</p>
    <div className="flex my-4">
      <Button
        className={cx("bg-j-magenta text-j-white", styles.moreButton)}
        noPadding
        fontSize="text-xs"
      >
        Learn more
      </Button>
      <Button className="text-j-magenta flex-grow">Book now</Button>
    </div>
    <small>Offer expires on {validity}</small>
  </div>
);

export default Card;
