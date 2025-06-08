const UserCard = ({ user }) => {
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm mb-3 pb-2">
        <div className="shadow-2xl rounded-lg overflow-hidden w-full max-w-sm">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user?.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {/* Name & Age Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h2 className="card-title">
                {user?.firstName + " " + user?.lastName + ", " + user?.age}
              </h2>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="flex gap-2 my-2">
            <div className="badge badge-secondary">
              {user?.gender ? user?.gender : "Others"}
            </div>
            {user?.skills.length > 0 && (
              <div className="card-actions">
                {user?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="badge badge-outline badge-primary"
                  >
                    #{skill}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="font-light">{user?.about}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
