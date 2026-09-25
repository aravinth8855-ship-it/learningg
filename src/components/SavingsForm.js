import React, { useState } from "react";
import { useSavings } from "../context/SavingsContext";

const SavingsForm = () => {
  const {
    goals,
    addSaving,
  } = useSavings();

  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");

  const selectedGoal = goals.find(
    (goal) =>
      String(goal.id) === String(goalId)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!goalId) {
      alert("Please select a savings goal.");
      return;
    }

    const cleanAmount = Number(amount);

    if (!cleanAmount || cleanAmount <= 0) {
      alert("Please enter a valid savings amount.");
      return;
    }

    addSaving({
      goalId,
      amount: cleanAmount,
      date,
      note: note.trim(),
    });

    setAmount("");
    setNote("");
  };

  return (
    <div className="finance-form-card savings-form-card">
      <div className="form-card-glow"></div>

      <div className="finance-form-header">
        <div className="finance-form-icon savings-icon-big">
          💰
        </div>

        <div>
          <span className="form-kicker">
            MONEY IN
          </span>

          <h2>Add Savings</h2>

          <p>
            Move money closer to your goals.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="finance-form"
      >

        <div className="input-group">
          <label>Choose goal</label>

          <div className="input-wrapper">
            <select
              value={goalId}
              onChange={(e) =>
                setGoalId(e.target.value)
              }
            >
              <option value="">
                Select a savings goal
              </option>

              {goals.map((goal) => (
                <option
                  key={goal.id}
                  value={goal.id}
                >
                  {goal.name} — ₹
                  {Number(
                    goal.targetAmount || 0
                  ).toLocaleString("en-IN")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedGoal && (
          <div className="selected-goal-preview">
            <div>
              <span>Saving towards</span>
              <strong>
                {selectedGoal.name}
              </strong>
            </div>

            <div className="goal-preview-target">
              ₹
              {Number(
                selectedGoal.targetAmount || 0
              ).toLocaleString("en-IN")}
            </div>
          </div>
        )}

        <div className="form-row">

          <div className="input-group">
            <label>Amount saved</label>

            <div className="input-wrapper">
              <span className="currency-symbol">
                ₹
              </span>

              <input
                type="number"
                min="1"
                placeholder="0"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>
          </div>

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

        </div>

        <div className="input-group">
          <label>Note</label>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="e.g. Salary savings"
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="modern-submit savings-submit"
        >
          <span>＋</span>
          Add Savings
          <span className="button-arrow">→</span>
        </button>

      </form>
    </div>
  );
};

export default SavingsForm;