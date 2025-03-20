import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

interface Company {
  companyId: string;
  company_name: string;
  contact_email: string;
}

const ListCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesCollection = collection(db, "insurance_companies");
      const companySnapshot = await getDocs(companiesCollection);
      const companyList = companySnapshot.docs.map((doc) => ({
        companyId: doc.id,
        ...doc.data(),
      })) as Company[];
      setCompanies(companyList);
    };
    fetchCompanies();
  }, []);

  const toggleSelection = (companyId: string) => {
    const newSelection = new Set(selectedCompanies);
    if (newSelection.has(companyId)) {
      newSelection.delete(companyId);
    } else {
      newSelection.add(companyId);
    }
    setSelectedCompanies(newSelection);
  };

  const handleCompare = () => {
    // You can implement the logic to navigate to the ComparisonView with selected companies
    console.log("Selected Companies for Comparison:", Array.from(selectedCompanies));
  };

  return (
    <div>
      <h2>List of Insurance Companies</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Contact Email</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.companyId}>
              <td>
                <input type="checkbox" checked={selectedCompanies.has(company.companyId)} onChange={() => toggleSelection(company.companyId)} />
              </td>
              <td>{company.company_name}</td>
              <td>{company.contact_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCompare}>Compare Selected Companies</button>
    </div>
  );
};

export default ListCompanies;
