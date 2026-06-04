import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-max py-4 px-2 bg-white text-center">
      <p className="m-4">Page not found</p>
      <Link to="/">
        <button className="btn btn-blue">Go to front page</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
