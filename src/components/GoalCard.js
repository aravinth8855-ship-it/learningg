import React from "react";
import { useSavings } from "../context/SavingsContext";

const GoalCard = ({ goal }) => {
  const { savings, deleteGoal } = useSavings();

  // Get all savings belonging to this goal
  const goalSavings = savings.filter(
    (saving) => String(saving.goalId) === String(goal.id)
  );

  // Calculate total saved for this particular goal
  const savedAmount = goalSavings.reduce(
    (total, saving) =>
      total + Number(saving.amount || 0),
    0
  );

  const targetAmount = Number(
    goal.targetAmount || 0
  );

  // Calculate progress percentage
  const progress =
    targetAmount > 0
      ? Math.min(
          Math.round(
            (savedAmount / targetAmount) * 100
          ),
          100
        )
      : 0;

  // Calculate remaining amount
  const remaining = Math.max(
    targetAmount - savedAmount,
    0
  );

  return (
    <div className="goal-card">

      {/* TOP SECTION */}
      <div className="goal-card-top">

        <div>
          <span className="goal-label">
            SAVINGS GOAL
          </span>

          <div className="goal-icon">
            🎯
          </div>

          <h3>{goal.name}</h3>
        </div>

        <div className="goal-percentage">
          {progress}%
        </div>

      </div>

      {/* MONEY DETAILS */}
      <div className="goal-money-grid">

        <div className="goal-money-box">
          <span>SAVED</span>

          <strong>
            ₹
            {savedAmount.toLocaleString(
              "en-IN"
            )}
          </strong>
        </div>

        <div className="goal-money-box">
          <span>TARGET</span>

          <strong>
            ₹
            {targetAmount.toLocaleString(
              "en-IN"
            )}
          </strong>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="goal-progress-container">

        <div className="goal-progress-bar">
          <div
            className="goal-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        <div className="goal-progress-info">

          <span>
            {progress}% completed
          </span>

          <span>
            ₹
            {remaining.toLocaleString(
              "en-IN"
            )}{" "}
            left
          </span>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="goal-actions">

        <button
          type="button"
          className="use-goal-button"
        >
          Use This Goal
          <span>→</span>
        </button>

        <button
          type="button"
          className="delete-goal-button"
          onClick={() => deleteGoal(goal.id)}
          title="Delete goal"
        >
          🗑
        </button>

      </div>

    </div>
  );
};

export default GoalCard;