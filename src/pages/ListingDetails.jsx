import { useEffect, useState } from "react";
import { fetchListingById } from "../utils/api";

const ListingDetails = (listingId) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListingById(listingId);
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchData();
  }, [listingId]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  // Render listing details using the fetched data

  return (
    <div>
      <h1>{listing.title}hei</h1>
      {/* Render other details */}
    </div>
  );
};

export default ListingDetails;
