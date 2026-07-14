import { useContext, useState } from "react";

import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";


function HomeLoan() {


  const {
    financeData,
    setFinanceData
  } = useContext(FinanceContext);



  const homeLoan =
    financeData.loans.homeLoan;




  const [originalAmount,setOriginalAmount] =
    useState(homeLoan.originalAmount);



  const [outstanding,setOutstanding] =
    useState(homeLoan.outstanding);



  const [interestRate,setInterestRate] =
    useState(homeLoan.interestRate);



  const [tenureYears,setTenureYears] =
    useState(homeLoan.tenureYears);



  const [emi,setEmi] =
    useState(homeLoan.emi);





  const saveLoanDetails = () => {


    setFinanceData(prev => ({


      ...prev,


      loans:{


        ...prev.loans,


        homeLoan:{


          originalAmount:Number(originalAmount),

          outstanding:Number(outstanding),

          interestRate:Number(interestRate),

          tenureYears:Number(tenureYears),

          emi:Number(emi),

        }

      }


    }));


    alert("Home loan details saved ✅");

  };






  const paidAmount =
    Number(originalAmount) -
    Number(outstanding);



  const paidPercentage =
    originalAmount > 0
      ? Math.round(
          (paidAmount / originalAmount) * 100
        )
      : 0;







  return (

    <div className="space-y-8">


      <Header

        title="Home Loan"

        subtitle="Track your loan progress."

      />





      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Original Loan
          </p>

          <h2 className="text-2xl font-bold">

            ₹ {Number(originalAmount).toLocaleString()}

          </h2>

        </div>





        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Outstanding
          </p>

          <h2 className="text-2xl font-bold">

            ₹ {Number(outstanding).toLocaleString()}

          </h2>

        </div>





        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Loan Paid
          </p>

          <h2 className="text-2xl font-bold">

            {paidPercentage}%

          </h2>

        </div>



      </div>






      <div className="bg-white rounded-xl shadow p-6 max-w-xl">


        <h2 className="text-xl font-semibold mb-5">

          Update Loan Details

        </h2>




        <label>
          Original Loan Amount
        </label>

        <input

          type="number"

          value={originalAmount}

          onChange={(e)=>
            setOriginalAmount(e.target.value)
          }

          className="border p-3 rounded w-full mb-4"

        />





        <label>
          Outstanding Amount
        </label>

        <input

          type="number"

          value={outstanding}

          onChange={(e)=>
            setOutstanding(e.target.value)
          }

          className="border p-3 rounded w-full mb-4"

        />





        <label>
          Interest Rate %
        </label>

        <input

          type="number"

          value={interestRate}

          onChange={(e)=>
            setInterestRate(e.target.value)
          }

          className="border p-3 rounded w-full mb-4"

        />





        <label>
          Tenure (Years)
        </label>

        <input

          type="number"

          value={tenureYears}

          onChange={(e)=>
            setTenureYears(e.target.value)
          }

          className="border p-3 rounded w-full mb-4"

        />





        <label>
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

          onClick={saveLoanDetails}

          className="bg-gray-900 text-white px-5 py-3 rounded"

        >

          Save Loan Details

        </button>


      </div>





      <div className="bg-white rounded-xl shadow p-6 max-w-xl">


        <h2 className="text-xl font-semibold mb-4">

          Loan Progress

        </h2>



        <div className="w-full bg-gray-200 h-4 rounded-full">


          <div

            className="bg-blue-600 h-4 rounded-full"

            style={{
              width:`${paidPercentage}%`
            }}

          />


        </div>



      </div>



    </div>

  );

}


export default HomeLoan;