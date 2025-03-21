import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

interface Client {
  clientId: string;
  brokerId: string;
  name: string;
  email: string;
}

export const useGetClients = () => {
  const fetchClients = async (): Promise<Client[]> => {
    const clientsCollection = collection(db, "clients");
    const clientSnapshot = await getDocs(clientsCollection);

    return clientSnapshot.docs.map((doc) => ({
      clientId: doc.id,
      ...doc.data(),
    })) as Client[];
  };

  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
};
