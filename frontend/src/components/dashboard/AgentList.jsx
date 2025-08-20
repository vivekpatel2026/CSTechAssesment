import React from 'react';

const AgentList = ({ agents, onDelete }) => {
  if (!agents || agents.length === 0) {
    return (
      <div className="card">
        <h3>All Agents</h3>
        <p>No agents have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>All Agents</h3>
      <table className="agent-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.mobile}</td>
              <td>
                <button
                  onClick={() => onDelete(agent._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;