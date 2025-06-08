import axios from "axios";
import { useEffect } from "react";
import { BASE_BACKEND_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import { NoMoreUser } from "./utils/UtillComponents";
import UserFeedCard from "./UserFeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_BACKEND_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.feed));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed?.length > 0 ? (
    <div className="flex w-full justify-center items-center h-[80vh]">
      <UserFeedCard user={feed[0]} showActions={true} />
    </div>
  ) : (
    <NoMoreUser />
  );
};

export default Feed;
