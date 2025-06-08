import axios from "axios";
import { useState } from "react";
import { BASE_BACKEND_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";
import { SuccessToast } from "./utils/UtillComponents";

const UserFeedCard = ({ user }) => {
  const dispatch = useDispatch();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_BACKEND_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setShowSuccessToast(true);
      dispatch(removeUserFromFeed(userId));
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  };

  return (
    <>
      <div className="w-[60vw] bg-gray-950 flex items-center justify-center pr-4">
        <div className="shadow-2xl rounded-lg overflow-hidden w-full max-w-sm">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {/* Name & Age Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <div className="flex items-center justify-around p-4">
                <button
                  className="bg-red-100 text-red-500 p-4 rounded-full hover:bg-red-200 transition"
                  onClick={() => handleRequest("ignored", user._id)}
                >
                  ❌
                </button>
                <button
                  className="bg-green-100 text-green-500 p-4 rounded-full hover:bg-green-200 transition"
                  onClick={() => handleRequest("interested", user._id)}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-16 text-white h-full flex flex-col gap-7">
          <div>
            <h2 className="text-2xl sm:text-xl font-bold">
              {user.firstName} {user.lastName}, {user.age}
            </h2>
            <p className="text-sm mt-3">{user.gender}</p>
          </div>
          <div className="flex gap-3 my-2">
            {user.skills.map((skill, index) => (
              <div key={index} className="badge badge-soft badge-accent">
                #{skill}
              </div>
            ))}
          </div>
          <div>
            <h3 className="lg:text-lg font-semibold mb-1">About Me</h3>
            <p className="text-white text-sm">{user.about}</p>
          </div>
        </div>
      </div>
      {showSuccessToast && <SuccessToast message={message} />}
    </>
  );
};

export default UserFeedCard;
