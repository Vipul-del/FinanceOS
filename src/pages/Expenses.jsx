import { useContext, useState } from "react";

import { FinanceContext } from "../context/FinanceContext";

import Header from "../components/common/Header";



function Expenses() {


  const {
    financeData,
    addExpense,
    deleteExpense
  } = useContext(FinanceContext);




  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState("");





  const handleAddExpense = (e) => {


    e.preventDefault();



    if (!category || !amount) {

      return;

    }



    addExpense({

      category,

      amount:Number(amount),

    });



    setCategory("");

    setAmount("");

  };







  const getCategorySpent = (categoryName)=>{


    return financeData.expenses

      .filter(

        item => item.category === categoryName

      )

      .reduce(

        (sum,item)=>

          sum + Number(item.amount || 0),

        0

      );


  };








  return (

    <div className="space-y-8">


      <Header

        title="Expenses"

        subtitle="Track expenses and manage your monthly budget."

      />






      <div className="bg-white p-6 rounded-xl shadow">


        <h2 className="text-xl font-semibold mb-5">

          Budget Overview

        </h2>





        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


          {(financeData.budgets || []).map((budget)=>(


            <div

              key={budget.id}

              className="border rounded-xl p-5"

            >


              <h3 className="font-semibold text-lg">

                {budget.category}

              </h3>



              <p className="mt-2">

                Budget:

                <b>
                  ₹ {budget.limit.toLocaleString()}
                </b>

              </p>





              <p>

                Spent:

                <b>
                  ₹ {getCategorySpent(budget.category).toLocaleString()}
                </b>

              </p>





              <div className="mt-3">


                <div className="w-full bg-gray-200 h-3 rounded">


                  <div

                    className="bg-blue-600 h-3 rounded"

                    style={{

                      width:`${
                        Math.min(
                          (
                            getCategorySpent(budget.category) /
                            budget.limit
                          ) * 100,
                          100
                        )
                      }%`

                    }}

                  />

                </div>



              </div>






              {
                getCategorySpent(budget.category) >
                budget.limit

                &&

                <p className="text-red-600 mt-2 font-semibold">

                  ⚠ Budget exceeded

                </p>

              }



            </div>


          ))}


        </div>


      </div>








      <div className="bg-white p-6 rounded-xl shadow">


        <h2 className="text-xl font-semibold mb-4">

          Add Expense

        </h2>




        <form

          onSubmit={handleAddExpense}

          className="space-y-4"

        >



          <select

            value={category}

            onChange={(e)=>
              setCategory(e.target.value)
            }

            className="w-full border p-3 rounded"

          >


            <option value="">

              Select Category

            </option>


            <option value="Home">
              Home
            </option>


            <option value="Food">
              Food
            </option>


            <option value="Travel">
              Travel
            </option>


            <option value="Shopping">
              Shopping
            </option>


            <option value="Health">
              Health
            </option>


            <option value="Other">
              Other
            </option>


          </select>





          <input

            type="number"

            placeholder="Amount"

            value={amount}

            onChange={(e)=>
              setAmount(e.target.value)
            }

            className="w-full border p-3 rounded"

          />





          <button

            type="submit"

            className="bg-blue-600 text-white px-5 py-3 rounded"

          >

            Add Expense

          </button>



        </form>


      </div>








      <div className="bg-white p-6 rounded-xl shadow">


        <h2 className="text-xl font-semibold mb-4">

          Expense History

        </h2>





        {financeData.expenses.map((expense)=>(


          <div

            key={expense.id}

            className="flex justify-between items-center border-b py-3"

          >


            <div>


              <p className="font-medium">

                {expense.category}

              </p>


              <p>

                ₹ {Number(expense.amount).toLocaleString()}

              </p>


            </div>





            <button

              onClick={()=>
                deleteExpense(expense.id)
              }

              className="text-red-600"

            >

              Delete

            </button>



          </div>


        ))}


      </div>




    </div>

  );

}


export default Expenses;