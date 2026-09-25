import React from "react";
import { useSavings } from "../context/SavingsContext";

const GoalCard = ({ goal }) => {
  const { savings, selectedGoalId, setSelectedGoalId, deleteGoal } =
    useSavings();

  const goalSavings = savings
    .filter(
      (saving) =>
        Number(saving.goalId) === Number(goal.id)
    )
    .reduce(
      (total, saving) =>
        total + Number(saving.amount || 0),
      0
    );

  const target = Number(goal.targetAmount || 0);

  const percentage =
    target > 0
      ? Math.min((goalSavings / target) * 100, 100)
      : 0;

  const remaining = Math.max(
    target - goalSavings,
    0
  );

  const isSelected =
    Number(selectedGoalId) === Number(goal.id);

  return (
    <div
      className={
        isSelected
          ? "goal-card selected"
          : "goal-card"
      }
    >

      <div className="goal-card-top">

        <div>
          <span className="goal-label">
            SAVINGS GOAL
          </span>

          <h3>{goal.name}</h3>
        </div>

        <span className="goal-percent">
          {Math.round(percentage)}%
        </span>

      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="goal-numbers">

        <span>
          Saved ₹
          {goalSavings.toLocaleString("en-IN")}
        </span>

        <span>
          Target ₹
          {target.toLocaleString("en-IN")}
        </span>

      </div>

      <div className="goal-remaining">
        ₹{remaining.toLocaleString("en-IN")} remaining
      </div>

      <div className="goal-actions">

        <button
          className="select-goal-button"
          onClick={() =>
            setSelectedGoalId(String(goal.id))
          }
        >
          {isSelected
            ? "Selected"
            : "Use This Goal"}
        </button>

        <button
          className="delete-button"
          onClick={() => {
            const confirmDelete = window.confirm(
              `Delete "${goal.name}" and its savings records?`
            );

            if (confirmDelete) {
              deleteGoal(goal.id);
            }
          }}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default GoalCard;