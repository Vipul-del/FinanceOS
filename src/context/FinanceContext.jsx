import { createContext, useEffect, useState } from "react";

export const FinanceContext = createContext();

const defaultFinanceData = {
  income: {
    salary: 100000,
    otherIncome: 0,
  },

  expenses: [
    {
      id: 1,
      category: "Home",
      amount: 20000,
    },
    {
      id: 2,
      category: "Food",
      amount: 10000,
    },
  ],

  investments: [
    {
      id: 1,
      type: "Mutual Funds",
      amount: 800000,
    },
    {
      id: 2,
      type: "FD / RD",
      amount: 200000,
    },
  ],

  loans: {
    homeLoanOutstanding: 3500000,
    emi: 30000,
  },
};

export function FinanceProvider({ children }) {
  const [financeData, setFinanceData] = useState(() => {
    const savedData = localStorage.getItem("financeos-data");

    if (savedData) {
      return JSON.parse(savedData);
    }

    return defaultFinanceData;
  });

  useEffect(() => {
    localStorage.setItem(
      "financeos-data",
      JSON.stringify(financeData)
    );
  }, [financeData]);

  return (
    <FinanceContext.Provider
      value={{
        financeData,
        setFinanceData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}