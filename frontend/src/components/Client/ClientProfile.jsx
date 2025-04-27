import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const ClientProfile = () => {
  const { id } = useParams(); // Client ID from URL
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await api.get(`/clients/${id}`); // Adjust your API if needed
        setClient(response.data.data.client);
        setPrograms(response.data.data.client.programs || []); // Assuming programs are included
      } catch (error) {
        console.error("Error fetching client profile:", error);
      }
    };

    fetchClientProfile();
  }, [id]);

  if (!client) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">
          Client Profile
        </h2>

        <div className="space-y-2 mb-6">
          <p>
            <strong>Name:</strong> {client.firstName} {client.lastName}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Phone:</strong> {client.phone}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-3">Enrolled Programs</h3>
          {programs.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {programs.map((program) => (
                <li key={program.id}>
                  <span className="font-medium">{program.name}</span> —{" "}
                  {program.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No programs enrolled.</p>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to={`/clients/${client.id}/enroll`}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
            Enroll in Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
