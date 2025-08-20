import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Import the new component
import AgentList from '../components/dashboard/AgentList'; 
import AddAgentForm from '../components/dashboard/AddAgentForm';
import UploadListForm from '../components/dashboard/UploadListForm';
import DistributedLists from '../components/dashboard/DistributedLists';

const DashboardPage = () => {
  const [lists, setLists] = useState([]);
  const [agents, setAgents] = useState([]); // State for agents
  const navigate = useNavigate();

  // --- NEW FUNCTION to fetch agents ---
  const fetchAgents = useCallback(async () => {
    try {
      const res = await api.get('/agents');
      setAgents(res.data);
    } catch (err) {
      console.error('Error fetching agents:', err);
    }
  }, []);

  const fetchLists = useCallback(async () => {
    try {
      const res = await api.get('/lists');
     // Console.log('Fetched lists:', res.data);
      setLists(res.data);
    } catch (err) {
     // console.error('Error fetching lists:', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  }, []);

  useEffect(() => {
    // Fetch both lists and agents when the component mounts
    fetchLists();
    fetchAgents();
  }, [fetchLists, fetchAgents]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- NEW FUNCTION to handle agent deletion ---
  const handleDeleteAgent = async (agentId) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      try {
        await api.delete(`/agents/${agentId}`);
        // Remove the agent from the state to update the UI instantly
        setAgents(agents.filter((agent) => agent._id !== agentId));
      } catch (err) {
        console.error('Failed to delete agent:', err);
        alert('Could not delete agent. They might be associated with distributed tasks.');
      }
    }
  };
  
  // Callback for when a new agent is added successfully
  const onAgentAdded = (newAgent) => {
    setAgents([...agents, newAgent]);
  }

  return (
    <div className="page-container">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      </header>
      <div className="dashboard-content">
        {/* Pass the onAgentAdded callback to the form */}
        <AddAgentForm onAgentAdded={onAgentAdded} />
        <UploadListForm onUploadSuccess={fetchLists} />
      </div>

      {/* --- RENDER THE NEW AGENT LIST COMPONENT --- */}
      <AgentList agents={agents} onDelete={handleDeleteAgent} />

      <DistributedLists lists={lists} />
    </div>
  );
};

export default DashboardPage;