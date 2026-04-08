import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-4">
      <h1 className="text-center text-4xl p-5 mb-2 font-bold text-white leading-tight">
        Quiz!
      </h1>
      <div className="flex gap-2">
        <Link to="/create">
          <button className="px-4 py-2 bg-amber-600 hover:bg-indigo-600 text-white rounded">
            Create
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 bg-amber-600 hover:bg-indigo-600 text-white rounded">
            Login/Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
