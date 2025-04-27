import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProgramForm = ({ match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (match.params.id) {
      setIsEditing(true);
      const fetchProgram = async () => {
        try {
          const response = await api.get(`/programs/${match.params.id}`);
          setName(response.data.data.program.name);
          setDescription(response.data.data.program.description);
        } catch (error) {
          console.error("Error fetching program:", error);
        }
      };
      fetchProgram();
    }
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/programs/${match.params.id}`, { name, description });
      } else {
        await api.post("/programs", { name, description });
      }
      navigate("/programs");
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          {isEditing ? "Edit Program" : "Create Program"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Program Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Program Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
              {isEditing ? "Update Program" : "Create Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
