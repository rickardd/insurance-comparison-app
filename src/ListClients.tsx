import React, { useState } from "react";
import { useGetClients } from "./api/useRequests";

const ListClients: React.FC = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const { data: clients = [], isLoading } = useGetClients();

  const toggleSelection = (clientId: string) => {
    const newSelection = new Set(selectedClients);
    if (newSelection.has(clientId)) {
      newSelection.delete(clientId);
    } else {
      newSelection.add(clientId);
    }
    setSelectedClients(newSelection);
  };

  const handleCompare = () => {
    console.log("Selected Clients for Comparison:", Array.from(selectedClients));
  };

  if (isLoading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <h2>List of Insurance Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ClientID</th>
            <th>BrokerID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId}>
              <td>
                <input type="checkbox" checked={selectedClients.has(client.clientId)} onChange={() => toggleSelection(client.clientId)} />
              </td>
              <td>{client.clientId}</td>
              <td>{client.brokerId}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optionally display the current broker's email */}
      {/* {loading && <p>Current broker: {user?.email}</p>} */}
      <button onClick={handleCompare}>Compare Selected Clients</button>
    </div>
  );
};

export default ListClients;
