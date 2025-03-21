import { useState } from "react";
import { useGetCompanies } from "./api/useRequests";
import { useAppStore } from "./store/appStore";
import { useNavigate } from "react-router-dom";

const ListCompanies: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const { data: companies = [], isLoading } = useGetCompanies();
  const setSelectedInsurances = useAppStore((state) => state.setSelectedInsurances);
  // const history = useHistory();

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
    const selectedIds = Array.from(selectedCompanies);
    setSelectedInsurances(selectedIds);
    navigate("/compare-companies");
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
