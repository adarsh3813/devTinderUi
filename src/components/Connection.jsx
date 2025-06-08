import axios from "axios";
import { useEffect, useState } from "react";
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
        <div className="w-[55%] flex-col flex justify-center mt-4">
          {connections.map((connection) => {
            const { firstName, lastName, skills, age, gender, photoUrl } =
              connection;
            return (
              <div
                key={firstName}
                className="grid grid-flow-col gap-2 bg-base-300 my-3 rounded-lg items-center"
              >
                <div className="max-w-30">
                  <img alt="photo" src={photoUrl} className="rounded-md" />
                </div>
                <div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {firstName + " " + lastName + ", " + age}
                    </h2>
                    {gender && <p>{gender}</p>}
                  </div>
                  <div className="flex gap-2 flex-wrap mt-5">
                    {skills.map((skill, index) => {
                      return (
                        <div
                          key={index}
                          className="badge badge-soft badge-accent"
                        >
                          #{skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary">Chat 💬</button>
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
