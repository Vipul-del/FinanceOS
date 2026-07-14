import { useContext } from "react";

import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";



function Reports() {


  const { financeData } = useContext(FinanceContext);




  const income =

    Number(financeData.income?.salary || 0) +

    Number(financeData.income?.otherIncome || 0);





  const expenses =

    (financeData.expenses || [])

      .reduce(

        (sum,item)=>

          sum + Number(item.amount || 0),

        0

      );





  const emi =

    Number(

      financeData.loans?.homeLoan?.emi || 0

    );





  const savings =

    income -

    expenses -

    emi;





  const savingsRate =

    income > 0

    ?

    Math.round(

      (savings / income) * 100

    )

    :

    0;






  const investments =

    (financeData.investments || [])

    .reduce(

      (sum,item)=>

        sum + Number(item.currentValue || item.amount || 0),

      0

    );





  return (

    <div className="space-y-8">


      <Header

        title="Monthly Report"

        subtitle="Understand your financial performance."

      />






      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            Income
          </p>

          <h2 className="text-3xl font-bold">

            ₹ {income.toLocaleString()}

          </h2>

        </div>





        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            Expenses
          </p>

          <h2 className="text-3xl font-bold">

            ₹ {expenses.toLocaleString()}

          </h2>

        </div>





        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            Savings
          </p>

          <h2 className="text-3xl font-bold">

            ₹ {savings.toLocaleString()}

          </h2>

        </div>



      </div>







      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <div className="bg-white p-6 rounded-xl shadow">


          <h2 className="text-xl font-semibold">

            Savings Rate

          </h2>


          <p className="text-5xl font-bold mt-4">

            {savingsRate}%

          </p>


        </div>





        <div className="bg-white p-6 rounded-xl shadow">


          <h2 className="text-xl font-semibold">

            Investment Portfolio

          </h2>


          <p className="text-3xl font-bold mt-4">

            ₹ {investments.toLocaleString()}

          </p>


        </div>



      </div>




    </div>

  );

}


export default Reports;