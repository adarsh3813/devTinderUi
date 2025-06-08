export const SuccessToast = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success bg-green-800 text-white">
        <span>{message}.</span>
      </div>
    </div>
  );
};

export const ErrorToast = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-error bg-red-700 text-white">
        <span>{message}.</span>
      </div>
    </div>
  );
};

export const NoMoreUser = () => {
  return (
    <div className="h-[80vh] w-[100vw] flex justify-center items-center">
      <h1 className="text-3xl">No more Active Users fow now ☹️</h1>
    </div>
  );
};
