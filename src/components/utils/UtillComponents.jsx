export const SuccessToast = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>{message}.</span>
      </div>
    </div>
  );
};

export const ErrorToast = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-error">
        <span>{message}.</span>
      </div>
    </div>
  );
};
