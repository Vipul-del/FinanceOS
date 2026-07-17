import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyBQyadeF2T5bAOVl7UbX65u6NAViEjPqtg",
  authDomain: "financeos-f3827.firebaseapp.com",
  projectId: "financeos-f3827",
  storageBucket: "financeos-f3827.firebasestorage.app",
  messagingSenderId: "682248007672",
  appId: "1:682248007672:web:6f2ac7cc4955bd1adbf00d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ incomes: [], expenses: [], investments: [], loans: [], goals: [], budgetLimit: 50000 });

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const docRef = doc(db, "users", u.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUserData(docSnap.data());
      } else {
        setUserData({ incomes: [], expenses: [], investments: [], loans: [], goals: [], budgetLimit: 50000 });
      }
    });
  }, []);

  const saveToDb = async (newData) => {
    setUserData(newData);
    if (user) await setDoc(doc(db, "users", user.uid), newData);
  };

  const actions = {
    addIncome: (i) => saveToDb({...userData, incomes: [...(userData.incomes || []), {...i, id: Date.now()}]}),
    deleteIncome: (id) => saveToDb({...userData, incomes: (userData.incomes || []).filter(i => i.id !== id)}),
    addExpense: (e) => saveToDb({...userData, expenses: [...(userData.expenses || []), {...e, id: Date.now()}]}),
    deleteExpense: (id) => saveToDb({...userData, expenses: (userData.expenses || []).filter(e => e.id !== id)}),
    addInvestment: (i) => saveToDb({...userData, investments: [...(userData.investments || []), {...i, id: Date.now()}]}),
    deleteInvestment: (id) => saveToDb({...userData, investments: (userData.investments || []).filter(i => i.id !== id)}),
    addLoan: (l) => saveToDb({...userData, loans: [...(userData.loans || []), {...l, id: Date.now()}]}),
    deleteLoan: (id) => saveToDb({...userData, loans: (userData.loans || []).filter(l => l.id !== id)}),
    addGoal: (g) => saveToDb({...userData, goals: [...(userData.goals || []), {...g, id: Date.now()}]}),
    deleteGoal: (id) => saveToDb({...userData, goals: (userData.goals || []).filter(g => g.id !== id)}),
    updateGoalSaved: (id, amt) => saveToDb({...userData, goals: (userData.goals || []).map(g => g.id === id ? {...g, saved: Number(g.saved) + Number(amt)} : g)}),
    login: (e, p) => signInWithEmailAndPassword(auth, e, p),
    signup: (e, p) => createUserWithEmailAndPassword(auth, e, p),
    logout: () => signOut(auth)
  };

  return <FinanceContext.Provider value={{ user, userData, ...actions }}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => useContext(FinanceContext);