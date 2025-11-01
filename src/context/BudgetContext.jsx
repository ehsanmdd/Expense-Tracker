import { createContext, useContext, useEffect, useReducer } from "react";

const BudgetContext = createContext();
const loadInitialState = () => {
  try {
    const savedTransaction = localStorage.getItem("Budget_Transactions");
    return {
      transactions: savedTransaction ? JSON.parse(savedTransaction) : [],
    };
  } catch (error) {
    console.error("Error loading from localStorage" + error.message);
    return { transactions: [] };
  }
};

export const initialState = loadInitialState();

const ADD_TRANSACTION = "ADD_TRANSACTION";
const DELETE_TRANSACTION = "DELETE_TRANSACTION";

const budgetReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "Budget_Transactions",
      JSON.stringify(state.transactions)
    );
  }, [state.transactions]);

  const addTransactions = (transaction) => {
    dispatch({
      type: ADD_TRANSACTION,
      payload: {
        ...transaction,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id,
    });
  };

  const balance = state.transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const income = state.transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.amount : acc;
  });

  const expenses = state.transactions
    .filter((type) => type.type === "expenses")
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <BudgetContext.Provider
      value={{
        transactions: state.transactions,
        addTransactions,
        deleteTransaction,
        balance,
        income,
        expenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  return context;
}
