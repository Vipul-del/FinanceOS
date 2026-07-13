import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function RecentExpenses() {
  const { financeData } = useContext(FinanceContext);

  const recentExpenses = [...financeData.expenses]
    .reverse()
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Expenses
      </h2>

      {recentExpenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses found.
        </p>
      ) : (
        recentExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center border-b py-3 last:border-none"
          >
            <span>{expense.category}</span>

            <span className="font-semibold">
              ₹ {expense.amount.toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentExpenses;