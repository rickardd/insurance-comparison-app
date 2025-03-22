import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteClient, useGetClientById, useUpdateClient } from "./api/useRequests";

interface EditClientProps {
  onClientUpdated: () => void;
}

const EditClient: React.FC<EditClientProps> = () => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>(); // Ensure clientId is typed
  const { data: client, isLoading, error } = useGetClientById(clientId || "");

  const updateClientMutation = useUpdateClient(clientId || "");
  const deleteClientMutation = useDeleteClient(clientId || "");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
    }
  }, [client]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const updatedData = { name, email }; // updated values from state
    updateClientMutation.mutate(updatedData, {
      onSuccess: () => {
        console.log("Client updated successfully");

        navigate("/list-clients");

        // send a toast message
      },
      onError: (error) => {
        console.error("Error updating client:", error);
      },
    });
  };

  const handleDelete = () => {
    deleteClientMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Client deleted successfully");
        setIsDeleted(true);
      },
      onError: (error) => {
        console.error("Error deleting client:", error);
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isDeleted) {
    return (
      <>
        <div>Deleted!!!</div>
        <Link to="/list-clients">Go to clients</Link>
      </>
    );
  }

  if (error) {
    return <div>Error fetching client: {error.message}</div>;
  }

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Client Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Client Email" required />
        <button type="submit">submit</button>
        <button type="submit" disabled={updateClientMutation.isPending}>
          {updateClientMutation.isPending ? "Updating..." : "Update Client"}
        </button>
      </form>
      <button onClick={handleDelete} disabled={deleteClientMutation.isPending}>
        {deleteClientMutation.isPending ? "Deleting..." : "Delete Client"}
      </button>
    </div>
  );
};

export default EditClient;
