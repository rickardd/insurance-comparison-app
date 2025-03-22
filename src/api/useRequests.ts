import { db } from "../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserUid } from "../utils/utils";

interface Client {
  clientId: string;
  brokerId: string;
  name: string;
  email: string;
}

// GET CLIENTS
export const useGetClients = () => {
  const userId = getUserUid();
  const fetchClients = async (): Promise<Client[]> => {
    const clientsCollection = collection(db, "clients");
    const clientsQuery = query(clientsCollection, where("brokerId", "==", userId));
    const clientSnapshot = await getDocs(clientsQuery);

    return clientSnapshot.docs.map((doc) => ({
      clientId: doc.id,
      ...doc.data(),
    })) as Client[];
  };

  return useQuery({
    queryKey: ["clients", userId],
    queryFn: fetchClients,
    enabled: !!userId, // Only run the query if userId is truthy
  });
};

// GET CLIENT
export const useGetClientById = (clientId: string) => {
  const userId = getUserUid();
  const fetchClient = async (): Promise<Client> => {
    const clientDoc = doc(db, "clients", clientId);
    const clientSnapshot = await getDoc(clientDoc);

    return clientSnapshot.data() as Client;
  };

  return useQuery({
    queryKey: ["client", userId, clientId],
    queryFn: fetchClient,
    enabled: !!userId && !!clientId, // Only run the query if userId is truthy
  });
};

// UPDATE CLIENT
export const useUpdateClient = (clientId: string) => {
  const updateClient = async (clientData: Partial<Client>): Promise<void> => {
    const clientDoc = doc(db, "clients", clientId);
    await setDoc(clientDoc, clientData, { merge: true }); // Merge to update only specific fields
  };

  return useMutation({
    mutationFn: updateClient,
  });
};

// DELETE CLIENT
export const useDeleteClient = (clientId: string) => {
  const deleteClient = async () => {
    const clientDoc = doc(db, "clients", clientId);
    await deleteDoc(clientDoc);
  };

  return useMutation({
    mutationFn: deleteClient,
  });
};

export interface Company {
  companyId: string;
  company_name: string;
  contact_email: string;
}

export const useGetCompanies = () => {
  const fetchClients = async (): Promise<Company[]> => {
    const companiesCollection = collection(db, "insurance_companies");
    const companySnapshot = await getDocs(companiesCollection);

    return companySnapshot.docs.map((doc) => ({
      companyId: doc.id,
      ...doc.data(),
    })) as Company[];
  };

  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
};

export const useGetCompaniesByIds = (ids: string[]) => {
  const { data: companies } = useGetCompanies();

  return companies?.filter((company) => {
    return ids.includes(company.companyId);
  });
};
