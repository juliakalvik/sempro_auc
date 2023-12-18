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
  const [order, setOrder] = useState("new");
  const [status, setStatus] = useState("all");
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

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const searchListings = async () => {
    try {
      const response = await fetchAllListings(tag, 0, order, status);
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
      const response = await fetchAllListings(
        tag,
        direction + pageNumber,
        order,
        status
      );
      setPagenumber(direction + pageNumber);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <div>
      {localStorage.getItem("token") && (
        <div
          className="pt-32  flex justify-end ml-10 absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tl from-turq to-yellow opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 99.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
          EXPLORE
        </h2>
        <div className="flex flex-col lg:flex-row mt-4 sm:order-2">
          <input
            type="text"
            value={tag}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && searchListings()}
            className="inputField border border-gray-300 rounded-md p-2 mb-2 lg:mr-2 lg:mb-0 text-lg"
            placeholder="Search tag"
          />

          <div>
            {localStorage.getItem("token") && (
              <select
                className="border border-gray-300 rounded-md p-4 mb-2 lg:mr-2 lg:mb-0 text-lg"
                onChange={handleStatusChange}
              >
                <option value="all">All listings</option>
                <option value="active">Active listings</option>
              </select>
            )}

            <select
              className="border border-gray-300 rounded-md p-4 mb-2 lg:mr-2 lg:mb-0 text-lg"
              onChange={handleOrderChange}
            >
              <option value="new">Newest</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
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

              <div className="font-medium text-gray-900 text-left">
                <CountdownTimer endsAt={product.endsAt}></CountdownTimer>
              </div>
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
