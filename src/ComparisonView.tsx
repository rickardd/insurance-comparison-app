import React from "react";
import { useAppStore } from "./store/appStore";
import { useGetCompaniesByIds } from "./api/useRequests";

interface ComparisonViewProps {
  selectedCompanies: string[];
}

const ComparisonView: React.FC<ComparisonViewProps> = () => {
  const selectedInsurances = useAppStore((state) => state.selectedInsurances);

  const filteredCompanies = useGetCompaniesByIds(selectedInsurances);

  console.log(selectedInsurances, filteredCompanies);

  return (
    <div>
      <h2>Comparison of Selected Companies</h2>
      {selectedInsurances.length === 0 ? (
        <p>No companies selected for comparison.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Company Name</th>
              <th>Contact Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies?.map((company) => (
              <tr key={company.companyId}>
                <td>{company.companyId}</td>
                <td>{company.company_name}</td>
                <td>{company.contact_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComparisonView;
