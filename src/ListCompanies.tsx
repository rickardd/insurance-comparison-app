import { useState } from "react";
import { useGetCompanies } from "./api/useRequests";

const ListCompanies: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());

  const { data: companies = [], isLoading } = useGetCompanies();

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
      <h2>List of Insurance Companies {isLoading && "LOADING..."}</h2>
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
