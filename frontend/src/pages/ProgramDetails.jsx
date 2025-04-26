import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProgram, updateProgram } from "../services/programService";
import ProgramForm from "../components/programs/ProgramForm";
import Button from "../components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const ProgramDetails = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const data = await getProgram(id);
        setProgram(data);
      } catch (error) {
        console.error("Error fetching program:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const updatedProgram = await updateProgram(id, updatedData);
      setProgram(updatedProgram);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center mt-8">Loading...</div>;
  }

  if (!program) {
    return <div className="text-center mt-8">Program not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/programs"
          className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Programs
        </Link>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit Program"}
        </Button>
      </div>

      {editMode ? (
        <ProgramForm
          program={program}
          onSuccess={handleUpdate}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {program.name}
          </h2>
          {program.description && (
            <p className="text-gray-600 mb-4">{program.description}</p>
          )}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Enrolled Clients
            </h3>
            <p className="text-gray-500">
              Client enrollment functionality would go here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramDetails;
