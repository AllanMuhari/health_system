import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients"); // Fetch clients from the API
        setClients(response.data.data.clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter(
    (client) =>
      `${client.firstName} ${client.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientClick = (id) => {
    navigate(`/clients/${id}`); // Navigate to client profile page
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Clients
      </h2>
      <div className="text-center w-full m-4">
        <Link
          to="/clients/create"
          className={`inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${
            isActive("/clients/create") ? "text-blue-400 underline" : ""
          }`}>
          Create Clients
        </Link>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => handleClientClick(client.id)}
            className="p-4 bg-white rounded-md shadow-md hover:bg-gray-50 cursor-pointer">
            <h3 className="text-lg font-semibold">
              {client.firstName} {client.lastName}
            </h3>
            <p className="text-sm text-gray-500">{client.email}</p>
            <p className="text-sm text-gray-500">{client.phone}</p>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No clients found.</p>
      )}
    </div>
  );
};

export default ClientsList;
