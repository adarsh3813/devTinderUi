import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_BACKEND_URL } from "../constants";
import { removeUser } from "./utils/userSlice";
import { removeFeed } from "./utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch((store) => store.user);

  const handleLogout = async () => {
    try {
      const res = axios.post(
        BASE_BACKEND_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-transparent shadow-sm px-10">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          💘CodeCrush
        </Link>
      </div>

      {user && (
        <>
          <div className="mx-10">
            <Link to={"/feed"}>
              <p className="font-semibold hover:underline">My Feed</p>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li>
                  <Link to={"/connections"} className="justify-between">
                    My Connections
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <Link to={"/login"} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
