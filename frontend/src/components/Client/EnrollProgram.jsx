import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const EnrollProgram = () => {
  const { id } = useParams(); // Client ID
  const [programs, setPrograms] = useState([]);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [clientName, setClientName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramsAndClient = async () => {
      try {
        const programsResponse = await api.get("/programs"); // Assuming you have an endpoint to list programs
        setPrograms(programsResponse.data.data.programs || []);

        const clientResponse = await api.get(`/clients/${id}`);
        setClientName(
          `${clientResponse.data.data.client.firstName} ${clientResponse.data.data.client.lastName}`
        );
      } catch (error) {
        console.error("Error fetching programs or client:", error);
      }
    };

    fetchProgramsAndClient();
  }, [id]);

  const handleProgramSelect = (programId) => {
    if (selectedProgramIds.includes(programId)) {
      setSelectedProgramIds(
        selectedProgramIds.filter((id) => id !== programId)
      );
    } else {
      setSelectedProgramIds([...selectedProgramIds, programId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/clients/${id}/enroll`, {
        programIds: selectedProgramIds,
      });
      navigate(`/clients/${id}`); // Go back to the profile page
    } catch (error) {
      console.error("Error enrolling client:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">
          Enroll {clientName} in Programs
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {programs.map((program) => (
            <div key={program.id} className="flex items-center">
              <input
                type="checkbox"
                id={`program-${program.id}`}
                value={program.id}
                checked={selectedProgramIds.includes(program.id)}
                onChange={() => handleProgramSelect(program.id)}
                className="mr-2"
              />
              <label
                htmlFor={`program-${program.id}`}
                className="text-gray-700">
                {program.name} — {program.description}
              </label>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
              Enroll Selected Programs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollProgram;
