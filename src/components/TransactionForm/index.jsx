import { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { FaSquareMinus } from "react-icons/fa6";
import { useBudget } from "../../context/BudgetContext";

const defaultCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Other",
];

function TransactionForm() {
  const { addTransactions } = useBudget();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expenses",
    category: "Select One",
  });

    useEffect(() => {
    const storedCategories = localStorage.getItem('Budget_Categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      
      setCategories(defaultCategories);
      localStorage.setItem('Budget_Categories', JSON.stringify(defaultCategories));
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) return;

    addTransactions({
      description: formData.description,
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
    });

    console.log(formData);

    setFormData({
      description: "",
      amount: "",
      type: "",
      category: "",
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue("");
  };


  const addCategory = () => {

    if (!inputValue || categories.includes(inputValue)) return;
    const updatedCategories = [...categories, inputValue];
    setCategories(updatedCategories);
    localStorage.setItem('Budget_Categories', JSON.stringify(updatedCategories));
    closeModal()
  };
  
  const removeCategory = () => {
    const categoryItem = formData.category;
    const updatedCategories = categories.filter((cat) => cat !== categoryItem);
    setCategories(updatedCategories)
    localStorage.setItem('Budget_Categories', JSON.stringify(categories));
    console.log(categoryItem);

  };




  return (
    <form
      className="bg-slate-700 p-6 rounded-lg shadow-md mb-8 "
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-lg font-semibold mb-8 text-slate-300">
        Add New Transaction
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <input
            className="placeholder:text-slate-400 text-slate-300 w-full p-2 border border-slate-300 rounded-md  "
            type="text"
            placeholder="Enter your description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Amount
          </label>
          <input
            className="placeholder:text-slate-400 w-full p-2 border border-slate-300 rounded-md text-slate-300"
            type="number"
            placeholder="Enter your description"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div className="">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Type
          </label>
          <select
            className="w-full p-2 rounded-md text-slate-300 bg-slate-700 border border-slate-300 "
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="expenses">Expenses</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="">
          <label className="block text-sm font-medium text-slate-300 mb-0.5">
            Category
          </label>
          <div className="flex flex-row items-center">
            <select
              className="w-120 p-2 rounded-md text-slate-300 bg-slate-700 border border-slate-300 "
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
            <button onClick={openModal}>
              <MdAddBox size={54} className="bg-slate-700 text-slate-300" />
            </button>
            <button onClick={removeCategory}>
              <FaSquareMinus
                size={47}
                className="bg-slate-700 text-slate-300"
              />
            </button>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 px-2 py-2 rounded-lg flex justify-center items-center gap-2 text-slate-700 bg-slate-300 hover:bg-slate-700 hover:text-slate-300 transition-all hover:cursor-pointer">
        Add Transaction
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center z-<1000>">
          <div className="bg-slate-300 p-5 rounded-lg shadow-sm max-w-md w-100 ">
            <h2 className="mb-5">Add Category</h2>
            <label htmlFor="nameInput" className="block mb-2">
              Category Name:
            </label>
            <input
              className="w-full p-2 mb-4 border border-slate-700 text-slate-700 rounded-sm"
              id="nameInput"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your category"
            />
            <div className="flex justify-between">
              <button
                onClick={addCategory}
                className="py-2 px-4 bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                type="submit"
              >
                Submit
              </button>
              <button
                className="py-2 px-4 bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default TransactionForm;
