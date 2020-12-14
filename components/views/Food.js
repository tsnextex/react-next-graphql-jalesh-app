import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CDN from "../../utils/cdn";
import View from "../View/View";

const FoodView = ({ title, description, foods }) =>
  foods && foods.length ? (
    <View description="food" theme="blue">
      <h1>{title}</h1>
      <h4>{description}</h4>
      {foods.map((r, i) => (
        <FoodItem key={i} {...r} />
      ))}
    </View>
  ) : null;

export default FoodView;

const FoodItem = ({ title, imageUrl, description }) => (
  <div className="mb-10">
    <LazyLoadImage
      src={CDN(imageUrl)}
      className="rounded-big object-cover mb-4"
    />
    <h4 className="uppercase text-j-magenta pb-4 pt-3">{title}</h4>
    <p className="small">{description}</p>
  </div>
);
