import React from "react";
import { MdDelete } from "react-icons/md";
import { useBudget } from "../../context/BudgetContext";

function TransactionList() {
  const { transactions, deleteTransaction } = useBudget();
  console.log(transactions);


  const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};




  return (
    <div className="bg-slate-700 rounded-lg shadow-md ">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full ">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wide">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wide">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wide">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-700 divide-y-2 divide-slate-900 text-slate-300">
            {transactions.map((item) => (
              <tr key={item.id} className="hover:bg-slate-900 transition-all ">
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.description || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category || 'N/A'}</td>
                <td
                  className={`px-6 py-2 whitespace-nowrap ${
                    item.type === "expenses"
                      ? " text-red-300"
                      : " text-green-300"
                  }`}
                >
                 {formatCurrency(item.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => deleteTransaction(item.id)} className="bg-red-900 text-red-300 px-3 py-1 rounded-sm hover:scale-110 hover:transition-all hover:cursor-pointer">
                    <MdDelete size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
