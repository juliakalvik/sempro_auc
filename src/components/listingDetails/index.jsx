import { useEffect, useState } from "react";
import { fetchListingById, postListingBid } from "../../lib/api";
import CountdownTimer from "../countDown";

const ListingDetails = () => {
  const [listing, setListing] = useState();
  const [bidAmount, setbidAmount] = useState(0);
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
      const data = await postListingBid(productId, bidAmount);
      console.log(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 mb-4 lg:mb-0 ">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 sm:order-1">
            {listing.title}
          </h1>
          <p>Seller: username</p>
          <CountdownTimer endsAt={listing.endsAt} />
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
          <p>Your credit: cash</p>
        </div>
        <div className="lg:w-1/2 lg:order-first">
          <img
            src={listing.media}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-lg"
            alt={listing.title}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-2">{listing.description}</p>
        {/* Render your tags here */}
        {listing.tags}
      </div>
      <div className="mt-4">
        <table className="w-full" id="bidTable">
          <thead>
            <tr>
              <th className="border p-2">Bidder Name</th>
              <th className="border p-2">Time of Bid</th>
              <th className="border p-2">Bid Amount</th>
            </tr>
          </thead>
          <tbody>{/* Render your bid data here */}</tbody>
        </table>
      </div>
    </>
  );
};

export default ListingDetails;
