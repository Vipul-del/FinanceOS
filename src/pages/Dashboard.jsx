import React from 'react';
import { useFinance } from '../context/FinanceContext';

export default function Dashboard() {
  const { userData } = useFinance();

  // Defensive check: if userData isn't loaded yet, show a loading state
  if (!userData) {
    return <div className="p-10 text-center text-gray-500">Loading your financial vault...</div>;
  }

  const { profile, incomes, expenses, investments, loans, budgetLimit } = userData;

  // Safe calculations
  const totalIncome = (incomes || []).reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = (expenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const monthlySavings = totalIncome - totalExpenses;

  const totalInvAmount = (investments || []).reduce((sum, i) => sum + Number(i.invested || 0), 0);
  const totalCurrentVal = (investments || []).reduce((sum, i) => sum + Number(i.current || 0), 0);
  const totalProfitLoss = totalCurrentVal - totalInvAmount;
  const totalLoans = (loans || []).reduce((sum, l) => sum + Number(l.balance || 0), 0);
  const netWorth = totalCurrentVal - totalLoans;

  return (
    <div className="p-6 space-y-6">
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold">Good Evening, {profile.name || 'User'} 👋</h2>
        <p className="text-slate-400 mt-2">Your current Net Worth is <strong className="text-emerald-400">₹{netWorth.toLocaleString()}</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-bold uppercase">Total Investments</p>
          <p className="text-2xl font-black mt-2">₹ {totalCurrentVal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-bold uppercase">Monthly Income</p>
          <p className="text-2xl font-black mt-2 text-emerald-600">₹ {totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-bold uppercase">Monthly Expenses</p>
          <p className="text-2xl font-black mt-2 text-rose-600">₹ {totalExpenses.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}