import { useContext } from "react";
import {
  Wallet,
  TrendingUp,
  CreditCard,
  IndianRupee,
  PiggyBank,
} from "lucide-react";

import { FinanceContext } from "../context/FinanceContext";

import FinanceCard from "../components/FinanceCard";
import Header from "../components/common/Header";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import RecentInvestments from "../components/dashboard/RecentInvestments";
import FinancialHealth from "../components/dashboard/FinancialHealth";
import DashboardCharts from "../components/dashboard/DashboardCharts";

function Dashboard() {
  const { financeData } = useContext(FinanceContext);

  const totalInvestments = financeData.investments.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalExpenses = financeData.expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const monthlyIncome =
    Number(financeData.income.salary) +
    Number(financeData.income.otherIncome || 0);

  const monthlySavings =
    monthlyIncome -
    totalExpenses -
    Number(financeData.loans.emi);

  const netWorth =
    totalInvestments -
    Number(financeData.loans.homeLoanOutstanding);

  return (
    <div className="space-y-8">
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's your financial overview."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <FinanceCard
          title="Net Worth"
          value={`₹ ${netWorth.toLocaleString()}`}
          icon={<IndianRupee />}
        />
        <FinanceCard
          title="Income"
          value={`₹ ${monthlyIncome.toLocaleString()}`}
          icon={<Wallet />}
        />
        <FinanceCard
          title="Expenses"
          value={`₹ ${totalExpenses.toLocaleString()}`}
          icon={<CreditCard />}
        />
        <FinanceCard
          title="Savings"
          value={`₹ ${monthlySavings.toLocaleString()}`}
          icon={<PiggyBank />}
        />
        <FinanceCard
          title="Investments"
          value={`₹ ${totalInvestments.toLocaleString()}`}
          icon={<TrendingUp />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentExpenses />
        <RecentInvestments />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialHealth />
        <DashboardCharts />
      </div>
    </div>
  );
}

export default Dashboard;