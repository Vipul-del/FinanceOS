import { createContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

import { useAuth } from "./AuthContext";


export const FinanceContext = createContext();



const emptyFinanceData = {

  income: {
    salary: 0,
    otherIncome: 0,
  },


  expenses: [],


  investments: [],


  loans: {

    homeLoan: {

      originalAmount: 0,

      outstanding: 0,

      interestRate: 0,

      tenureYears: 0,

      emi: 0,

    },

    otherLoans: 0,

  },



  assets: {

    bankBalance: 0,

    emergencyFund: 0,

    propertyValue: 0,

  },



  budgets: [],

};






export function FinanceProvider({ children }) {


  const { user } = useAuth();



  const [financeData,setFinanceData] = useState(
    emptyFinanceData
  );


  const [loading,setLoading] = useState(true);






  useEffect(()=>{


    async function loadFinanceData(){


      if(!user){

        setLoading(false);

        return;

      }




      const {

        data,

        error

      } = await supabase

      .from("finance_data")

      .select("*")

      .eq(

        "user_id",

        user.id

      )

      .single();





      if(data){


        setFinanceData(data.data);


      }

      else{


        await saveFinanceData(
          emptyFinanceData
        );


      }





      setLoading(false);



    }





    loadFinanceData();



  },[user]);







  async function saveFinanceData(newData){



    if(!user){

      return;

    }




    setFinanceData(newData);





    await supabase

    .from("finance_data")

    .upsert({

      user_id:user.id,

      data:newData,

    });



  }







  const addExpense=(expense)=>{


    const updatedData={

      ...financeData,


      expenses:[

        ...financeData.expenses,

        {

          id:Date.now(),

          ...expense

        }

      ]

    };



    saveFinanceData(updatedData);


  };








  const deleteExpense=(id)=>{


    const updatedData={


      ...financeData,


      expenses:

      financeData.expenses.filter(

        item=>item.id!==id

      )


    };



    saveFinanceData(updatedData);


  };








  const addInvestment=(investment)=>{


    const updatedData={


      ...financeData,


      investments:[

        ...financeData.investments,

        {

          id:Date.now(),

          ...investment

        }

      ]


    };



    saveFinanceData(updatedData);


  };








  const deleteInvestment=(id)=>{


    const updatedData={


      ...financeData,


      investments:

      financeData.investments.filter(

        item=>item.id!==id

      )


    };



    saveFinanceData(updatedData);


  };








  return (


    <FinanceContext.Provider


      value={{

        financeData,

        setFinanceData:saveFinanceData,

        addExpense,

        deleteExpense,

        addInvestment,

        deleteInvestment,

        loading,

      }}


    >

      {children}


    </FinanceContext.Provider>


  );


}