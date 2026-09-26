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
      targetAmount: Number(targetAmount),
    });

    setGoalName("");
    setTargetAmount("");
  };

  return (
    <div className="goal-page">

      {/* Header */}
      <div className="goal-header">
        <div>
          <span className="goal-eyebrow">YOUR TARGETS</span>

          <h1>Financial goals</h1>

          <p>
            Turn your plans into progress. Create a goal and start
            building towards it.
          </p>
        </div>

        <div className="goal-header-icon">
          🎯
        </div>
      </div>

      {/* Create Goal Section */}
      <div className="goal-create-card">

        <div className="goal-create-info">
          <span>START A NEW GOAL</span>

          <h2>What are you saving for?</h2>

          <p>
            Set a target and keep track of your progress along the way.
          </p>
        </div>

        <form
          className="goal-form"
          onSubmit={handleSubmit}
        >
          <div className="goal-input-group">
            <label>Goal name</label>

            <input
              type="text"
              placeholder="e.g. New Bike"
              value={goalName}
              onChange={(event) =>
                setGoalName(event.target.value)
              }
            />
          </div>

          <div className="goal-input-group">
            <label>Target amount</label>

            <div className="amount-input">
              <span>₹</span>

              <input
                type="number"
                placeholder="1,00,000"
                value={targetAmount}
                onChange={(event) =>
                  setTargetAmount(event.target.value)
                }
              />
            </div>
          </div>

          <button
            className="create-goal-button"
            type="submit"
          >
            <span>+</span>
            Create Goal
          </button>
        </form>
      </div>

      {/* Goals */}
      <div className="goals-section">

        <div className="goals-section-header">
          <div>
            <span className="goal-eyebrow">YOUR PROGRESS</span>

            <h2>Your goals</h2>
          </div>

          <div className="goal-count">
            {goals.length} {goals.length === 1 ? "Goal" : "Goals"}
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="empty-goals">
            <div className="empty-goals-icon">
              🎯
            </div>

            <h3>No goals yet</h3>

            <p>
              Create your first savings goal and start tracking
              your progress.
            </p>
          </div>
        ) : (
          <div className="goals-grid">

            {goals.map((goal) => (
              <div
                className="advanced-goal-card"
                key={goal.id}
              >

                <div className="goal-card-top">
                  <div className="goal-card-icon">
                    🎯
                  </div>

                  <button
                    className="goal-delete"
                    type="button"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    ×
                  </button>
                </div>

                <span className="goal-card-label">
                  SAVINGS GOAL
                </span>

                <h3>{goal.name}</h3>

                <div className="goal-target">
                  <span>Target</span>

                  <strong>
                    ₹
                    {Number(
                      goal.targetAmount
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="goal-progress">
                  <div className="progress-header">
                    <span>Current progress</span>

                    <strong>0%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="goal-footer">
                  <span>
                    ₹0 saved
                  </span>

                  <span>
                    ₹
                    {Number(
                      goal.targetAmount
                    ).toLocaleString("en-IN")}{" "}
                    remaining
                  </span>
                </div>

                <button
                  className="use-goal-button"
                  type="button"
                >
                  Use This Goal
                  <span>→</span>
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default GoalSetup;