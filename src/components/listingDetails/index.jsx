import { useEffect, useState } from "react";
import {
  fetchListingById,
  fetchProfileByName,
  postListingBid,
} from "../../lib/api";
import CountdownTimer from "../countDown";

const ListingDetails = () => {
  const [listing, setListing] = useState();
  const [bidAmount, setbidAmount] = useState(0);
  const [credits, setCreditsAmount] = useState(localStorage.getItem("credits"));
  const params = new URLSearchParams(new URL(window.location.href).search);
  const productId = params.get("productId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchListingById(productId);
      setListing(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (event) => {
    setbidAmount(event.target.value);
  };

  const placeBid = async () => {
    try {
      await postListingBid(productId, bidAmount);
      const data = await fetchListingById(productId);
      setListing(data);
      const creditData = await fetchProfileByName(
        localStorage.getItem("user_name")
      );
      setCreditsAmount(creditData.credits);
      localStorage.setItem("credits", creditData.credits);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  const highestBid = listing.bids
    ? listing.bids.slice().sort((a, b) => b.amount - a.amount)[0]
    : null;

  return (
    <>
      <div className="flex flex-col lg:flex-row mt-8 text-left lg:items-center">
        <div className="lg:w-1/2 mb-4 lg:mb-0 lg:pl-10">
          <h1 className="text-2xl mb-2 sm:order-1 pb-3">{listing.title}</h1>
          <div className="seller flex flex-row items-center gap-3 font-light pb-3">
            <p>Listed by: {listing.seller.name}</p>
            <img
              src={listing.seller.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {highestBid && (
            <div className="pt-1" key={highestBid.id}>
              <p>
                Highest bid: {highestBid.bidderName}, {highestBid.amount} C
              </p>
            </div>
          )}

          <div className="font-light">
            <CountdownTimer endsAt={listing.endsAt} />
          </div>
          <div className="flex flex-col lg:flex-row mt-4 sm:order-2">
            <input
              type="number"
              value={bidAmount}
              onChange={handleInputChange}
              className="inputField border border-gray-300 rounded-md p-2 mb-2 lg:mr-2 lg:mb-0"
              placeholder="Enter amount"
            />
            <button
              onClick={() => placeBid()}
              className="actionButton bg-gray-600 text-white px-4 rounded-md"
            >
              Submit
            </button>
          </div>
          <p>Your credit: {credits} </p>
        </div>
        <div className="lg:w-1/2 lg:order-first">
          <img
            src={listing.media}
            className="h-full w-full lg:max-h-1/2 object-cover object-center lg:h-full lg:w-full rounded-lg shadow-2xl shadow-gray-800"
            alt={listing.title}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-2">{listing.description}</p>

        {listing.tags}
      </div>
      <div className="mt-4 lg:w-1/3 md:w-1/3">
        <table className="w-full" id="bidTable">
          <thead>
            <tr>
              <th className="border p-2">Bidder Name</th>
              <th className="border p-2">Time of Bid</th>
              <th className="border p-2">Bid Amount</th>
            </tr>
            {listing.bids.toReversed().map((bid) => {
              return (
                <tr key={bid.id}>
                  <td>{bid.bidderName}</td>
                  <td>
                    {new Date(bid.created).toLocaleTimeString()}{" "}
                    {new Date(bid.created).toLocaleDateString()}
                  </td>
                  <td>{bid.amount}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </>
  );
};

export default ListingDetails;
