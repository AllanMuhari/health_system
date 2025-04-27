import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await api.get("/clients");
      setClients(response.data.data.clients);
    };

    fetchClients();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Clients
        </h2>
        <ul className="space-y-4">
          {clients.map((client) => (
            <li
              key={client.id}
              className="p-4 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300">
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium text-gray-800">
                  {client.firstName} {client.lastName}
                </div>
                <div className="text-sm text-gray-500">{client.email}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
