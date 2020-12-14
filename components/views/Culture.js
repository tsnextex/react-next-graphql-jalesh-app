import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CDN from "../../utils/cdn";
import View from "../View/View";

const CultureView = ({ title, subtitle, imageUrl, description }) =>
  title ? (
    <View description="culture" title={title}>
      <h4 className="text-j-orange">{subtitle}</h4>
      <LazyLoadImage className="rounded-big mb-7" src={CDN(imageUrl)} />
      <p className="small">{description}</p>
    </View>
  ) : null;

export default CultureView;
