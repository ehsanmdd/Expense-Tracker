import { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { FaSquareMinus } from "react-icons/fa6";
import { useBudget } from "../../context/BudgetContext";
import {} from "react";

function TransactionForm() {
  const { addTransactions } = useBudget();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expenses",
    category: "Other",
  });

  const handelFormSubmit = (e) => {
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
    // const newId = categories.length + 1;
    // const newCategory = {  id: newId, name: inputValue };
    // const updateCategory = [...categories, newCategory]
    // setCategories(updateCategory);
    // closeModal();

    // const existingIndex = categories.findIndex((cat) => cat.name === formData.category); // Assuming formData.category is the name of the category to edit

    // if (existingIndex !== -1) {
    //   const updateCategories = [...categories];
    //   updateCategories.splice(existingIndex, 1, {...categories[existingIndex], name : inputValue})
    //   setCategories(updateCategories)
    // } else {
    //   setCategories((prevCat) => [...prevCat, newCategory]);
    //   console.log("added new category" + newCategory)
    // }

    const maxId =
      categories.length > 0 ? Math.max(...categories.map((cat) => cat.id)) : 0;
    const newId = maxId + 1;

    const existIndex = categories.findIndex(
      (cat) => cat.name === formData.category
    );

    if (existIndex !== -1) {
      if (categories[existIndex].name === "Select One") {
        console.error("Connot Edit Select One");
        closeModal();
        return;
      }

      const updateCategory = [...categories];
      updateCategory.splice(existIndex, 1, {
        ...categories[existIndex],
        name: inputValue,
      });
      setCategories(updateCategory);

      console.log("Update Category" + updateCategory[existIndex]);
    } else {
      const newCategory = { id: newId, name: inputValue };
      setCategories((prevCat) => [...prevCat, newCategory]);
      console.log("Added New Category" + newCategory);
    }

    closeModal();
  };

  const removeCategory = () => {
    const categoryItem = formData.category;
    setCategories((prevCat) =>
      prevCat.filter((cat) => cat.name !== categoryItem)
    );
    // Check LocalStorage
    // Add LocalStorage
  };

  const categoryInit = () => {
    const defualtCategories = [
      { id: 2, name: "Salary" },
      { id: 3, name: "Freelance" },
      { id: 4, name: "Investments" },
      { id: 5, name: "Food" },
      { id: 6, name: "Transport" },
      { id: 7, name: "Entertainment" },
      { id: 8, name: "Bills" },
      { id: 9, name: "Shopping" },
      { id: 10, name: "Other" },
    ];

    try {
      const savedCategory = localStorage.getItem("Budget_Category");
      if (savedCategory) {
        const parsed = JSON.parse(savedCategory);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        } else {
          console.warn(
            "Saved categories are not an array; resetting to empty."
          );
          setCategories(defualtCategories);
          localStorage.setItem(
            "Budget_Category",
            JSON.stringify(defualtCategories)
          );
        }
      } else {
        setCategories(defualtCategories);
        localStorage.setItem(
          "Budget_Category",
          JSON.stringify(defualtCategories)
        );
      }
    } catch (error) {
      console.error("Faild to load category" + error.message);
      setCategories(defualtCategories);
      localStorage.setItem(
        "Budget_Category",
        JSON.stringify(defualtCategories)
      );
    }
  };

  useEffect(() => {
    categoryInit();
    console.log(categories);
  }, []);

  useEffect(() => {
    if (!Array.isArray(categories)) {
      console.error(
        "Categories is not an array; skipping save. Categories:",
        categories
      );
      return;
    }
    console.log("Saving categories to localStorage:", categories);
    try {
      localStorage.setItem("Budget_Category", JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save categories:", error.message);
    }
  }, [categories]);

  return (
    <form
      className="bg-slate-700 p-6 rounded-lg shadow-md mb-8 "
      onSubmit={handelFormSubmit}
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
            name=""
            id=""
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
              name=""
              id=""
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.length > 0 ? (
                categories
                  .map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
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
