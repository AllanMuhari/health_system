import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await api.get("/programs");
      setPrograms(response.data.data.programs);
    };

    fetchPrograms();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Programs
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {programs.map((program) => (
              <li
                key={program.id}
                className="flex flex-col p-4 border border-gray-300 rounded-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800">
                  {program.name}
                </h3>
                <p className="text-gray-600">{program.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
