import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-10 p-10 w-2/3 mx-auto">
      <div className="carousel carousel-vertical rounded-box h-96">
        <div className="carousel-item h-full">
          <img src={user.photoUrl} />
        </div>
      </div>
      <div className="bg-base-300 w-96 shadow-sm card-body">
        <div>
          <h2 className="text-3xl font-mono">
            {user.firstName} {user.lastName}
          </h2>
          <p className="font-light text-lg">{user.about}</p>
        </div>
        <div>
          <div className="my-2">
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender ? user.gender : "Others"}</p>
          </div>
          <div className="my-2">
            <p>Your interests:</p>
            {user.skills.map((skill, index) => (
              <div key={index} className="badge badge-soft badge-accent mr-1">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/profile/edit")}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
