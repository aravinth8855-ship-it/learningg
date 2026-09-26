import React from "react";

const GoalCard = ({ goal, onDelete, onUse }) => {
  const target = Number(goal.targetAmount) || 0;
  const saved = Number(goal.savedAmount) || 0;

  const progress =
    target > 0
      ? Math.min((saved / target) * 100, 100)
      : 0;

  const remaining = Math.max(target - saved, 0);

  return (
    <div className="goal-card">
      <div className="goal-card-top">
        <span className="goal-label">
          SAVINGS GOAL
        </span>

        <span className="goal-percentage">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="goal-icon">
        🎯
      </div>

      <h3>{goal.name}</h3>

      <div className="goal-amount-row">
        <div>
          <span className="goal-small-label">
            SAVED
          </span>

          <strong>
            ₹{saved.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="goal-target">
          <span className="goal-small-label">
            TARGET
          </span>

          <strong>
            ₹{target.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="goal-progress-container">
        <div className="goal-progress-track">
          <div
            className="goal-progress-fill"
            style={{
              width: `${progress}%`
            }}
          />
        </div>
      </div>

      <div className="goal-progress-info">
        <span>
          {Math.round(progress)}% completed
        </span>

        <span>
          ₹{remaining.toLocaleString("en-IN")} left
        </span>
      </div>

      <div className="goal-card-footer">
        <button
          className="goal-use-btn"
          onClick={() => onUse(goal)}
        >
          Use This Goal
          <span>→</span>
        </button>

        <button
          className="goal-delete-btn"
          onClick={() => onDelete(goal.id)}
          title="Delete goal"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default GoalCard;