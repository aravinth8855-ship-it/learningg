import React, { useState } from "react";
import { useSavings } from "../context/SavingsContext";

const GoalSetup = () => {
  const { addGoal, goals, deleteGoal } = useSavings();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!goalName.trim()) {
      alert("Please enter goal name");
      return;
    }

    if (!targetAmount || Number(targetAmount) <= 0) {
      alert("Please enter a valid target amount");
      return;
    }

    addGoal({
      name: goalName.trim(),
      targetAmount: Number(targetAmount)
    });

    setGoalName("");
    setTargetAmount("");
  };

  return (
    <div className="goal-setup">
      <h1>🎯 Create Savings Goals</h1>

      <p>
        Create multiple goals and save towards each one separately.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Goal Name</label>

        <input
          type="text"
          placeholder="Example: New Bike"
          value={goalName}
          onChange={(event) =>
            setGoalName(event.target.value)
          }
        />

        <label>Target Amount</label>

        <input
          type="number"
          placeholder="Enter target amount"
          value={targetAmount}
          onChange={(event) =>
            setTargetAmount(event.target.value)
          }
        />

        <button type="submit">
          + Create Goal
        </button>
      </form>

      <div className="goals-list">
        <h2>Your Goals</h2>

        {goals.length === 0 ? (
          <p>No goals yet</p>
        ) : (
          goals.map((goal) => (
            <div
              className="goal-card"
              key={goal.id}
            >
              <div>
                <h3>{goal.name}</h3>

                <p>
                  Target: ₹
                  {Number(
                    goal.targetAmount
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => deleteGoal(goal.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalSetup;