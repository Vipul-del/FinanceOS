import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

export default function Investments() {
  const { investments = [], addInvestment, deleteInvestment } = useFinance() || {};
  
  const [name, setName] = useState('');
  const [type, setType] = useState('Mutual Funds');
  const [invested, setInvested] = useState('');
  const [current, setCurrent] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [startDate, setStartDate] = useState('');

  // Exactly the 9 asset classes you requested
  const assetTypes = ['Mutual Funds', 'SIPs', 'Stocks', 'FD', 'Gold', 'PPF', 'NPS', 'EPF', 'Crypto'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !invested || !current) return alert('Please fill in Name, Invested Amount, and Current Value!');
    
    addInvestment({
      name,
      type,
      invested: Number(invested),
      current: Number(current),
      monthlyAmount: Number(monthlyAmount) || 0,
      startDate: startDate || 'N/A'
    });

    setName('');
    setInvested('');
    setCurrent('');
    setMonthlyAmount('');
    setStartDate('');
  };

  const totalInv = investments.reduce((sum, i) => sum + Number(i.invested || 0), 0);
  const totalCur = investments.reduce((sum, i) => sum + Number(i.current || 0), 0);
  const totalReturns = totalCur - totalInv;
  const returnPct = totalInv > 0 ? ((totalReturns / totalInv) * 100).toFixed(1) : 0;

  const assetAllocation = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + Number(inv.current || 0);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Investments</span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">Good Evening, Vipul 👋</h1>
          <p className="text-sm text-gray-500">Track your detailed investment portfolio across all asset classes.</p>
        </div>
        <div className="text-right text-sm font-semibold text-gray-500">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-blue-600">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Invested</p>
          <p className="text-2xl font-black text-gray-900 mt-1">₹ {totalInv.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-500 mt-2">Principal capital deployed</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Value</p>
          <p className="text-2xl font-black text-gray-900 mt-1">₹ {totalCur.toLocaleString('en-IN')}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">Live portfolio valuation</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-teal-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Profit / Loss Returns</p>
          <p className={`text-2xl font-black mt-1 ${totalReturns >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {totalReturns >= 0 ? '+' : ''}₹ {totalReturns.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-gray-500 mt-2">Overall return: <strong className={totalReturns >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{returnPct}%</strong></p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-indigo-600">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asset Allocation</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{Object.keys(assetAllocation).length} of 9 Classes</p>
          <p className="text-xs text-gray-500 mt-2 truncate">Top: {Object.entries(assetAllocation).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'None'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Add Detailed Investment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600">1. Select Asset Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500 font-semibold">
                {assetTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-600">2. Asset / Fund Name</label>
              <input type="text" placeholder="e.g., Parag Parikh Flexi Cap Fund, HDFC FD..." value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600">3. Started From (Optional)</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600">4. Monthly SIP / Amount (₹)</label>
              <input type="number" placeholder="0 if lump sum" value={monthlyAmount} onChange={e => setMonthlyAmount(e.target.value)} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600">5. Total Invested (₹)</label>
              <input type="number" placeholder="Total principal" value={invested} onChange={e => setInvested(e.target.value)} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600">6. Current Value (₹)</label>
              <input type="number" placeholder="Current market value" value={current} onChange={e => setCurrent(e.target.value)} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition-all duration-150">
            + Add Investment
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800">Detailed Investment History ({investments.length})</h3>
          <span className="text-xs bg-blue-50 text-blue-800 font-semibold px-3 py-1 rounded-full">All 9 Categories Supported</span>
        </div>

        {investments.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">No investments added yet. Use the form above to track your portfolio!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-400 uppercase">
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Fund / Asset Name</th>
                  <th className="pb-3 font-bold">Started From</th>
                  <th className="pb-3 font-bold">Monthly SIP</th>
                  <th className="pb-3 font-bold">Invested</th>
                  <th className="pb-3 font-bold">Current Value</th>
                  <th className="pb-3 font-bold">Profit / Loss</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {investments.map((inv) => {
                  const profit = (Number(inv.current) || 0) - (Number(inv.invested) || 0);
                  const pct = inv.invested > 0 ? ((profit / inv.invested) * 100).toFixed(1) : 0;
                  return (
                    <tr key={inv.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 whitespace-nowrap"><span className="text-[11px] bg-slate-900 text-white font-bold px-2 py-1 rounded uppercase">{inv.type}</span></td>
                      <td className="py-3.5 font-bold text-gray-800">{inv.name}</td>
                      <td className="py-3.5 text-gray-500 text-xs">{inv.startDate || 'N/A'}</td>
                      <td className="py-3.5 font-semibold text-indigo-600">{inv.monthlyAmount > 0 ? `₹ ${Number(inv.monthlyAmount).toLocaleString('en-IN')}` : 'Lump Sum'}</td>
                      <td className="py-3.5 font-semibold text-gray-600">₹ {Number(inv.invested).toLocaleString('en-IN')}</td>
                      <td className="py-3.5 font-bold text-gray-900">₹ {Number(inv.current).toLocaleString('en-IN')}</td>
                      <td className="py-3.5 whitespace-nowrap"><span className={`font-bold text-xs px-2 py-1 rounded ${profit >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{profit >= 0 ? '+' : ''}₹ {profit.toLocaleString('en-IN')} ({pct}%)</span></td>
                      <td className="py-3.5 text-right"><button onClick={() => deleteInvestment(inv.id)} className="text-gray-400 hover:text-rose-600 font-bold px-2 py-1 rounded transition-colors">✕</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}