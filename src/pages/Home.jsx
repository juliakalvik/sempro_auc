import AuctionItems from "../components/auctionItems/index.jsx";
import CountdownTimer from "../components/countDown/index.jsx";
import HomeCategoriesSection from "../components/homeCategories/index.jsx";
import HomeHeroSection from "../components/homeHero/index.jsx";

export default function HomeTest() {
  return (
    <>
      <HomeHeroSection />
      <HomeCategoriesSection />
      <CountdownTimer />
      <h2>Home page</h2>
      <AuctionItems />
    </>
  );
}
