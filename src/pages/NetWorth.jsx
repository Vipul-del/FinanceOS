import { useContext, useState } from "react";

import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";


function NetWorth() {


  const {
    financeData,
    setFinanceData
  } = useContext(FinanceContext);



  const assets = financeData.assets || {

    bankBalance: 0,

    emergencyFund: 0,

    propertyValue: 0,

  };



  const liabilities = financeData.liabilities || {

    otherLoans: 0,

  };




  const [bankBalance, setBankBalance] = useState(
    assets.bankBalance
  );


  const [emergencyFund, setEmergencyFund] = useState(
    assets.emergencyFund
  );


  const [propertyValue, setPropertyValue] = useState(
    assets.propertyValue
  );


  const [otherLoans, setOtherLoans] = useState(
    liabilities.otherLoans
  );





  const saveDetails = () => {


    setFinanceData((prev)=>({


      ...prev,


      assets:{


        bankBalance:Number(bankBalance),

        emergencyFund:Number(emergencyFund),

        propertyValue:Number(propertyValue),

      },



      liabilities:{


        otherLoans:Number(otherLoans),

      }


    }));


    alert("Net worth details saved ✅");

  };





  const investmentValue =
    financeData.investments.reduce(
      (sum,item)=>
        sum + Number(item.currentValue || item.amount),
      0
    );



  const totalAssets =
    Number(bankBalance) +
    Number(emergencyFund) +
    Number(propertyValue) +
    investmentValue;




  const totalLiabilities =
    Number(financeData.loans.homeLoanOutstanding || 0) +
    Number(otherLoans);




  const netWorth =
    totalAssets - totalLiabilities;





  return (

    <div className="space-y-8">


      <Header

        title="Net Worth"

        subtitle="Track your complete financial position."

      />





      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Assets
          </p>

          <h2 className="text-3xl font-bold">

            ₹ {totalAssets.toLocaleString()}

          </h2>

        </div>





        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Liabilities
          </p>

          <h2 className="text-3xl font-bold">

            ₹ {totalLiabilities.toLocaleString()}

          </h2>

        </div>





        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Net Worth
          </p>

          <h2 className="text-3xl font-bold">

            ₹ {netWorth.toLocaleString()}

          </h2>

        </div>


      </div>






      <div className="bg-white rounded-xl shadow p-6 max-w-xl">


        <h2 className="text-xl font-semibold mb-5">

          Update Assets & Liabilities

        </h2>




        <label className="block mb-2">
          Bank Balance
        </label>

        <input

          type="number"

          value={bankBalance}

          onChange={(e)=>
            setBankBalance(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />




        <label className="block mb-2">
          Emergency Fund
        </label>

        <input

          type="number"

          value={emergencyFund}

          onChange={(e)=>
            setEmergencyFund(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />




        <label className="block mb-2">
          Property Value
        </label>

        <input

          type="number"

          value={propertyValue}

          onChange={(e)=>
            setPropertyValue(e.target.value)
          }

          className="border p-3 rounded w-full mb-5"

        />




        <label className="block mb-2">
          Other Loans
        </label>

        <input

          type="number"

          value={otherLoans}

          onChange={(e)=>
            setOtherLoans(e.target.value)
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


    </div>

  );

}


export default NetWorth;