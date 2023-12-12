import { useEffect, useState } from "react";
import { fetchListingById } from "../../lib/api";
import CountdownTimer from "../countDown";

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
    <div>
      <h1>{listing.title}</h1>
      <img
        src={listing.media}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        alt={listing.title}
      />

      <i>
        <CountdownTimer endsAt={listing.endsAt}></CountdownTimer>
      </i>
      <p>{listing.description}</p>
      {/* Render other details */}
    </div>
  );
};

export default ListingDetails;
