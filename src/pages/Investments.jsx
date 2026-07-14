import { useContext, useState } from "react";

import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";


function Investments() {


  const {
    financeData,
    addInvestment,
    deleteInvestment
  } = useContext(FinanceContext);



  const [type, setType] = useState("");

  const [amount, setAmount] = useState("");

  const [currentValue, setCurrentValue] = useState("");



  const handleAddInvestment = (e) => {

    e.preventDefault();


    if (!type || !amount || !currentValue) {

      return;

    }



    addInvestment({

      type,

      amount: Number(amount),

      currentValue: Number(currentValue),

      date: new Date().toISOString().split("T")[0],

    });



    setType("");

    setAmount("");

    setCurrentValue("");

  };




  const totalInvested =
    financeData.investments.reduce(
      (sum,item)=>
        sum + Number(item.amount),
      0
    );



  const currentPortfolioValue =
    financeData.investments.reduce(
      (sum,item)=>
        sum + Number(item.currentValue || item.amount),
      0
    );



  const returns =
    currentPortfolioValue - totalInvested;



  const returnPercentage =
    totalInvested > 0
      ? Math.round(
          (returns / totalInvested) * 100
        )
      : 0;





  return (

    <div className="space-y-8">


      <Header

        title="Investments"

        subtitle="Track your investment portfolio."

      />





      {/* Portfolio Summary */}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">

            Total Invested

          </p>


          <h2 className="text-2xl font-bold">

            ₹ {totalInvested.toLocaleString()}

          </h2>


        </div>





        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">

            Current Value

          </p>


          <h2 className="text-2xl font-bold">

            ₹ {currentPortfolioValue.toLocaleString()}

          </h2>


        </div>





        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">

            Returns ({returnPercentage}%)

          </p>


          <h2 className="text-2xl font-bold">

            ₹ {returns.toLocaleString()}

          </h2>


        </div>



      </div>







      {/* Add Investment */}


      <div className="bg-white p-6 rounded-xl shadow">



        <h2 className="text-xl font-semibold mb-4">

          Add Investment

        </h2>




        <form

          onSubmit={handleAddInvestment}

          className="space-y-4"

        >



          <select

            value={type}

            onChange={(e)=>
              setType(e.target.value)
            }

            className="w-full border p-3 rounded"

          >

            <option value="">

              Select Type

            </option>


            <option value="Mutual Funds">

              Mutual Funds

            </option>


            <option value="Stocks">

              Stocks

            </option>


            <option value="FD / RD">

              FD / RD

            </option>


            <option value="PPF">

              PPF

            </option>


            <option value="Gold">

              Gold

            </option>


          </select>





          <input

            type="number"

            placeholder="Invested Amount"

            value={amount}

            onChange={(e)=>
              setAmount(e.target.value)
            }

            className="w-full border p-3 rounded"

          />





          <input

            type="number"

            placeholder="Current Value"

            value={currentValue}

            onChange={(e)=>
              setCurrentValue(e.target.value)
            }

            className="w-full border p-3 rounded"

          />





          <button

            className="bg-green-600 text-white px-5 py-3 rounded"

          >

            Add Investment

          </button>



        </form>


      </div>







      {/* Investment History */}


      <div className="bg-white p-6 rounded-xl shadow">


        <h2 className="text-xl font-semibold mb-4">

          Investment History

        </h2>



        {
          financeData.investments.map((item)=>(


            <div

              key={item.id}

              className="flex justify-between items-center border-b py-3"

            >



              <div>


                <p className="font-medium">

                  {item.type}

                </p>


                <p>

                  Invested:
                  ₹ {Number(item.amount).toLocaleString()}

                </p>


                <p>

                  Current:
                  ₹ {Number(item.currentValue || item.amount).toLocaleString()}

                </p>


              </div>





              <button

                onClick={()=>
                  deleteInvestment(item.id)
                }

                className="text-red-600"

              >

                Delete

              </button>



            </div>


          ))
        }



      </div>



    </div>

  );

}


export default Investments;