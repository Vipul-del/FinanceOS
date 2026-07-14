import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";


function FinanceProfile() {


  const {
    financeData,
    setFinanceData
  } = useContext(FinanceContext);



  const [salary, setSalary] = useState(
    financeData.income.salary
  );


  const [otherIncome, setOtherIncome] = useState(
    financeData.income.otherIncome || 0
  );


  const [loan, setLoan] = useState(
    financeData.loans.homeLoanOutstanding
  );


  const [emi, setEmi] = useState(
    financeData.loans.emi
  );



  function saveDetails(){


    setFinanceData({

      ...financeData,


      income:{

        ...financeData.income,

        salary:Number(salary),

        otherIncome:Number(otherIncome)

      },


      loans:{

        ...financeData.loans,

        homeLoanOutstanding:Number(loan),

        emi:Number(emi)

      }


    });



    alert("Financial details saved ✅");

  }





  const totalIncome =
    Number(salary) +
    Number(otherIncome);



  const totalExpenses =
    financeData.expenses.reduce(
      (sum,item)=>sum + item.amount,
      0
    );



  const monthlySavings =
    totalIncome -
    totalExpenses -
    Number(emi);




  return (

    <div className="space-y-8">


      <Header

        title="Financial Profile"

        subtitle="Manage your income and financial details."

      />




      <div className="bg-white p-6 rounded-xl shadow max-w-xl">


        <label className="block mb-2">

          Monthly Salary

        </label>


        <input

          type="number"

          value={salary}

          onChange={(e)=>
            setSalary(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />





        <label className="block mb-2">

          Other Income

        </label>


        <input

          type="number"

          value={otherIncome}

          onChange={(e)=>
            setOtherIncome(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />





        <label className="block mb-2">

          Home Loan Outstanding

        </label>


        <input

          type="number"

          value={loan}

          onChange={(e)=>
            setLoan(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />





        <label className="block mb-2">

          Monthly EMI

        </label>


        <input

          type="number"

          value={emi}

          onChange={(e)=>
            setEmi(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />





        <button

          onClick={saveDetails}

          className="bg-gray-900 text-white px-5 py-3 rounded"

        >

          Save Details

        </button>



      </div>





      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">



        <div className="bg-white p-5 rounded-xl shadow">

          <p className="text-gray-500">

            Monthly Income

          </p>


          <h2 className="text-2xl font-bold">

            ₹ {totalIncome.toLocaleString()}

          </h2>


        </div>





        <div className="bg-white p-5 rounded-xl shadow">

          <p className="text-gray-500">

            Monthly Expenses

          </p>


          <h2 className="text-2xl font-bold">

            ₹ {totalExpenses.toLocaleString()}

          </h2>


        </div>





        <div className="bg-white p-5 rounded-xl shadow">

          <p className="text-gray-500">

            Available Savings

          </p>


          <h2 className="text-2xl font-bold">

            ₹ {monthlySavings.toLocaleString()}

          </h2>


        </div>



      </div>



    </div>

  );

}


export default FinanceProfile;