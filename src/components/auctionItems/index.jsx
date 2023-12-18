import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { fetchAllListings } from "../../lib/api";
import CountdownTimer from "../countDown";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const AuctionItems = () => {
  const dummypicture =
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";
  const [products, setProducts] = useState([]);
  const [pageNumber, setPagenumber] = useState(0);
  const [tag, setTag] = useState("");
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

  const handleInputChange = (event) => {
    setTag(event.target.value);
  };
  const searchListings = async () => {
    try {
      const response = await fetchAllListings(tag);
      setProducts(response);
      setPagenumber(0);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
  const navigateListings = async (direction) => {
    try {
      console.log(pageNumber + direction);
      if (direction + pageNumber < 0) {
        console.error("Cannot go back when you`re on page one.");
        return;
      }
      const response = await fetchAllListings(tag, direction + pageNumber);
      setPagenumber(direction + pageNumber);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Active listings
        </h2>
        <div className="flex flex-col lg:flex-row mt-4 sm:order-2">
          <input
            type="text"
            value={tag}
            onChange={handleInputChange}
            className="inputField border border-gray-300 rounded-md p-2 mb-2 lg:mr-2 lg:mb-0 text-lg"
            placeholder="Search tag"
          />
          <button
            onClick={() => searchListings()}
            className="actionButton bg-gray-600 text-white px-4 rounded-md text-lg"
          >
            Search
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {!products[0] && (
            <p>No results to show, try searching for something else.</p>
          )}
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden shadow-md rounded-md p-4"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Link to={`/listingdetails?productId=${product.id}`}>
                  <img
                    src={product.media[0] ? product.media[0] : dummypicture}
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
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm pt-4"
          aria-label="Pagination"
        >
          {pageNumber > 0 && (
            <a
              onClick={() => navigateListings(-1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span>Prev</span>
            </a>
          )}
          <div className="px-5"></div>
          <a
            onClick={() => navigateListings(1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span>Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default AuctionItems;
