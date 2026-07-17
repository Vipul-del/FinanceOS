import React, { useState } from 'react';
import { useFinance } from './context/FinanceContext';

// --- Modules ---

const Login = () => {
  const { login, signup } = useFinance();
  const [email, setEmail] = useState(''); const [pass, setPass] = useState('');
  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">
      <div className="bg-white p-10 rounded-2xl w-96 shadow-xl space-y-4">
        <h1 className="text-2xl font-black text-center">FinanceOS</h1>
        <input className="border w-full p-3 rounded" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border w-full p-3 rounded" type="password" placeholder="Password" onChange={e=>setPass(e.target.value)} />
        <button className="bg-emerald-600 text-white w-full p-3 rounded font-bold" onClick={()=>login(email, pass)}>Login</button>
        <button className="bg-gray-200 w-full p-3 rounded font-bold" onClick={()=>signup(email, pass)}>Sign Up</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { userData } = useFinance();
  const totalIncome = (userData.incomes || []).reduce((s, i) => s + Number(i.amount || 0), 0);
  const totalExpenses = (userData.expenses || []).reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalInvestments = (userData.investments || []).reduce((s, i) => s + Number(i.current || 0), 0);
  const totalLoans = (userData.loans || []).reduce((s, l) => s + Number(l.balance || 0), 0);
  const netWorth = totalInvestments - totalLoans;
  
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        <div className="p-6 bg-white border rounded-2xl">Net Worth: ₹{netWorth.toLocaleString()}</div>
        <div className="p-6 bg-white border rounded-2xl">Income: ₹{totalIncome.toLocaleString()}</div>
        <div className="p-6 bg-white border rounded-2xl">Expenses: ₹{totalExpenses.toLocaleString()}</div>
        <div className="p-6 bg-white border rounded-2xl">Loans: ₹{totalLoans.toLocaleString()}</div>
      </div>
    </div>
  );
};

const Income = () => {
  const { userData, addIncome, deleteIncome } = useFinance();
  const [name, setName] = useState(''); const [salary, setSalary] = useState(''); const [other, setOther] = useState('');
  const [city, setCity] = useState(''); const [goals, setGoals] = useState('');
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black">Income</h1>
      <div className="bg-white p-6 rounded-2xl border grid grid-cols-2 gap-4">
        <input className="border p-3 rounded" placeholder="Name" onChange={e=>setName(e.target.value)}/>
        <input className="border p-3 rounded" placeholder="City" onChange={e=>setCity(e.target.value)}/>
        <input className="border p-3 rounded" type="number" placeholder="Salary" onChange={e=>setSalary(e.target.value)}/>
        <input className="border p-3 rounded" type="number" placeholder="Other" onChange={e=>setOther(e.target.value)}/>
        <button className="bg-emerald-600 text-white p-3 rounded col-span-2" onClick={()=>addIncome({name, city, goals, amount: Number(salary)+Number(other)})}>Add</button>
      </div>
      {(userData.incomes || []).map(i=><div key={i.id} className="p-4 bg-white border rounded">{i.name}: ₹{i.amount} <button className="text-red-500" onClick={()=>deleteIncome(i.id)}>Delete</button></div>)}
    </div>
  );
};

const Expenses = () => {
  const { userData, addExpense, deleteExpense } = useFinance();
  const [title, setTitle] = useState(''); const [amount, setAmount] = useState('');
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black">Expenses</h1>
      <input className="border p-2" placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
      <input className="border p-2" type="number" placeholder="Amount" onChange={e=>setAmount(e.target.value)}/>
      <button className="bg-rose-600 text-white p-2" onClick={()=>addExpense({title, amount})}>Add</button>
      {(userData.expenses || []).map(e=><div key={e.id} className="p-2 border-b">{e.title}: ₹{e.amount} <button className="text-red-500" onClick={()=>deleteExpense(e.id)}>Delete</button></div>)}
    </div>
  );
};

const Investments = () => {
  const { userData, addInvestment, deleteInvestment } = useFinance();
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black">Investments</h1>
      {(userData.investments || []).map(i=><div key={i.id} className="p-2 border-b">{i.name}: ₹{i.current} <button className="text-red-500" onClick={()=>deleteInvestment(i.id)}>Delete</button></div>)}
    </div>
  );
};

const Loans = () => {
  const { userData, addLoan, deleteLoan } = useFinance();
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black">Loans</h1>
      {(userData.loans || []).map(l=><div key={l.id} className="p-2 border-b">{l.name}: ₹{l.balance} <button className="text-red-500" onClick={()=>deleteLoan(l.id)}>Delete</button></div>)}
    </div>
  );
};

const Goals = () => {
  const { userData, addGoal, deleteGoal } = useFinance();
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black">Goals</h1>
      {(userData.goals || []).map(g=><div key={g.id} className="p-2 border-b">{g.name}: ₹{g.saved}/{g.target} <button className="text-red-500" onClick={()=>deleteGoal(g.id)}>Delete</button></div>)}
    </div>
  );
};

// --- App Shell ---
export default function App() {
  const { user, logout } = useFinance();
  const [active, setActive] = useState('Dashboard');
  const tabs = ['Dashboard', 'Income', 'Expenses', 'Investments', 'Loans', 'Goals'];

  if (!user) return <Login />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-950 text-white p-8">
        <h1 className="text-xl font-black mb-10 text-emerald-400">FinanceOS</h1>
        {tabs.map(t => <button key={t} onClick={() => setActive(t)} className={`w-full text-left py-4 px-4 rounded-xl font-bold ${active === t ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}>{t}</button>)}
        <button onClick={logout} className="mt-10 text-rose-400 font-bold">Logout</button>
      </aside>
      <main className="flex-1">
        {active === 'Dashboard' && <Dashboard />}
        {active === 'Income' && <Income />}
        {active === 'Expenses' && <Expenses />}
        {active === 'Investments' && <Investments />}
        {active === 'Loans' && <Loans />}
        {active === 'Goals' && <Goals />}
      </main>
    </div>
  );
}