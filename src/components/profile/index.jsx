import { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchProfileByName, putUpdateEntryMedia } from "../../lib/api";
import CountdownTimer from "../countDown";
import { Link } from "@tanstack/react-router";

const Card = ({ children }) => (
  <div className="bg-white p-8 rounded-md shadow-md mb-4 flex-grow w-full">
    {children}
  </div>
);

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatar"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [profile, setProfile] = useState({
    avatar: localStorage.getItem("avatar"),
    listings: [],
    credits: 0,
  });
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchProfileByName(userName);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  const handleAvatarChange = async () => {
    if (imageURL === "") return;
    const data = await putUpdateEntryMedia(
      localStorage.getItem("user_name"),
      imageURL
    );
    setAvatarUrl(data.avatar);
    localStorage.setItem("avatar", data.avatar);
  };

  const handleInputChange = (event) => {
    setImageURL(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isBidActive = (endTime) => {
    return new Date() < new Date(endTime);
  };

  return (
    <div className="flex flex-col lg:flex-row mt-8 text-left lg:items-start">
      {/* Left Side */}
      <div className="lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
        <Card>
          <div className="mt-1 flex items-center justify-center text-center">
            <div className="relative">
              <p className="text-lg font-semibold pb-5">{profile?.name}</p>
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-48 h-48 object-cover rounded-full mx-auto mb-2 cursor-pointer"
                onClick={openModal}
              />
              <p className="text-sm font-semibold py-3">
                Use an URL to change your profile photo:
              </p>
              <div className="flex ml-2">
                <input
                  type="url"
                  value={imageURL}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Image URL"
                />
                <button
                  className="ml-2 bg-gray-800 hover:bg-turq text-white py-2 px-4 rounded-md cursor-pointer"
                  onClick={() => handleAvatarChange()} // Trigger file input
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-800">My credit:</p>
            <span className="text-turq font-semibold">${profile?.credits}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-800">Listings:</p>
            <span className="text-turq font-semibold">
              {profile?.listings.length}
            </span>
          </div>
        </Card>
      </div>

      {/* Right Side */}
      <div className="lg:w-2/3">
        <Card>
          <p className="text-gray-800">Your listings</p>
          <div className="flex justify-center">
            <table className="w-full border-t border-b border-gray-300">
              <thead className="text-turq">
                <tr>
                  <th className="p-3 font-bold">Title</th>
                  <th className="p-3 font-bold hidden sm:block">Description</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {profile?.listings?.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition`}
                  >
                    <td className="p-3 font-semibold">
                      <Link
                        to={`/listingdetails?productId=${item.id}`}
                        className="text-black hover:text-turq"
                      >
                        {item?.title}
                      </Link>
                    </td>
                    <td className="p-3 hidden sm:block">{item?.description}</td>
                    <td className="p-3 font-semibold">
                      {isBidActive(item.endsAt) ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                      {/* Hide on small screens, show on screens larger than or equal to small (sm) */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Photo"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            background: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            padding: "0",
          },
        }}
      >
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-full h-full object-contain p-6"
        />
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Profile;
