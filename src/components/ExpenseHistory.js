import React, { useMemo, useState } from "react";
import { useSavings } from "../context/SavingsContext";

const ExpenseHistory = () => {
  const {
    expenses = [],
    deleteExpense,
    editExpense,
  } = useSavings();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] =
    useState("");

  const categories = useMemo(() => {
    const values = expenses
      .map(
        (expense) =>
          expense?.category || "Other"
      )
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    const text = search.trim().toLowerCase();

    return expenses.filter((expense) => {
      const name = String(
        expense?.name ||
          expense?.title ||
          "Expense"
      ).toLowerCase();

      const category = String(
        expense?.category || "Other"
      ).toLowerCase();

      const matchesSearch =
        !text ||
        name.includes(text) ||
        category.includes(text);

      const matchesCategory =
        categoryFilter === "All" ||
        category ===
          categoryFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    expenses,
    search,
    categoryFilter,
  ]);

  const startEdit = (expense) => {
    setEditingExpense(expense);

    setEditName(
      expense?.name ||
        expense?.title ||
        "Expense"
    );

    setEditAmount(expense?.amount || "");

    setEditCategory(
      expense?.category || "Other"
    );
  };

  const cancelEdit = () => {
    setEditingExpense(null);
    setEditName("");
    setEditAmount("");
    setEditCategory("");
  };

  const saveEdit = () => {
    if (!editingExpense) return;

    if (!editName.trim()) {
      alert("Enter an expense name.");
      return;
    }

    if (!editAmount || Number(editAmount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    editExpense({
      ...editingExpense,

      name: editName.trim(),

      amount: Number(editAmount),

      category:
        editCategory.trim() || "Other",
    });

    cancelEdit();
  };

  return (
    <div className="history-card modern-history">

      <div className="history-header">

        <div>
          <span className="eyebrow">
            ACTIVITY
          </span>

          <h2>Expense History</h2>

          <p>
            Search, review and manage your
            spending.
          </p>
        </div>

        <div className="history-count">
          {filteredExpenses.length}
          <span>records</span>
        </div>

      </div>

      <div className="history-controls">

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>

      <div className="history-list">

        {filteredExpenses.length === 0 ? (

          <div className="empty-history">
            <div>◎</div>
            <h3>No expenses found</h3>
            <p>
              Add an expense to start tracking
              your spending.
            </p>
          </div>

        ) : (

          filteredExpenses.map((expense) => {

            const name =
              expense?.name ||
              expense?.title ||
              "Expense";

            const category =
              expense?.category ||
              "Other";

            const amount =
              Number(expense?.amount) || 0;

            const date =
              expense?.date || "";

            return (
              <div
                className="history-item modern-history-item"
                key={expense.id}
              >

                <div className="history-left">

                  <div className="expense-avatar">
                    {category
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="history-details">

                    <h3>{name}</h3>

                    <p>
                      {category}
                      {date &&
                        ` • ${date}`}
                    </p>

                  </div>

                </div>

                <div className="history-right">

                  <strong className="expense-amount">
                    -₹
                    {amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <div className="history-actions">

                    <button
                      className="edit-button"
                      onClick={() =>
                        startEdit(expense)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteExpense(
                          expense.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>

      {editingExpense && (

        <div className="edit-expense-box">

          <div>
            <span className="eyebrow">
              EDIT RECORD
            </span>

            <h3>Update expense</h3>
          </div>

          <input
            type="text"
            placeholder="Expense name"
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Amount"
            value={editAmount}
            onChange={(e) =>
              setEditAmount(e.target.value)
            }
          />

          <select
            value={editCategory}
            onChange={(e) =>
              setEditCategory(e.target.value)
            }
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Other</option>
          </select>

          <div className="edit-buttons">

            <button
              className="save-button"
              onClick={saveEdit}
            >
              Save Changes
            </button>

            <button
              className="cancel-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ExpenseHistory;