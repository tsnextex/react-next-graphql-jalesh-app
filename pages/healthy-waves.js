import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import FooterView from "../components/Footer/Footer";
import View from "../components/View/View";
import SearchView from "../components/views/Search";
import HealthyWavesView, {
  HealthyWavesItem,
} from "../components/View/HealthyWavesView";

const HealthyWaves = () => (
  <Layout title="Jalesh Cruises">
    <Header style={{ backgroundImage: 'url("/images/beach.jpg")' }} light>
      <div className="self-center text-center">
        <img src="/images/healthy-waves.png" className="h-16 inline-block" />
        <h4 className="text-j-magenta pt-4">Cruise with confidence</h4>
      </div>
    </Header>
    <main className="bg-auto">
      <View
        title={
          <>
            Your <b>safety</b> is our priority
          </>
        }
        thin
      >
        <div className="text-center">
          <img src="/images/safety-icon.png" className="pb-10 inline-block" />
        </div>
        <h2 className="text-j-gray pb-4">Set sail in the new normal</h2>
        <h4>
          <b>Healthy Waves</b> is a program created by Jalesh Cruises to ensure
          the safety of guests and staff on land and at sea.
        </h4>
        <h4 className="text-j-gray pb-8 -mx-7 px-7 pt-10 bg-j-blue-lighter">
          Learn more about some of the measures we have taken in consultation
          with public health experts and cruise line associations from around
          the world (INCLA, CLIA, etc.)
        </h4>
      </View>

      <HealthyWavesView title="Boarding">
        <HealthyWavesItem
          icon="fal fa-thermometer-half"
          title="Infrared screening for fever"
        >
          Some guests may be subjected to additional health checks or denied
          boarding if they are symptomatic.
        </HealthyWavesItem>
        <HealthyWavesItem icon="fal fa-stamp" title="Fit-to-travel certificate">
          Guests above 70 years of age must provide a fit-to-travel certificate
          issued by a registered medical practitioner.
        </HealthyWavesItem>
      </HealthyWavesView>

      <HealthyWavesView title="Check-in">
        <HealthyWavesItem icon="fal fa-clock" title="Scheduled check-in slots">
          All guests are assigned a pre-scheduled check-in time slot at the
          port.
        </HealthyWavesItem>
        <HealthyWavesItem icon="fal fa-people-arrows" title="Social distancing">
          Additional waiting areas have been arranged onboard to facilitate
          social distancing.
        </HealthyWavesItem>
      </HealthyWavesView>

      <HealthyWavesView title="Onboard medical facilities">
        <HealthyWavesItem icon="fal fa-procedures" title="24x7 Medical center">
          Our fully equipped onboard medical center is WHO-compliant and
          provides round-the-clock consultation and isolation ward services.
        </HealthyWavesItem>
      </HealthyWavesView>

      <HealthyWavesView title="Crew">
        <HealthyWavesItem
          icon="fal fa-stethoscope"
          title="Elevated health protocols"
        >
          All crew members wear face masks, undergo temperature checks twice
          daily, and follow stringent cleanliness protocols.
        </HealthyWavesItem>
      </HealthyWavesView>

      <HealthyWavesView title="Sanitation">
        <HealthyWavesItem
          icon="fal fa-pump-medical"
          title="WHO-standard sanitization"
        >
          The entire ship is sanitized and disinfected thoroughly using
          industry-standard cleaning agents prior to sailing, and during regular
          intervals daily.
        </HealthyWavesItem>
        <HealthyWavesItem icon="fal fa-pump-medical" title="Guest areas">
          All guest rooms, linens, and public areas are sanitized and
          disinfected regularly. This includes cleaning of washroom pipes and
          cabin alleys twice daily with hospital disinfectants.
        </HealthyWavesItem>
        <HealthyWavesItem icon="fal fa-pump-medical" title="Public areas">
          All public areas undergo a 2-tier sanitization process: cleansing,
          fogging, and wiping with hospital-grade disinfectants. Hand sanitizer
          dispensers are available throughout the common areas.
        </HealthyWavesItem>
        <HealthyWavesItem
          icon="fal fa-pump-medical"
          title="Elevators and touchpoints"
        >
          The elevators are cleaned every 2 hours. Frequent touchpoint like
          handrails, elevator buttons, tabletops, and door handles are cleaned
          every hour.
        </HealthyWavesItem>
        <HealthyWavesItem icon="fal fa-pump-medical" title="Other facilities">
          Entertainment facilities for kids and play areas are disinfected
          frequently. Gym, spa, theater, and shops are disinfected twice daily.
        </HealthyWavesItem>
        <HealthyWavesItem icon="fal fa-pump-medical" title="Food pavilions">
          Restaurants, bars, and food pavilions are disinfected thrice a day.
          <br />
          <br />
          Hand sanitizer dispensers are installed at entrances and exits.
          Seating arrangement has been modified for social distancing.
          <br />
          <br />
          Self-service facility at buffet restaurants has been suspended. Food
          and beverage will be served by the staff wearing masks and gloves.
          <br />
          <br />
          Sourcing of supplies has been prohibited from regions severely
          affected by the pandemic. Culinary use of wild animals is banned on
          board.
        </HealthyWavesItem>
      </HealthyWavesView>

      <HealthyWavesView title="Air purification">
        <HealthyWavesItem icon="fal fa-fan" title="Air filtration">
          Fresh air is filtered and supplied to the cabins and onboard public
          areas. Air filters and cooling coils are inspected, cleaned, and
          replaced frequently to ensure healthy air quality on the ship.
        </HealthyWavesItem>
      </HealthyWavesView>

      <SearchView />
    </main>
    <footer>
      <FooterView showPromoBanner />
    </footer>
  </Layout>
);

export default HealthyWaves;
