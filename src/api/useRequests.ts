import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

interface Client {
  clientId: string;
  brokerId: string;
  name: string;
  email: string;
}

export const useGetClients = () => {
  const { user } = useAuthStore();

  const userId = user?.uid;
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
