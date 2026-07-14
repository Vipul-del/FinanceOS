import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";


import Sidebar from "./components/Sidebar";


import Dashboard from "./pages/Dashboard";
import FinanceProfile from "./pages/FinanceProfile";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import HomeLoan from "./pages/HomeLoan";
import NetWorth from "./pages/NetWorth";
import Reports from "./pages/Reports";

import Login from "./pages/Login";
import Register from "./pages/Register";


import { FinanceProvider } from "./context/FinanceContext";
import { AuthProvider } from "./context/AuthContext";


import ProtectedRoute from "./routes/ProtectedRoute";



function Layout() {


  const location = useLocation();


  const authPages = [
    "/login",
    "/register"
  ];


  const showSidebar =
    !authPages.includes(location.pathname);




  return (

    <div className="flex">


      {showSidebar && <Sidebar />}



      <main className="flex-1 p-8 bg-gray-100 min-h-screen">


        <Routes>


          <Route
            path="/login"
            element={<Login />}
          />


          <Route
            path="/register"
            element={<Register />}
          />



          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />



          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <FinanceProfile />
              </ProtectedRoute>
            }
          />



          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />



          <Route
            path="/investments"
            element={
              <ProtectedRoute>
                <Investments />
              </ProtectedRoute>
            }
          />



          <Route
            path="/loans"
            element={
              <ProtectedRoute>
                <HomeLoan />
              </ProtectedRoute>
            }
          />



          <Route
            path="/networth"
            element={
              <ProtectedRoute>
                <NetWorth />
              </ProtectedRoute>
            }
          />



          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />



          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />


        </Routes>


      </main>


    </div>

  );

}




function App() {


  return (

    <AuthProvider>

      <FinanceProvider>

        <BrowserRouter>

          <Layout />

        </BrowserRouter>

      </FinanceProvider>

    </AuthProvider>

  );

}


export default App;