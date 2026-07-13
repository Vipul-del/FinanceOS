import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function RecentInvestments() {
  const { financeData } = useContext(FinanceContext);

  const recentInvestments = [...financeData.investments]
    .reverse()
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Investments
      </h2>

      {recentInvestments.length === 0 ? (
        <p className="text-gray-500">
          No investments found.
        </p>
      ) : (
        recentInvestments.map((investment) => (
          <div
            key={investment.id}
            className="flex justify-between items-center border-b py-3 last:border-none"
          >
            <span>{investment.type}</span>

            <span className="font-semibold text-green-600">
              ₹ {investment.amount.toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentInvestments;