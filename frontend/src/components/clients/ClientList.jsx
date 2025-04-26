import { Link } from "react-router-dom";
import {
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  // EnvelopeIcon,
} from "@heroicons/react/outline";

const ClientList = ({ clients }) => {
  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No clients found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {client.firstName} {client.lastName}
                </h3>
                <p className="text-sm text-gray-500 truncate capitalize">
                  {client.gender}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="flex-shrink-0 mr-2 h-4 w-4" />
                <span>{new Date(client.dateOfBirth).toLocaleDateString()}</span>
              </div>
              {client.phone && (
                <div className="flex items-center text-sm text-gray-500">
                  <PhoneIcon className="flex-shrink-0 mr-2 h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
              )}
              {client.email && (
                <div className="flex items-center text-sm text-gray-500">
                  <EnvelopeIcon className="flex-shrink-0 mr-2 h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <Link
                to={`/clients/${client.id}`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
