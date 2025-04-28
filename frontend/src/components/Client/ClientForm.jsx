import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const ClientForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get("/programs");
        setPrograms(response.data.data.programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchClient = async () => {
        try {
          const response = await api.get(`/clients/${id}`);
          const client = response.data.data.client;
          setFirstName(client.firstName);
          setLastName(client.lastName);
          setEmail(client.email);
          setPhone(client.phone);
          setAddress(client.address || "");
          setGender(client.gender || "");

          // Handle date format for display
          if (client.dateOfBirth) {
            // Format the date for the date input (YYYY-MM-DD)
            const date = new Date(client.dateOfBirth);
            setDateOfBirth(date.toISOString().split("T")[0]);
          }

          setSelectedPrograms(client.programs.map((p) => p.id));
        } catch (error) {
          console.error("Error fetching client:", error);
        }
      };
      fetchClient();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the date as ISO string if it exists
      const formattedDate = dateOfBirth
        ? new Date(dateOfBirth).toISOString()
        : null;

      const payload = {
        firstName,
        lastName,
        dateOfBirth: formattedDate,
        gender,
        address,
        phone,
        email,
      };

      if (isEditing) {
        await api.patch(`/clients/${id}`, payload);
      } else {
        await api.post("/clients", payload);
      }
      navigate("/clients");
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  const handleProgramChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedPrograms(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          {isEditing ? "Edit Client" : "Create Client"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>

          {/* Programs Dropdown */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="programs">
              Enroll in Programs
            </label>
            <select
              id="programs"
              multiple
              value={selectedPrograms}
              onChange={handleProgramChange}
              className="w-full p-3 border border-gray-300 rounded-md">
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Hold Ctrl (Windows) or Command (Mac) to select multiple programs.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
            {isEditing ? "Update Client" : "Create Client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
