import { IoWalletOutline } from "react-icons/io5";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";
import { BudgetProvider } from "./context/BudgetContext";

function App() {
  return (
    <BudgetProvider>
      <div className="min-h-screen bg-slate-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <IoWalletOutline size={32} className="text-slate-700" />
            <h1 className="text-3xl font-bold text-slate-700">
              Budget Transaction
            </h1>
          </div>
          <Balance />
          <TransactionForm />
          <TransactionList />
        </div>
      </div>
    </BudgetProvider>
  );
}

export default App;
