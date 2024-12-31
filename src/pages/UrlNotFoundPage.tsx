import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UrlNotFoundPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get('url') || 'Unknown URL';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">URL Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          This URL: <span className="text-red-500">{url}</span> does not exist. Please check the URL and try again.
        </p>
        <Link to="/" className="bg-[#6D2EB1] text-white py-3 px-6 rounded-lg shadow hover:bg-opacity-90 transition duration-300">
          Shorten your URL
        </Link>
      </div>
    </div>
  );
};

export default UrlNotFoundPage;