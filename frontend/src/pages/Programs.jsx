import { useState, useEffect } from "react";
import ProgramList from "../components/programs/ProgramList";
import ProgramForm from "../components/programs/ProgramForm";
import { getPrograms, createProgram } from "../services/programService";
import Button from "../components/ui/Button";
import { PlusIcon } from "@heroicons/react/outline";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleNewProgram = async (programData) => {
    try {
      const newProgram = await createProgram(programData);
      setPrograms([...programs, newProgram]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center mt-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Health Programs</h2>
        <Button onClick={() => setShowForm(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Program
        </Button>
      </div>

      {showForm && (
        <ProgramForm
          onSuccess={handleNewProgram}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ProgramList programs={programs} />
    </div>
  );
};

export default Programs;
