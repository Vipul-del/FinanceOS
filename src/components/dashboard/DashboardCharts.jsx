import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";


function DashboardCharts() {


  const { financeData } = useContext(FinanceContext);



  const expenseData =
    financeData.expenses.map((item) => ({
      name: item.category,
      value: Number(item.amount),
    }));



  const income =
    Number(financeData.income.salary) +
    Number(financeData.income.otherIncome || 0);



  const expenseTotal =
    financeData.expenses.reduce(
      (sum,item)=>sum + Number(item.amount),
      0
    );



  const emi =
    Number(financeData.loans.emi);



  const comparisonData = [

    {
      name:"Income",
      amount:income
    },

    {
      name:"Expenses",
      amount:expenseTotal
    },

    {
      name:"EMI",
      amount:emi
    },

  ];



  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];



  return (

    <div className="space-y-6">



      {/* Expense Pie Chart */}

      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-xl font-semibold mb-4">

          Expense Breakdown

        </h2>



        <div style={{width:"100%",height:300}}>


          <ResponsiveContainer>


            <PieChart>


              <Pie

                data={expenseData}

                dataKey="value"

                nameKey="name"

                outerRadius={100}

                label

              >

                {
                  expenseData.map(
                    (entry,index)=>(

                      <Cell

                        key={index}

                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }

                      />

                    )
                  )
                }


              </Pie>


              <Tooltip />


            </PieChart>


          </ResponsiveContainer>


        </div>


      </div>





      {/* Income Expense EMI Chart */}

      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-xl font-semibold mb-4">

          Income vs Expenses

        </h2>



        <div style={{width:"100%",height:300}}>


          <ResponsiveContainer>


            <BarChart data={comparisonData}>


              <CartesianGrid />


              <XAxis dataKey="name" />


              <YAxis />


              <Tooltip />


              <Legend />


              <Bar

                dataKey="amount"

              />


            </BarChart>


          </ResponsiveContainer>


        </div>


      </div>



    </div>

  );

}


export default DashboardCharts;