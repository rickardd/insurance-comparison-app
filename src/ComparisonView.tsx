import React from "react";

interface ComparisonViewProps {
  selectedCompanies: string[];
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ selectedCompanies }) => {
  return (
    <div>
      <h2>Comparison of Selected Companies</h2>
      {selectedCompanies.length === 0 ? (
        <p>No companies selected for comparison.</p>
      ) : (
        <ul>
          {selectedCompanies.map((companyId) => (
            <li key={companyId}>Company ID: {companyId}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComparisonView;
