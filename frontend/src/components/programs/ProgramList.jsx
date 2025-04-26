import { Link } from "react-router-dom";
import { ClipboardListIcon } from "@heroicons/react/outline";

const ProgramList = ({ programs }) => {
  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No programs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => (
        <div
          key={program.id}
          className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ClipboardListIcon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {program.description || "No description"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to={`/programs/${program.id}`}
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

export default ProgramList;
