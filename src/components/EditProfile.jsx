import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import { ErrorToast, SuccessToast } from "./utils/UtillComponents";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age ? user.age : 0);
  const [gender, setGender] = useState(user.gender ? user.gender : "Others");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills ? user.skills : []);
  const [error, setError] = useState();
  const [showUpdateSuccessToast, setShowUpdateSuccessToast] = useState(false);
  const [showUpdateErrorToast, setShowUpdateErrorToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserEdit = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_BACKEND_URL + "/Profile/edit",
        { firstName, lastName, age, gender, photoUrl, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.details));
      setShowUpdateSuccessToast(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.message + "!!");
      setShowUpdateErrorToast(true);
      setTimeout(() => setShowUpdateErrorToast(false), 1500);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-10">
        <legend className="fieldset-legend">Edit Profile</legend>

        <label className="fieldset-label">First Name</label>
        <input
          type="text"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="fieldset-label">Last Name</label>
        <input
          type="text"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="fieldset-label">Age</label>
        <input
          type="number"
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label className="fieldset-label">Gender</label>
        <select
          className="select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option disabled={true}>Pick one..</option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>
        <label className="fieldset-label">About</label>
        <textarea
          className="textarea h-24"
          placeholder="Your about..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
        <label className="fieldset-label">Photo Url</label>
        <input
          type="text"
          className="input"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <p className="text-red-500 my-2 font-bold">{error}</p>
        {/* <label className="fieldset-label">Skills</label>
        <input type="text" className="input" value={skills} onChange={() => setSkills(e.target.value)}/> */}
        <button
          className="p-2 bg-pink-400 hover:bg-pink-600 rounded-lg"
          onClick={handleUserEdit}
        >
          Update
        </button>
        <button
          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg"
          onClick={() => navigate("/profile")}
        >
          Cancel update
        </button>
      </fieldset>
      <UserCard
        user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
      />
      {showUpdateSuccessToast && (
        <SuccessToast message={"Update done successfully"} />
      )}
      {showUpdateErrorToast && <ErrorToast message={"Update failed!!"} />}
    </div>
  );
};

export default EditProfile;
