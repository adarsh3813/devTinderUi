import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-sm">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-full h-96 object-cover"
          />
          {/* Name & Age Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}, {user.age}
            </h2>
            <p className="text-sm">{user.gender}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 bg-gray-900 text-white">
          <h3 className="text-lg font-semibold mb-1">About Me</h3>
          <div className="flex gap-3 my-2">
            {user.skills.map((skill, index) => (
              <div key={index} className="badge badge-soft badge-accent">
                #{skill}
              </div>
            ))}
          </div>
          <p className="text-white text-sm">{user.about}</p>
          <div className="w-full flex justify-center mt-8">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
