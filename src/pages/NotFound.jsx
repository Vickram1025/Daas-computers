import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
