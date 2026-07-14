import { useContext } from "react";

import { FinanceContext } from "../../context/FinanceContext";


function FinancialHealth() {


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




  const investments =

    (financeData.investments || [])

      .reduce(

        (sum,item)=>

          sum +

          Number(

            item.currentValue ||

            item.amount ||

            0

          ),

        0

      );





  let score = 0;



  if(income > 0){

    score += 30;

  }



  if(expenses < income * 0.5){

    score += 25;

  }



  if(investments > 0){

    score += 25;

  }



  if(emi < income * 0.4){

    score += 20;

  }



  let color = "text-red-500";


  if(score >= 80){

    color="text-green-600";

  }

  else if(score >=60){

    color="text-yellow-500";

  }




  return (

    <div className="bg-white rounded-xl shadow p-6">


      <h2 className="text-xl font-semibold mb-4">

        Financial Health

      </h2>




      <div className={`text-5xl font-bold ${color}`}>

        {score}

      </div>




      <p className="mt-3 text-gray-600">

        Your financial health score based on savings,
        investments and debt management.

      </p>




      <div className="mt-6">


        <div className="flex justify-between mb-2">

          <span>
            Health Score
          </span>

          <span>
            {score}%
          </span>

        </div>




        <div className="w-full bg-gray-200 rounded-full h-3">


          <div

            className="bg-green-600 h-3 rounded-full"

            style={{
              width:`${score}%`
            }}

          />

        </div>


      </div>



    </div>

  );

}


export default FinancialHealth;