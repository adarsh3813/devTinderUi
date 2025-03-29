import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../constants";

const Connection = () => {
  const [connections, setConnections] = useState();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="w-1/2 text-center mx-auto">
        <h1 className="text-2xl text-white my-3">No connections to show</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-3xl text-white my-3">Connections</h1>
      </div>
      {connections && (
        <div className="w-2/3 flex-col flex justify-center mt-4">
          {connections.map((connection) => {
            const { firstName, lastName, about, age, gender, photoUrl } =
              connection;
            return (
              <div
                key={firstName}
                className="grid grid-flow-col gap-4 bg-base-300 my-3 p-2 rounded-lg items-center"
              >
                <div className="max-w-56">
                  <img alt="photo" src={photoUrl} className="rounded-full" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {firstName + " " + lastName}
                  </h2>
                  <p className="font-light my-2">{about}</p>
                  {gender && <p>Gen: {gender}</p>}
                  {age && <p>Age: {age}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connection;
