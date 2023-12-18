import { useEffect, useState } from "react";
import {
  fetchListingById,
  fetchProfileByName,
  postListingBid,
} from "../../lib/api";
import CountdownTimer from "../countDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-regular-svg-icons";

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
      <div className="flex flex-col lg:flex-row mt-8 text-left lg:items-center pt-12">
        <div className="lg:w-1/2 mb-4 lg:mb-0 lg:pl-10">
          <h1 className="text-3xl font-bold mb-4 sm:order-1 pb-3">
            {listing.title}
          </h1>
          <div className="seller flex flex-row items-center gap-3 font-light pb-3">
            <p className="text-lg">
              Listed by:{" "}
              <span style={{ fontWeight: "bold" }}>{listing.seller.name}</span>
            </p>
            <img
              src={listing.seller.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {highestBid && (
            <div className="pt-2" key={highestBid.id}>
              <p className="text-lg">
                Highest bid:<br></br>{" "}
                <span className="font-bold">{highestBid.bidderName}</span>,{" "}
                <span className="font-bold" style={{ color: "green" }}>
                  {highestBid.amount} C
                </span>
              </p>
            </div>
          )}

          <div className="text-lg pt-6 flex items-center">
            <CountdownTimer endsAt={listing.endsAt} />
            <FontAwesomeIcon
              icon={faHourglassHalf}
              style={{
                color: "green",
                height: "20px",
                paddingLeft: "3px",
              }}
            />
          </div>
          {(listing.seller.name == localStorage.getItem("user_name") && (
            <>
              <h2>Cannot place bid on your own listings.</h2>
            </>
          )) ||
            (localStorage.getItem("token") && (
              <>
                <div className="flex flex-col lg:flex-row mt-4 sm:order-2">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={handleInputChange}
                    className="inputField border border-gray-300 rounded-md p-2 mb-2 lg:mr-2 lg:mb-0 text-lg"
                    placeholder="Enter amount"
                  />
                  <button
                    onClick={() => placeBid()}
                    className="actionButton bg-gray-600 text-white px-4 rounded-md text-lg"
                  >
                    Place bid
                  </button>
                </div>
                <p className="text-lg font-semibold pt-2">
                  My credit: {credits}{" "}
                </p>
              </>
            ))}
        </div>

        <div className="lg:w-1/2 lg:order-first">
          <img
            src={listing.media}
            className="w-full h-full max-w-full max-h-[500px] object-cover object-center rounded-lg shadow-2xl shadow-gray-800"
            alt={listing.title}
          />
        </div>
      </div>
      <div className="mt-4 text-left py-6">
        <div className="bg-white rounded-lg shadow-md p-4 lg:w-[50%]">
          <div className="mb-10">
            <h2 className="text-turq text-lg font-bold mb-2">Description</h2>
            <p className="mb-4">{listing.description}</p>
          </div>
          <div>
            <h2 className="text-turq text-lg font-bold mb-2">Tags</h2>
            <p>{listing.tags.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-4">
        <table className="w-full border-t border-b border-gray-300">
          <thead className="text-turq">
            <tr>
              <th className="p-3 font-bold border">Bidder Name</th>
              <th className="p-3 font-bold border">Time of Bid</th>
              <th className="p-3 font-bold border">Bid Amount</th>
            </tr>
          </thead>
          <tbody>
            {listing.bids.toReversed().map((bid, index) => (
              <tr
                key={bid.id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition`}
              >
                <td className="p-3 font-semibold border">{bid.bidderName}</td>
                <td className="p-3 border">
                  {new Date(bid.created).toLocaleTimeString()}{" "}
                  {new Date(bid.created).toLocaleDateString()}
                </td>
                <td className="p-3 font-semibold border">{bid.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListingDetails;
