import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../constants";
import { ErrorToast, SuccessToast } from "./utils/UtillComponents";

const Requests = () => {
  const [requests, setRequests] = useState();
  const [acceptedToast, setAcceptedToast] = useState(false);
  const [rejectedToast, setRejectedToast] = useState(false);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/user/request/received", {
        withCredentials: true,
      });
      //   console.log(res);
      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequestReview = async (status, reqId) => {
    try {
      const res = await axios.post(
        BASE_BACKEND_URL + "/request/review/" + status + "/" + reqId,
        {},
        { withCredentials: true }
      );
      console.log(res);

      showToast(status);
      updateRequest(reqId);
    } catch (err) {
      console.log(err);
    }
  };

  const showToast = (status) => {
    if (status === "accepted") {
      setAcceptedToast(true);
      setTimeout(() => {
        setAcceptedToast(false);
      }, 1500);
    } else {
      setRejectedToast(true);
      setTimeout(() => {
        setRejectedToast(false);
      }, 1500);
    }
  };

  const updateRequest = (reqId) => {
    const newReqArr = requests.filter((req) => req._id !== reqId);
    setRequests(newReqArr);
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="w-1/2 text-center mx-auto">
        <h1 className="text-2xl text-white my-3">No requests to show</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-3xl text-white my-3">Requests</h1>
      </div>
      {requests && (
        <div className="w-3/4 flex-col flex justify-center mt-4">
          {requests.map((request) => {
            const { firstName, lastName, about, age, gender, photoUrl } =
              request.fromUserId;
            return (
              <div
                key={firstName}
                className="grid grid-flow-col gap-4 bg-base-300 my-3 rounded-lg items-center"
              >
                <div className="max-w-36">
                  <img alt="photo" src={photoUrl} className="rounded-md" />
                </div>
                <div className="p-5">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {firstName + " " + lastName + ", " + age}
                    </h2>
                    <p className="font-light my-2">{about}</p>
                    {gender && <p>Gender: {gender}</p>}
                  </div>
                  <div className="flex items-center gap-5">
                    <button
                      className="btn btn-outline btn-accent my-2"
                      onClick={() =>
                        handleRequestReview("accepted", request._id)
                      }
                    >
                      Accept ✅
                    </button>
                    <button
                      className="btn btn-outline btn-secondary"
                      onClick={() =>
                        handleRequestReview("rejected", request._id)
                      }
                    >
                      Reject ❌
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {acceptedToast && <SuccessToast message={"Connection Accepted"} />}
      {rejectedToast && <ErrorToast message={"Connection Rejected"} />}
    </div>
  );
};

export default Requests;
