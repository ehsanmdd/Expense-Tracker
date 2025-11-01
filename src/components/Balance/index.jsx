import { BiSolidDollarCircle } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useBudget } from "../../context/BudgetContext";



function Balance() {

  const { balance, income, expenses } = useBudget();
  console.log(expenses)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

      <div className="bg-slate-700 p-6 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <BiSolidDollarCircle size={40} className="text-slate-300" />
          <h2 className="text-2xl font-semibold text-slate-300 ">
            Current Balance
          </h2>
        </div>
        <p className="text-2xl font-bold mb-2 text-slate-300">{balance}</p>
      </div>

      <div className="bg-slate-700 p-6 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <FaSackDollar size={40} className="text-slate-300" />
          <h2 className="text-2xl font-semibold text-slate-300 ">
            Total Income
          </h2>
        </div>
        <p className="text-2xl font-bold mb-2 text-slate-300">{income.amount}</p>
      </div>

      <div className="bg-slate-700 p-6 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <FaMoneyCheckDollar size={40} className="text-slate-300" />
          <h2 className="text-2xl font-semibold text-slate-300 ">
            Expenses
          </h2>
        </div>

        <p className="text-2xl font-bold mb-2 text-slate-300">{expenses}</p>
      </div>

    </div>
  );
}

export default Balance;
