import { useContext, useState } from "react";

import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";

function Investments() {
  const { financeData, setFinanceData } = useContext(FinanceContext);

  const [type, setType] = useState("Mutual Funds");
  const [amount, setAmount] = useState("");

  const addInvestment = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newInvestment = {
      id: Date.now(),
      type,
      amount: Number(amount),
    };

    setFinanceData({
      ...financeData,
      investments: [...financeData.investments, newInvestment],
    });

    setAmount("");
  };

  const deleteInvestment = (id) => {
    setFinanceData({
      ...financeData,
      investments: financeData.investments.filter(
        (investment) => investment.id !== id
      ),
    });
  };

  return (
    <div>
      <Header
        title="Investments"
        subtitle="Manage and track all your investments."
      />

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <Select
          label="Investment Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            "Mutual Funds",
            "Stocks",
            "FD / RD",
            "PPF",
            "Gold",
            "Emergency Fund",
            "Others",
          ]}
        />

        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter investment amount"
        />

        <Button onClick={addInvestment}>
          Add Investment
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Investment History
        </h2>

        {financeData.investments.length === 0 ? (
          <p className="text-gray-500">
            No investments added.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-center p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {financeData.investments.map((investment) => (
                <tr
                  key={investment.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {investment.type}
                  </td>

                  <td className="p-3">
                    ₹ {investment.amount.toLocaleString()}
                  </td>

                  <td className="text-center p-3">
                    <Button
                      variant="danger"
                      onClick={() =>
                        deleteInvestment(investment.id)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Investments;