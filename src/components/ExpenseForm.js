import React, { useState } from "react";
import { useSavings } from "../context/SavingsContext";

const ExpenseForm = () => {
  const { addExpense } = useSavings();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanAmount = Number(amount);

    if (!cleanTitle) {
      alert("Please enter an expense name.");
      return;
    }

    if (!cleanAmount || cleanAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addExpense({
      name: cleanTitle,
      title: cleanTitle,
      amount: cleanAmount,
      category,
      date,
      note: note.trim(),
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setNote("");
  };

  return (
    <div className="finance-form-card expense-form-card">
      <div className="form-card-glow"></div>

      <div className="finance-form-header">
        <div className="finance-form-icon expense-icon-big">
          💸
        </div>

        <div>
          <span className="form-kicker">
            MONEY OUT
          </span>

          <h2>Add Expense</h2>

          <p>
            Track where your money is going.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="finance-form">

        <div className="input-group">
          <label>Expense name</label>

          <div className="input-wrapper">
            <span className="input-symbol">✦</span>

            <input
              type="text"
              placeholder="e.g. Petrol, Netflix, Lunch"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-row">

          <div className="input-group">
            <label>Amount</label>

            <div className="input-wrapper">
              <span className="currency-symbol">
                ₹
              </span>

              <input
                type="number"
                placeholder="0"
                min="1"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>Category</label>

            <div className="input-wrapper">
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
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
            </div>
          </div>

        </div>

        <div className="form-row">

          <div className="input-group">
            <label>Date</label>

            <div className="input-wrapper">
              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>Note</label>

            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Optional note"
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
              />
            </div>
          </div>

        </div>

        <button
          type="submit"
          className="modern-submit expense-submit"
        >
          <span>＋</span>
          Add Expense
          <span className="button-arrow">→</span>
        </button>

      </form>
    </div>
  );
};

export default ExpenseForm;