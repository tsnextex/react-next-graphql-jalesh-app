import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CDN from "../../utils/cdn";
import View from "../View/View";

const HistoryView = ({ title, subtitle, imageUrl, description }) =>
  title ? (
    <View description="history" title={title} theme="blue">
      <h2>{subtitle}</h2>
      <LazyLoadImage className="rounded-big mb-7" src={CDN(imageUrl)} />
      <p className="leading-loose">{description}</p>
    </View>
  ) : null;

export default HistoryView;
