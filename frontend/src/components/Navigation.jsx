import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  // Simple function to determine if a link is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Program Management System</div>
        <div className="flex space-x-6">
          <Link
            to="/programs"
            className={`hover:text-blue-300 ${
              isActive("/programs") ? "text-blue-400 underline" : ""
            }`}>
            Programs
          </Link>
          <Link
            to="/clients"
            className={`hover:text-blue-300 ${
              isActive("/clients") ? "text-blue-400 underline" : ""
            }`}>
            Clients
          </Link>
          <Link
            to="/clients/create"
            className={`hover:text-blue-300 ${
              isActive("/clients/create") ? "text-blue-400 underline" : ""
            }`}>
            Create Clients
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
