import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_BACKEND_URL } from "../constants";
import { useEffect } from "react";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const getUser = async () => {
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/profile/view", {
        withCredentials: true,
      });

      if (!res.data.data) {
        navigate("/login");
      }
      dispatch(addUser(res.data.data));
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
