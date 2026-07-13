import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";


function FinanceProfile(){

  const { financeData, setFinanceData } = useContext(FinanceContext);


  const [salary, setSalary] = useState(
    financeData.income.salary
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
        salary:Number(salary)
      },


      loans:{
        ...financeData.loans,
        homeLoanOutstanding:Number(loan),
        emi:Number(emi)
      }

    });


    alert("Financial details saved ✅");

  }



  return (

    <div>


      <h1 className="text-3xl font-bold mb-6">
        Financial Profile
      </h1>



      <div className="bg-white p-6 rounded-xl shadow max-w-xl">


        <label className="block mb-2">
          Monthly Salary
        </label>


        <input
          type="number"
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
          className="border p-3 rounded w-full mb-5"
        />



        <label className="block mb-2">
          Home Loan Outstanding
        </label>


        <input
          type="number"
          value={loan}
          onChange={(e)=>setLoan(e.target.value)}
          className="border p-3 rounded w-full mb-5"
        />



        <label className="block mb-2">
          Monthly EMI
        </label>


        <input
          type="number"
          value={emi}
          onChange={(e)=>setEmi(e.target.value)}
          className="border p-3 rounded w-full mb-5"
        />



        <button

          onClick={saveDetails}

          className="bg-gray-900 text-white px-5 py-3 rounded"

        >

          Save Details

        </button>


      </div>


    </div>

  )

}


export default FinanceProfile;