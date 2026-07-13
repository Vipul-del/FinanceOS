import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";


function Expenses(){


  const { financeData, setFinanceData } = useContext(FinanceContext);



  const [category,setCategory] = useState("Home");

  const [amount,setAmount] = useState("");



  function addExpense(){


    if(!amount){
      alert("Please enter amount");
      return;
    }



    const newExpense = {

      id: Date.now(),

      category,

      amount:Number(amount)

    };



    setFinanceData({

      ...financeData,

      expenses:[

        ...financeData.expenses,

        newExpense

      ]

    });



    setAmount("");

  }




  function deleteExpense(id){


    const updatedExpenses =
      financeData.expenses.filter(
        expense => expense.id !== id
      );



    setFinanceData({

      ...financeData,

      expenses:updatedExpenses

    });


  }




  return (

    <div>


      <h1 className="text-3xl font-bold mb-6">
        Expense Management
      </h1>




      <div className="bg-white p-6 rounded-xl shadow max-w-xl">


        <label className="block mb-2">
          Expense Category
        </label>


        <select

          value={category}

          onChange={(e)=>setCategory(e.target.value)}

          className="border p-3 rounded w-full mb-5"

        >

          <option>Home</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>

        </select>




        <label className="block mb-2">
          Amount
        </label>


        <input

          type="number"

          value={amount}

          onChange={(e)=>setAmount(e.target.value)}

          className="border p-3 rounded w-full mb-5"

        />



        <button

          onClick={addExpense}

          className="bg-gray-900 text-white px-5 py-3 rounded"

        >

          Add Expense

        </button>


      </div>





      <div className="bg-white mt-8 p-6 rounded-xl shadow">


        <h2 className="text-xl font-bold mb-4">
          Expense History
        </h2>




        <table className="w-full">


          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Category
              </th>


              <th className="text-left p-3">
                Amount
              </th>


              <th className="text-left p-3">
                Action
              </th>


            </tr>

          </thead>




          <tbody>


          {
            financeData.expenses.map((expense)=>(


              <tr 
                key={expense.id}
                className="border-b"
              >

                <td className="p-3">
                  {expense.category}
                </td>


                <td className="p-3">
                  ₹ {expense.amount.toLocaleString()}
                </td>


                <td className="p-3">

                  <button

                    onClick={()=>
                      deleteExpense(expense.id)
                    }

                    className="text-red-600"

                  >

                    Delete

                  </button>

                </td>


              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </div>

  )

}


export default Expenses;