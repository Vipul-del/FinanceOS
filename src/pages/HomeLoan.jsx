import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import Header from "../components/common/Header";

function HomeLoan() {
  const { financeData } = useContext(FinanceContext);

  return (
    <div>
      <Header
        title="Home Loan"
        subtitle="Manage and monitor your home loan."
      />

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Loan Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">Outstanding Loan</p>
            <h3 className="text-2xl font-bold mt-2">
              ₹ {financeData.loans.homeLoanOutstanding.toLocaleString()}
            </h3>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">Monthly EMI</p>
            <h3 className="text-2xl font-bold mt-2">
              ₹ {financeData.loans.emi.toLocaleString()}
            </h3>
          </div>

        </div>

        <div className="mt-8 rounded-lg border-2 border-dashed border-gray-300 p-6">
          <h3 className="text-xl font-semibold mb-3">
            🚀 Coming Next
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Interest Rate</li>
            <li>Remaining Tenure</li>
            <li>Loan Progress</li>
            <li>EMI Increase Simulator</li>
            <li>Extra EMI Calculator</li>
            <li>Interest Saved</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeLoan;