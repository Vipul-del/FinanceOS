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



  const totalInvestments =

    (financeData.investments || []).reduce(

      (sum, item) =>

        sum + Number(item.currentValue || item.amount || 0),

      0

    );





  const totalExpenses =

    (financeData.expenses || []).reduce(

      (sum, item) =>

        sum + Number(item.amount || 0),

      0

    );





  const monthlyIncome =

    Number(financeData.income?.salary || 0) +

    Number(financeData.income?.otherIncome || 0);





  const emi =

    Number(

      financeData.loans?.homeLoan?.emi ||

      financeData.loans?.emi ||

      0

    );





  const monthlySavings =

    monthlyIncome -

    totalExpenses -

    emi;






  const assets = financeData.assets || {

    bankBalance:0,

    emergencyFund:0,

    propertyValue:0,

  };





  const liabilities = financeData.liabilities || {

    otherLoans:0,

  };





  const totalAssets =

    Number(assets.bankBalance || 0) +

    Number(assets.emergencyFund || 0) +

    Number(assets.propertyValue || 0) +

    totalInvestments;





  const homeLoanOutstanding =

    Number(

      financeData.loans?.homeLoan?.outstanding ||

      financeData.loans?.homeLoanOutstanding ||

      0

    );





  const totalLiabilities =

    homeLoanOutstanding +

    Number(liabilities.otherLoans || 0);





  const netWorth =

    totalAssets -

    totalLiabilities;







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