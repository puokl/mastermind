import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-2xl">Page Not Found</p>
        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Visit our Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Missing;
