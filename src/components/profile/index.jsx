import { useState } from "react";
import Modal from "react-modal";
import defaultAvatar from "/src/defaultAvatar.jpg";

const Card = ({ children }) => (
  <div className="bg-white p-8 rounded-md shadow-md mb-4 flex-grow w-full">
    {children}
  </div>
);

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        closeModal();
      };
      reader.readAsDataURL(file);
    }
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
              <input
                type="file"
                id="avatar"
                className="absolute w-full h-full opacity-0 cursor-pointer avatar-input"
                onChange={handleAvatarChange}
              />
              <button
                className="block bg-gray-800 hover:bg-turq text-white py-2 px-4 rounded-md cursor-pointer"
                onClick={() => document.getElementById("avatar").click()} // Trigger file input
              >
                Change Photo
              </button>
            </div>
          </div>
        </Card>

        {/* Overview Section */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-800">My credit:</p>
            <span className="text-turq font-semibold">$1,000.00</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-800">Listings:</p>
            <span className="text-turq font-semibold">10</span>
          </div>
        </Card>

        {/* Additional Section on the Right */}
        <Card>
          <p className="text-gray-800">
            Fetch a list of the users listings here
          </p>
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
