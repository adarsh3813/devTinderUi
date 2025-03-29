import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // const [feed, setFeed] = useState();
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_BACKEND_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.feed));
      // setFeed(response.data.feed);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center mt-2">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
