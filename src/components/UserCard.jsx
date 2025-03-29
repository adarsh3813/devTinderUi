import axios from "axios";
import React, { useState } from "react";
import { BASE_BACKEND_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";
import { SuccessToast } from "./utils/UtillComponents";

const UserCard = ({ user }) => {
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
    <div>
      <div className="card bg-base-300 w-96 shadow-sm mb-3 pb-2">
        <figure>
          <img src={user.photoUrl} alt="User photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user.firstName + " " + user.lastName}
            <div className="badge badge-secondary">
              {user.gender ? user.gender : "Others"}
            </div>
            {user.age && <div className="badge badge-info">{user.age}Yrs</div>}
          </h2>
          <p className="font-light">{user.about}</p>
          <div className="card-actions">
            {user.skills.map((skill, index) => (
              <div key={index} className="badge badge-outline badge-primary">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around mt-1">
          <button
            className="btn btn-outline btn-accent"
            onClick={() => handleRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => handleRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
      {showSuccessToast && <SuccessToast message={message} />}
    </div>
  );
};

export default UserCard;
