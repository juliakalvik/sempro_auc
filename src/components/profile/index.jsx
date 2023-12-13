import { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchProfileByName, putUpdateEntryMedia } from "../../lib/api";
import CountdownTimer from "../countDown";

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
    if (imageURL == "") return;
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full md:flex md:flex-col md:items-start">
        {/* Avatar Section */}
        <Card>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-800"
          >
            Profile Photo
          </label>
          <div className="mt-1 flex items-center justify-center">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-2 cursor-pointer"
                onClick={openModal}
              />

              <button
                className="block bg-gray-800 hover:bg-turq text-white py-2 px-4 rounded-md cursor-pointer"
                onClick={() => handleAvatarChange()} // Trigger file input
              >
                Change Photo
              </button>
              <input type="url" value={imageURL} onChange={handleInputChange} />
            </div>
          </div>
        </Card>

        {/* Overview Section */}
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

        {/* Additional Section on the Right */}
        <Card>
          <p className="text-gray-800">
            Fetch a list of the users listings here
          </p>
          <p>hwlluu</p>
          {profile?.listings?.map((item) => {
            return (
              <>
                <hr></hr>
                <br></br>
                <h4>{item?.title}</h4>
                <p>{item?.description}</p>
                <CountdownTimer endsAt={item?.endsAt} />
              </>
            );
          })}
        </Card>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Profile Photo"
        >
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full object-contain"
          />
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
