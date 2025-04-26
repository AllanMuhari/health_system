import { useAuth } from "../context/AuthContext";
import  useApi  from "../hooks/UseApi";
import { ClipboardListIcon, UsersIcon } from "@heroicons/react/outline";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: clientsData } = useApi("/clients?limit=5");
  const { data: programsData } = useApi("/programs?limit=5");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Clients
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {clientsData?.results || 0} total
            </span>
          </div>
          {clientsData?.data?.clients?.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {clientsData.data.clients.map((client) => (
                <li key={client.id} className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {client.email || "No email"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">No clients found</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Health Programs
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {programsData?.results || 0} total
            </span>
          </div>
          {programsData?.data?.programs?.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {programsData.data.programs.map((program) => (
                <li key={program.id} className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ClipboardListIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {program.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {program.description || "No description"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">No programs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
