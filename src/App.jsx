import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import FinanceProfile from "./pages/FinanceProfile";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import HomeLoan from "./pages/HomeLoan";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  FinanceProvider,
} from "./context/FinanceContext";

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-8 bg-gray-100 min-h-screen">
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/profile"
                element={<FinanceProfile />}
              />

              <Route
                path="/expenses"
                element={<Expenses />}
              />

              <Route
                path="/investments"
                element={<Investments />}
              />

              <Route
                path="/loans"
                element={<HomeLoan />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;