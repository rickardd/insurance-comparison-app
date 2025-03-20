import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

interface EditClientProps {
  clientId: string;
  onClientUpdated: () => void;
}

const EditClient: React.FC<EditClientProps> = ({ clientId, onClientUpdated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      const clientDoc = doc(db, "clients", clientId);
      const clientData = await getDoc(clientDoc);
      if (clientData.exists()) {
        setName(clientData.data()?.name);
        setEmail(clientData.data()?.email);
      }
    };
    fetchClient();
  }, [clientId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientDoc = doc(db, "clients", clientId);
    await updateDoc(clientDoc, { name, email });
    onClientUpdated();
  };

  const handleDelete = async () => {
    const clientDoc = doc(db, "clients", clientId);
    await deleteDoc(clientDoc);
    onClientUpdated();
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Client Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Client Email" required />
        <button type="submit">Update Client</button>
      </form>
      <button onClick={handleDelete}>Delete Client</button>
    </div>
  );
};

export default EditClient;
