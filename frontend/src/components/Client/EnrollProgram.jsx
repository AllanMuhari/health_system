import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const EnrollProgram = () => {
  const { id } = useParams(); // Client ID
  const [programs, setPrograms] = useState([]);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [clientName, setClientName] = useState("");
  const [alreadyEnrolledPrograms, setAlreadyEnrolledPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramsAndClient = async () => {
      try {
        // Get all available programs
        const programsResponse = await api.get("/programs");
        setPrograms(programsResponse.data.data.programs || []);

        // Get client info and their enrolled programs
        const clientResponse = await api.get(`/clients/${id}`);
        const client = clientResponse.data.data.client;
        setClientName(`${client.firstName} ${client.lastName}`);

        // Get IDs of programs the client is already enrolled in
        const enrolledProgramIds = (client.programs || []).map((p) => p.id);
        setAlreadyEnrolledPrograms(enrolledProgramIds);
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

    if (selectedProgramIds.length === 0) {
      alert("Please select at least one program");
      return;
    }

    try {
      // Make separate enrollment requests for each program
      const enrollmentPromises = selectedProgramIds.map((programId) =>
        api.post(`/clients/${id}/enroll`, { programId })
      );

      await Promise.all(enrollmentPromises);
      navigate(`/clients/${id}`); // Go back to the profile page
    } catch (error) {
      console.error("Error enrolling client:", error);
      alert("Failed to enroll client in selected programs");
    }
  };

  // Filter out programs that the client is already enrolled in
  const availablePrograms = programs.filter(
    (program) => !alreadyEnrolledPrograms.includes(program.id)
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">
          Enroll {clientName} in Programs
        </h2>

        {availablePrograms.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Client is already enrolled in all available programs.
            </p>
            <button
              onClick={() => navigate(`/clients/${id}`)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
              Return to Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {availablePrograms.map((program) => (
              <div
                key={program.id}
                className="flex items-center p-3 border border-gray-200 rounded-md">
                <input
                  type="checkbox"
                  id={`program-${program.id}`}
                  value={program.id}
                  checked={selectedProgramIds.includes(program.id)}
                  onChange={() => handleProgramSelect(program.id)}
                  className="mr-3 h-5 w-5"
                />
                <div>
                  <label
                    htmlFor={`program-${program.id}`}
                    className="text-gray-700 font-medium block">
                    {program.name}
                  </label>
                  <p className="text-sm text-gray-500">{program.description}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(`/clients/${id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-md">
                Cancel
              </button>
              <button
                type="submit"
                disabled={selectedProgramIds.length === 0}
                className={`${
                  selectedProgramIds.length > 0
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                } text-white py-2 px-6 rounded-md`}>
                Enroll Selected Programs
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnrollProgram;
