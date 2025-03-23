import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRefreshToken, getUserUid } from "../utils/utils";
import { useEffect, useState } from "react";

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

// AUTHENTICATION - REQUEST NEW JSW ACCESS TOKEN

// ToDo: finalize and implement Implement

/**
 * Intended usage
 * 
 * 
  const myApiCall = async () => {
    if (!accessToken) return; // Ensure you have a valid access token

    const response = await fetch("YOUR_API_ENDPOINT", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("response", response);

    // Handle the response
  };
 */

/**
 * We will check wether access token has expired before each api call and on page refresh. 
 * Optionally, we could add a timer that checks e.g every 5 min.  
 * 
 * - On Each API Call: Before making an API call that requires authentication, check if the access token is expired. If it is, use the refresh token to get a new access token.
 * - Set a Timer: You can set a timer to refresh the token a few minutes before it expires. This way, you can ensure that you always have a valid access token without waiting for an API call to fail.
const myTokenTestComponent = () => { 
  const { accessToken, query } = useRefreshToken();

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error refreshing token: {query.error.message}</div>;

  const makeApiCall = async () => {
    if (!accessToken) return; // Ensure you have a valid access token

    const response = await fetch("YOUR_API_ENDPOINT", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div>
      <button onClick={makeApiCall}>Make API Call</button>
      {accessToken && <div>Access Token: {accessToken}</div>}
    </div>
  );

 }
 */

//  ToDO: Finilize and implement this
export const useRefreshToken = () => {
  const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
  const REFRESH_TOKEN = getRefreshToken();
  const CLIENT_ID = getUserUid();

  const [accessToken, setAccessToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState<number | null>(null);

  const refreshAccessToken = async () => {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    const expiresInSec = data.expires_in; // firebase sets 3600sec which is 1h.
    setAccessToken(data.id_token); // Store the new access token
    setExpirationTime(Date.now() + expiresInSec * 1000); // Expiration time in number of ms from now

    // debugger;

    console.log(expirationTime);

    return data; // Return the new tokens
  };

  const isTokenExpired = () => {
    console.log(expirationTime);
    return expirationTime ? Date.now() >= expirationTime : true; // If no expiration time, consider it expired
  };

  const query = useQuery({
    queryKey: ["refreshToken", REFRESH_TOKEN],
    queryFn: refreshAccessToken,
    enabled: !!REFRESH_TOKEN && isTokenExpired(), // Only run the query if refreshToken is truthy and token is expired
    retry: false, // Optionally disable retry on failure
  });

  // Optional: Set a timer to refresh the token a few minutes before it expires
  useEffect(() => {
    if (expirationTime) {
      const refreshTime = expirationTime - Date.now() - 5 * 60 * 1000; // Refresh 5 minutes before expiration
      if (refreshTime > 0) {
        const timer = setTimeout(() => {
          query.refetch(); // Refetch the token
        }, refreshTime);
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }
    }
  }, [expirationTime, query]);

  return { accessToken, refreshToken: REFRESH_TOKEN, query }; // Return the access token and query object
};
