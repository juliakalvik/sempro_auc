import { useEffect, useState } from "react";
import { fetchListingById } from "../../lib/api";
import CountdownTimer from "../countDown";
import "./listingDetails.css";

const ListingDetails = () => {
  const [listing, setListing] = useState();
  const params = new URLSearchParams(new URL(window.location.href).search);
  const productId = params.get("productId");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchListingById(productId);
      setListing(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  // Render listing details using the fetched data

  return (
    <>
      <div className="parent">
        <div className="left">
          <img
            src={listing.media}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            alt={listing.title}
          />
          <p>{listing.description}</p>
          {listing.tags}
        </div>
        <div className="right">
          <h1>{listing.title}</h1>
          <p>Seller: username</p>
          <p>Highest bid: 8</p>
          <i>
            <CountdownTimer endsAt={listing.endsAt}></CountdownTimer>
          </i>
          <div className="addbid">
            <input
              type="number"
              className="inputField"
              placeholder="Enter amount"
            />
            <button className="actionButton">Submit</button>
          </div>
          <p>Your credit: cash</p>
        </div>
      </div>
      <div className="">
        <table id="bidTable">
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Time of Bid</th>
              <th>Bid Amount</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default ListingDetails;
