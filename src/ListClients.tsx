import React, { useState } from "react";
import { useGetClients } from "./api/useRequests";
import { Link, useNavigate } from "react-router-dom";

const ListClients: React.FC = () => {
  const { data: clients = [], isLoading } = useGetClients();

  if (isLoading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <h2>List of Insurance Clients</h2>
      <table>
        <thead>
          <tr>
            <th>ClientID</th>
            <th>BrokerID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId}>
              <td>{client.clientId}</td>
              <td>{client.brokerId}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <Link to={`/edit-client/${client.clientId}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListClients;
