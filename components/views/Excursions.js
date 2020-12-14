import React from "react";
import scrollTo from "../../utils/scrollTo";
import View from "../View/View";
import { BaseImageCard } from "../Card/Card";
import Button from "../Button/Button";

const ExcursionsView = ({ excursions }) =>
  excursions && excursions.length ? (
    <View
      description="excursions"
      title="Explore the destinations"
      theme="magenta"
    >
      <p>
        With Jalesh Cruises, you are not confined to the ship. We offer a
        variety of guided shore excursions that allow you to experience the
        cruise destinations in a completely new light
      </p>
      {excursions.map((e, i) => (
        <ExcursionView key={i} {...e} />
      ))}
    </View>
  ) : null;

export default ExcursionsView;

// TODO: add amenities
const ExcursionView = ({
  title,
  subtitle,
  imageURL,
  description,
  amenities,
  id,
}) => (
  <BaseImageCard src={imageURL}>
    <h4 className="text-3xl">{title}</h4>
    <h4>{subtitle}</h4>
    <p className="small">{description}</p>
    <p className="small">
      You can purchase this shore excursion when booking your cruise
    </p>

    <Button
      className="w-full bg-j-orange text-j-white"
      onClick={() => scrollTo("cruises")}
    >
      Book your cruise
    </Button>
  </BaseImageCard>
);
