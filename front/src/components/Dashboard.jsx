import React, { useState, useEffect, useCallback } from "react";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "Website",
    urgencyLevel: "Low",
    previousInteractions: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        } else {
          setLeads([]);
        }
      })
      .catch((err) => console.error("Error fetching leads:", err));
  }, []);

  // ✅ Wrap in useCallback to prevent unnecessary re-renders
  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newLead = await response.json();
        setLeads((prevLeads) => [...prevLeads, newLead]);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          source: "Website",
          urgencyLevel: "Low",
          previousInteractions: 0,
        });
        alert("Lead submitted successfully! ✅");
      } else {
        alert("Error submitting lead. ❌");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Failed to submit lead. Check console for details. ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-4">Leads Dashboard</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Enquiry Form</h3>
        <input className="block w-full p-2 border rounded mb-2" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input className="block w-full p-2 border rounded mb-2" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="block w-full p-2 border rounded mb-2" type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <textarea className="block w-full p-2 border rounded mb-2" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
        <select className="block w-full p-2 border rounded mb-2" name="source" value={formData.source} onChange={handleChange}>
          <option value="Website">Website</option>
          <option value="Chatbot">Chatbot</option>
          <option value="API">API</option>
        </select>
        <select className="block w-full p-2 border rounded mb-2" name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input className="block w-full p-2 border rounded mb-2" type="number" name="previousInteractions" placeholder="Previous Interactions" value={formData.previousInteractions} onChange={handleChange} />
        <button className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Message</th>
              <th className="p-3">Source</th>
              <th className="p-3">Urgency</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.message}</td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3">{lead.urgencyLevel}</td>
                  <td className="p-3 font-bold text-blue-600">{lead.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">No leads found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
