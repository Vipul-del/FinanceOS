import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";


function FinancialSummary() {


  const { financeData } = useContext(FinanceContext);



  const income =
    Number(financeData.income.salary) +
    Number(financeData.income.otherIncome || 0);



  const expenses =
    financeData.expenses.reduce(
      (sum,item)=>sum + Number(item.amount),
      0
    );



  const emi =
    Number(financeData.loans.emi);



  const savings =
    income - expenses - emi;



  const savingsRate =
    income > 0
      ? Math.round(
          (savings/income)*100
        )
      : 0;



  const debtRatio =
    income > 0
      ? Math.round(
          (emi/income)*100
        )
      : 0;



  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500">
          Savings Rate
        </p>

        <h2 className="text-3xl font-bold">
          {savingsRate}%
        </h2>

      </div>




      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500">
          Debt Ratio
        </p>

        <h2 className="text-3xl font-bold">
          {debtRatio}%
        </h2>

      </div>




      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500">
          Monthly Savings
        </p>

        <h2 className="text-3xl font-bold">

          ₹ {savings.toLocaleString()}

        </h2>

      </div>


    </div>

  );

}


export default FinancialSummary;