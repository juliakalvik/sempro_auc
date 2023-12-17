import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { postNewListing } from "../../lib/api";

export default function NewListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    media: "",
    endsAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createListing = async (e) => {
    e.preventDefault();

    const requiredFields = ["title", "endsAt"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please enter ${field}.`;
      }
    });
    try {
      const postData = {
        ...formData,
        // Convert media to an array
        media: formData.media.split(",").map((item) => item.trim()),

        // Convert tags to an array
        tags: formData.tags.split(",").map((item) => item.trim()),
      };

      const response = await postNewListing(postData);

      // If response have id, it was a success.
      navigate({
        to: "/listingdetails?productId=" + response.id,
      });
    } catch (error) {
      console.log(error);
      console.error("Error during registration:");
    }
  };

  return (
    <form onSubmit={createListing} className="p-5">
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

      <div className="space-y-12 text-left">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            New Listing
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6  text-gray-900"
              >
                Listing title
              </label>
              <div className="mt-2">
                <div className="border-2 flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter title here"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-white block flex-1 rounded-md border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium leading-6  text-gray-900"
                >
                  Listing tag (Separate with comma)
                </label>
              </div>
              <div className="mt-2">
                <div className="border-2 flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ">
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter tag here"
                    value={formData.tags}
                    onChange={handleChange}
                    className="bg-white block flex-1 rounded-md border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Listing description
              </label>

              <div className="mt-2">
                <textarea
                  id="about"
                  name="description"
                  rows={3}
                  placeholder="Enter a description"
                  value={formData.description}
                  onChange={handleChange}
                  className="p-3 block w-full lg:max-w-md md:max-w-md rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Describe what you are selling
              </p>
            </div>
            <div className="col-span-full flex flex-wrap ">
              <div className="p-2">
                <label
                  htmlFor="deadline"
                  className=" block text-sm font-medium leading-6 text-gray-900"
                >
                  Deadline
                </label>
                <div className=" ">
                  <label htmlFor="datetimePicker">Choose Date and Time:</label>{" "}
                  <br></br>
                  <input
                    type="datetime-local"
                    required
                    name="endsAt"
                    value={formData.endsAt}
                    onChange={handleChange}
                    id="datetimePicker"
                  />
                </div>
              </div>
              <div className="col-span-full ">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900 p-2"
                >
                  Product photos (Separate with comma)
                </label>
                <label>Photo:</label>
                <input
                  type="text"
                  name="media"
                  placeholder="Enter image URL here."
                  value={formData.media}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Your listing is ready!
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            As soon as you click Save your listing goes live. Keep track under
            My Listings in your profile.
          </p>

          <div className="mt-10 space-y-10"></div>
        </div>
      </div>

      <div className="mt-2 flex gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold hover:border-turq leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-turq px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 hover:border-gray-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}
