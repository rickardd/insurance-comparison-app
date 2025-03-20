import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

interface CreateClientProps {
  brokerId: string;
}

const CreateClient: React.FC<CreateClientProps> = ({ brokerId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "clients"), {
        name,
        email,
        brokerId,
      });
      // Clear form or redirect
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Client Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Client Email" required />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default CreateClient;
