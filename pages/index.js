import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Rotator from "react-rotating-text";
import { GET_PROMOTIONS } from "../store/ApolloClient";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import FooterView from "../components/Footer/Footer";
import MainPromotion, {
  MainPromotionFallback,
} from "../components/Promotion/MainPromotion";
import View from "../components/View/View";
import HealthyWavesView from "../components/views/HealthyWaves";
import CruisePackagesView from "../components/views/CruisePackages";
import CruiseDestinationsView from "../components/views/CruiseDestinations";
import SearchView from "../components/views/Search";
import ShipView from "../components/views/Ship";
import ActivitiesView from "../components/views/Activities";
import PromotionView from "../components/views/Promotion";
import PromotionsView from "../components/views/Promotions";
import ProductsView from "../components/views/Products";
import CertificateView from "../components/views/Certificate";
import FaqView from "../components/views/Faq";
import PlannerView from "../components/views/Planner";
import GroupsView from "../components/views/Groups";

const DESTINATIONS = [
  "Male",
  "Galle",
  "Mumbai",
  "Trincomalee",
  "Chennai",
  "Colombo",
  "Diu",
  "Kadmat Island",
  "Mormugao",
];

const Home = ({ hash }) => {
  const now = new Date();
  const [mainPromotion, setMainPromotion] = useState(null);
  const [promotions, setPromotions] = useState(null);
  const [promotionsLoaded, setPromotionsLoaded] = useState(false);

  const { loading, error, data } = useQuery(GET_PROMOTIONS, {
    skip: !!promotionsLoaded,
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
      const newMainPromotion = newPromotions.splice(0, 1)[0];
      setPromotionsLoaded(true);
      setMainPromotion(newMainPromotion);
      setPromotions(newPromotions);
    }
  });

  return (
    <Layout title="Jalesh Cruises" hash={hash}>
      <Header style={{ backgroundImage: 'url("/images/header-bg.jpg")' }} />
      <main className="bg-auto">
        <View
          title={
            <>
              Experience <br />
              <b>
                <Rotator items={DESTINATIONS} />
              </b>
              <br /> like never before
            </>
          }
        >
          {mainPromotion ? (
            <MainPromotion promotion={mainPromotion} />
          ) : (
            <MainPromotionFallback title="Find and book your perfect cruise. Great deals!" />
          )}
        </View>

        <HealthyWavesView />
        <CruisePackagesView />
        {/*
        // TODO: Missing content
        <CruiseDestinationsView />
        */}
        <SearchView />
        {/*
        // TODO: Missing content
        <ShipView />
        <ActivitiesView />
        <PromotionView />
        <ProductsView />
        <CertificateView />
        <PromotionsView promotions={promotions} />
        */}
        <FaqView />
        {/*
        // TODO: Missing content
        <PlannerView />
        <GroupsView />
        */}
      </main>
      <footer>
        <FooterView showPromoBanner />
      </footer>
    </Layout>
  );
};

Home.getInitialProps = () => ({ hash: (process.env.GIT_HASH || "").trim() });

export default Home;
