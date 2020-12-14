import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import FooterView from "../components/Footer/Footer";
import FAQView, { FAQItem } from "../components/View/FAQView";
import SearchView from "../components/views/Search";

const LOREM =
  "Lorem ipsum dolor sit amet, \n" +
  "consectetur adipiscing elit, sed do \n" +
  "eiusmod tempor incididunt ut labore \n" +
  "et dolore magna aliqua. Ut enim ad \n" +
  "minim veniam, quis nostrud \n" +
  "exercitation ullamco laboris nisi ut \n" +
  "aliquip ex ea commodo consequat. \n" +
  "Duis aute irure dolor in reprehenderit \n" +
  "in voluptate velit esse cillum dolore \n" +
  "eu fugiat nulla pariatur. Excepteur \n" +
  "sint occaecat cupidatat non \n" +
  "proident, sunt in culpa qui officia \n" +
  "deserunt mollit anim id est laborum.";

const FAQ = () => (
  <Layout title="Jalesh Cruises">
    <Header className="bg-j-magenta text-j-white">
      <h1 className="self-center">
        Frequently asked <b>Questions</b>
      </h1>
    </Header>
    <main className="bg-auto">
      <FAQView title="Before booking" icon="far fa-money-check">
        <FAQItem title="Do I need cruise insurance? Where do I get it and how much do I need?">
          {LOREM}
        </FAQItem>
      </FAQView>
      <FAQView title="Boarding the ship" icon="far fa-ticket-alt" theme="blue">
        <FAQItem title="Do I need to make any health declarations before boarding the ship?">
          {LOREM}
        </FAQItem>
        <FAQItem title="Is there anything I am not allowed to bring on board the ship?">
          {LOREM}
        </FAQItem>
        <FAQItem title="What documents do I need to bring with me for a cruise?">
          {LOREM}
        </FAQItem>
      </FAQView>
      <FAQView title="On the ship" icon="fal fa-ship">
        <FAQItem title="What kind of apparel do I need for a cruise?">
          {LOREM}
        </FAQItem>
        <FAQItem title="How much should I expect to spend during the cruise?">
          {LOREM}
        </FAQItem>
        <FAQItem title="How can I pay on the ship?">{LOREM}</FAQItem>
        <FAQItem title="How do I let the staff know about my dietary allergies?">
          {LOREM}
        </FAQItem>
        <FAQItem title="Will I get sea sick?">{LOREM}</FAQItem>
        <FAQItem title="What happens if I have a medical emergency?">
          {LOREM}
        </FAQItem>
        <FAQItem title="How do I know what to do if there is an emergency evacuation?">
          {LOREM}
        </FAQItem>
        <FAQItem title="What should I do if I cannot find a member of my group on the ship - child, aged parent?">
          {LOREM}
        </FAQItem>
      </FAQView>
      <SearchView />
    </main>
    <footer>
      <FooterView showPromoBanner />
    </footer>
  </Layout>
);

export default FAQ;
