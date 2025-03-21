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

interface Company {
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
