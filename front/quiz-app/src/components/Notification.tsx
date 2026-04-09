import { useAppSelector } from "../store/hooks";
import { notification } from "../store/selectors";

const Notification = () => {
  const message = useAppSelector(notification);

  if (message === null) {
    return null;
  }
  return (
    <div className="bg-green-500 text-white rounded text-center mx-auto my-2 w-1/3 px-4 py-2">
      {message}
    </div>
  );
};

export default Notification;
