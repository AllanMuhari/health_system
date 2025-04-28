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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programs</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/clients")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            View Clients List
          </button>
          <button
            onClick={() => navigate("/programs/create")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
            Add New Program
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {programs.map((program) => (
            <li key={program.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{program.name}</h2>
                  <p className="text-gray-600">{program.description}</p>
                </div>
                <div className="flex gap-3">
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
  );
};

export default ProgramList;
