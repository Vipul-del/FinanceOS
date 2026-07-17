import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

export const FinanceContext = createContext();

const emptyFinanceData = {
  income: {
    salary: 0,
    otherIncome: 0,
  },
  expenses: [],
  investments: [],
  loans: {
    homeLoan: {
      originalAmount: 0,
      outstanding: 0,
      interestRate: 0,
      tenureYears: 0,
      emi: 0,
    },
    otherLoans: 0,
  },
  assets: {
    bankBalance: 0,
    emergencyFund: 0,
    propertyValue: 0,
  },
  budgets: [],
};

export function FinanceProvider({ children }) {
  const { user } = useAuth();

  const [financeData, setFinanceData] = useState(emptyFinanceData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFinanceData() {
      if (!user) {
        setFinanceData(emptyFinanceData);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("finance_data")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error(error);
        setLoading(false);
        return;
      }

      if (data) {
        setFinanceData(data.data);
      } else {
        await saveFinanceData(emptyFinanceData);
      }

      setLoading(false);
    }

    loadFinanceData();
  }, [user]);

  async function saveFinanceData(newData) {
    if (!user) return false;

    const { error } = await supabase.from("finance_data").upsert({
      user_id: user.id,
      data: newData,
    });

    if (error) {
      console.error("Save failed", error);
      return false;
    }

    setFinanceData(newData);
    return true;
  }

  const addExpense = async (expense) => {
    const updated = {
      ...financeData,
      expenses: [
        ...financeData.expenses,
        {
          id: Date.now(),
          ...expense,
        },
      ],
    };

    return await saveFinanceData(updated);
  };

  const deleteExpense = async (id) => {
    const updated = {
      ...financeData,
      expenses: financeData.expenses.filter((e) => e.id !== id),
    };

    return await saveFinanceData(updated);
  };

  const addInvestment = async (investment) => {
    const updated = {
      ...financeData,
      investments: [
        ...financeData.investments,
        {
          id: Date.now(),
          ...investment,
        },
      ],
    };

    return await saveFinanceData(updated);
  };

  const deleteInvestment = async (id) => {
    const updated = {
      ...financeData,
      investments: financeData.investments.filter((i) => i.id !== id),
    };

    return await saveFinanceData(updated);
  };

  return (
    <FinanceContext.Provider
      value={{
        financeData,
        setFinanceData: saveFinanceData,
        addExpense,
        deleteExpense,
        addInvestment,
        deleteInvestment,
        loading,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}