import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="bg-[#6D2EB1] text-white py-3 px-6 rounded-lg shadow hover:bg-opacity-90 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;