import { useState, useEffect } from "react";
import ClientList from "../components/clients/ClientList";
import ClientForm from "../components/clients/ClientForm";
import { getClients } from "../services/clientService";
import Button from "../components/ui/Button";
import { PlusIcon } from "@heroicons/react/outline";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleNewClient = (newClient) => {
    setClients([...clients, newClient]);
    setShowForm(false);
  };

  if (loading) {
    return <div className="flex justify-center mt-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        <Button onClick={() => setShowForm(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Client
        </Button>
      </div>

      {showForm && (
        <ClientForm
          onSuccess={handleNewClient}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ClientList clients={clients} />
    </div>
  );
};

export default Clients;
