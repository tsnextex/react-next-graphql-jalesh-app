import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import FooterView from "../components/Footer/Footer";
import SearchView from "../components/views/Search";
import View from "../components/View/View";

const TOS = () => (
  <Layout title="Jalesh Cruises">
    <Header className="bg-j-magenta text-j-white">
      <h1 className="self-center">404 - Not Found</h1>
    </Header>
    <main className="bg-auto">
      <View title="Uh oh...">
        <p className="pt-4 pb-20">
          The page you are trying to access was not found!
        </p>
      </View>
      <SearchView />
    </main>
    <footer>
      <FooterView showPromoBanner />
    </footer>
  </Layout>
);

export default TOS;
