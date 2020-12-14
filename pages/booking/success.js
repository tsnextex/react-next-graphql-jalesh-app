import React, { useContext } from "react";
import UserContext from "../../store/UserContext";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import View from "../../components/View/View";
import FooterView from "../../components/Footer/Footer";
import SummaryView from "../../components/Booking/SummaryView";
import Tile from "../../components/Tile/Tile";
import Button from "../../components/Button/Button";

const Success = () => {
  const [user, setUser] = useContext(UserContext);

  const { booking } = user;
  console.log("Booking", booking);

  if (!booking) return <div />;

  // TODO: check booking against backend

  return (
    <Layout title="Booking">
      <Header
        light
        className="bg-j-blue-lighter text-j-white"
        style={{
          height: "auto",
        }}
      />
      <main className="bg-auto">
        <View theme="blue">
          <h1>Thank you!</h1>
          <h4 className="pb-5">
            <i className="fal fa-check-circle text-j-green text-3xl pr-2" />
            We have received your payment.
          </h4>
          <p className="text-j-gray pb-2">
            A confirmation has been sent to your email and mobile number.
          </p>
          <SummaryView booking={booking} />
          <Tile
            tiny
            theme="magenta"
            className="my-10 border border-j-gray-lighter"
          >
            <Tile.Inner className="text-center mx-8 my-2">
              <h3 className="text-bold">
                Manage your cruise reservation & more
              </h3>
              <Button className="bg-j-white w-full text-j-orange mt-4">
                Guest Lounge
              </Button>
            </Tile.Inner>
          </Tile>
        </View>
      </main>
      <FooterView />
    </Layout>
  );
};

export default Success;
