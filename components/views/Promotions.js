import React, { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_PROMOTIONS } from "../../store/ApolloClient";
import View from "../View/View";
import { ArrowLinkButton } from "../Button/Button";
import { PromotionCard } from "../Card/Card";

const PromotionsView = ({ promotions: parentPromotions }) => {
  const now = new Date();
  const [promotions, setPromotions] = useState(parentPromotions);
  const { loading, error, data } = useQuery(GET_PROMOTIONS, {
    skip: !!promotions,
  });

  useEffect(() => {
    if (!loading && !error && data) {
      console.log("Updating promotions...", data.promotions);
      const newPromotions = data.promotions
        .filter((p) => p.inHomePage)
        .map((p) =>
          Object.assign({}, p, {
            startDate: new Date(p.startDate),
            endDate: new Date(p.endDate),
          })
        )
        .filter((p) => p.startDate <= now && p.endDate > now);
      setPromotions(newPromotions);
    }
  });

  return promotions && promotions.length > 0 ? (
    <View
      description="promotions"
      title={
        <>
          <b>Deals</b> as good as our cruises!
        </>
      }
      theme="blue"
    >
      {promotions.map((p) => (
        <PromotionCard
          title={p.shortTitle}
          key={p.id}
          validity={moment(p.endDate).format("Do MMMM YYYY")}
        >
          {p.shortDescription}
        </PromotionCard>
      ))}
      <ArrowLinkButton>See all promotions</ArrowLinkButton>
    </View>
  ) : null;
};

export default PromotionsView;
