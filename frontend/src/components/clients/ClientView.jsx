import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/outline";
import ClientForm from "./ClientForm";

const ClientView = ({ client, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  if (!client) {
    return <div className="text-center mt-8">Client not found</div>;
  }

  if (editMode) {
    return (
      <ClientForm
        client={client}
        onSuccess={(updatedData) => {
          onUpdate(updatedData);
          setEditMode(false);
        }}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/clients"
            className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Clients
          </Link>
          <Button onClick={() => setEditMode(true)}>
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {client.firstName} {client.lastName}
            </h2>
            <div className="mt-4 space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Gender:
                </span>
                <span className="ml-2 capitalize">{client.gender}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Date of Birth:
                </span>
                <span className="ml-2">
                  {new Date(client.dateOfBirth).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Contact Information
            </h3>
            <div className="mt-4 space-y-2">
              {client.email && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <span className="ml-2">{client.email}</span>
                </div>
              )}
              {client.phone && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Phone:
                  </span>
                  <span className="ml-2">{client.phone}</span>
                </div>
              )}
              {client.address && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Address:
                  </span>
                  <p className="ml-2">{client.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">
            Enrolled Programs
          </h3>
          <div className="mt-4">
            {client.enrolledPrograms?.length > 0 ? (
              <ul className="space-y-2">
                {client.enrolledPrograms.map((program) => (
                  <li key={program.id} className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {program.name}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(program.enrollmentDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No programs enrolled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientView;
