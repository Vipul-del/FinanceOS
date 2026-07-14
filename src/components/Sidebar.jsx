import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  User,
  Landmark,
  WalletCards,
  FileText,
  LogOut,
} from "lucide-react";


import Logo from "./common/Logo";

import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";



function Sidebar() {


  const { signOut } = useAuth();




  const menu = [


    {
      name:"Dashboard",
      path:"/",
      icon:<LayoutDashboard size={20}/>,
    },


    {
      name:"Expenses",
      path:"/expenses",
      icon:<Receipt size={20}/>,
    },


    {
      name:"Investments",
      path:"/investments",
      icon:<TrendingUp size={20}/>,
    },


    {
      name:"Home Loan",
      path:"/loans",
      icon:<Landmark size={20}/>,
    },


    {
      name:"Net Worth",
      path:"/networth",
      icon:<WalletCards size={20}/>,
    },


    {
      name:"Reports",
      path:"/reports",
      icon:<FileText size={20}/>,
    },


    {
      name:"Profile",
      path:"/profile",
      icon:<User size={20}/>,
    },


  ];





  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col">


      <Logo />



      <nav className="space-y-2 flex-1 mt-5">


        {menu.map((item)=>(


          <NavLink

            key={item.path}

            to={item.path}

            end={item.path === "/"}

            className={({isActive}) =>

              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                
                isActive

                ? "bg-blue-600 text-white shadow-md"

                : "text-gray-300 hover:bg-gray-800 hover:text-white"

              }`

            }

          >

            {item.icon}

            <span>
              {item.name}
            </span>


          </NavLink>


        ))}


      </nav>




      <button

        onClick={signOut}

        className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white"

      >

        <LogOut size={20}/>

        Logout

      </button>



    </div>

  );

}


export default Sidebar;