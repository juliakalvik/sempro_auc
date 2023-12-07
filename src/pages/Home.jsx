import AuctionItems from "../components/auctionItems/index.jsx";
import CountdownTimer from "../components/countDown/index.jsx";
import Header from "../components/navbar_wide/index.jsx";

export default function HomeTest() {
  return (
    <>
      <Header />
      <CountdownTimer />
      <h2>Home page</h2>
      <AuctionItems />
    </>
  );
}
