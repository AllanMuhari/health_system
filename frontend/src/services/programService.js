import api from "./api";

export const getPrograms = async () => {
  const response = await api.get("/programs");
  return response.data.data.programs;
};

export const getProgram = async (id) => {
  const response = await api.get(`/programs/${id}`);
  return response.data.data.program;
};

export const createProgram = async (programData) => {
  const response = await api.post("/programs", programData);
  return response.data.data.program;
};

export const updateProgram = async (id, programData) => {
  const response = await api.patch(`/programs/${id}`, programData);
  return response.data.data.program;
};
