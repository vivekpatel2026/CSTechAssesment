import React from 'react';

const DistributedLists = ({ lists }) => {
  if (!lists || lists.length === 0) {
    return (
      <div className="card">
        <h3>Distributed Tasks</h3>
        <p>No lists have been distributed yet. Upload a file to begin.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Distributed Tasks</h3>
      <div className="agent-lists-container">
        {lists.map(({ agent, items }) => (
          <div key={agent._id} className="agent-card">
            <h3>{agent.name}</h3>
            <p>{agent.email}</p>
            <ul className="task-list">
              {items.map((item) => (
                <li key={item._id}>
                  <strong>{item.firstName}</strong> - {item.phone}
                  <p> <strong>Notes: </strong>{item.notes}</p>  
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DistributedLists;