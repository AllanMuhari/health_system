import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await api.get("/programs");
        setPrograms(response.data.data.programs);
        setError("");
      } catch (error) {
        console.error("Error fetching programs:", error);
        setError("Failed to load programs");
      } finally {
        setLoading(false);
      }
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
        setError("Failed to delete program");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-700">Programs</h2>
          <div className="flex space-x-4">
            <Link
              to="/programs/create"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
              Create New Program
            </Link>
            <Link
              to="/clients"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              View Clients
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="text-center py-10">Loading programs...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No programs found.</p>
              <Link
                to="/programs/create"
                className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Create Your First Program
              </Link>
            </div>
          ) : (
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
                    <div className="flex space-x-4">
                      <Link
                        to={`/programs/edit/${program.id}`}
                        className="text-blue-500 hover:underline">
                        Edit
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
