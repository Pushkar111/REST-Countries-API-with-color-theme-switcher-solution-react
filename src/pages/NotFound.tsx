import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-2xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-lg text-gray-500 mb-8">
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;