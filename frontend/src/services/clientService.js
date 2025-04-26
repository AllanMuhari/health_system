import api from "./api";

export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data.data.clients;
};

export const getClient = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return response.data.data.client;
};

export const createClient = async (clientData) => {
  const response = await api.post("/clients", clientData);
  return response.data.data.client;
};

export const updateClient = async (id, clientData) => {
  const response = await api.patch(`/clients/${id}`, clientData);
  return response.data.data.client;
};

export const enrollClient = async (clientId, programId) => {
  const response = await api.post(`/clients/${clientId}/enroll`, { programId });
  return response.data.data.client;
};
