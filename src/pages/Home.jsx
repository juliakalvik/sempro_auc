import AuctionItems from "../components/auctionItems/index.jsx";
import HomeHero from "../components/homeHero/index.jsx";
import Header from "../components/navbar_wide/index.jsx";

export default function HomeTest() {
  return (
    <>
      <Header />
      <HomeHero />
      <h2>Home page</h2>
      <AuctionItems />
    </>
  );
}
