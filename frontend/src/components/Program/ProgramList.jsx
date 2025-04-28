import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await api.get("/programs");
      setPrograms(response.data.data.programs);
    };

    fetchPrograms();
  }, []);

  const handleDelete = async (programId) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await api.delete(`/programs/${programId}`);
        setPrograms(programs.filter((p) => p.id !== programId));
      } catch (error) {
        console.error("Error deleting program:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-700">Programs</h2>
          <button
            onClick={() => navigate("/clients")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            View Clients List
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {programs.map((program) => (
              <li
                key={program.id}
                className="flex flex-col p-4 border border-gray-300 rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {program.name}
                    </h3>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/programs/${program.id}`}
                      className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(program.id)}
                      className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
