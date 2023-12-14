import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { fetchAllListings } from "../../lib/api";
import CountdownTimer from "../countDown";

const AuctionItems = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetchAllListings();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Active listings
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden shadow-md rounded-md p-4"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Link to={`/listingdetails?productId=${product.id}`}>
                  <img
                    src={product.media}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </Link>
              </div>

              <div className="flex py-3">
                <h3 className="text-md font-bold text-gray-700">
                  {product.title}
                </h3>
                <p className="ml-auto text-sm text-right text-turq">
                  Bids: {product._count.bids}
                </p>
              </div>

              <p className="font-medium text-gray-900 text-left">
                <CountdownTimer endsAt={product.endsAt}></CountdownTimer>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionItems;
