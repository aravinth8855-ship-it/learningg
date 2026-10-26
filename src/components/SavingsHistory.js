import React from "react";
import { useSavings } from "../context/SavingsContext";

const SavingsHistory = () => {
  const {
    savings,
    goals,
    deleteSaving,
  } = useSavings();

  const getGoalName = (goalId) => {
    // IDs are generated as strings (for example, "timestamp-random").
    // Comparing them with Number() turns both into NaN, so valid goals
    // were incorrectly displayed as "Unknown Goal".
    const goal = goals.find(
      (item) => String(item.id) === String(goalId)
    );

    // Keep compatibility with older records that may already contain
    // the goal name even if their original goal ID is no longer available.
    if (goal) return goal.name;

    const matchingSaving = savings.find(
      (saving) => String(saving.goalId) === String(goalId)
    );

    return matchingSaving?.goalName || "Goal unavailable";
  };

  return (
    <div className="history-card">

      <div className="history-header">

        <div>
          <h2>📊 Savings History</h2>

          <p>
            Your daily savings records.
          </p>
        </div>

      </div>

      {savings.length === 0 ? (

        <div className="empty-state">
          <h3>No savings recorded yet</h3>

          <p>
            Add your daily savings using the form.
          </p>
        </div>

      ) : (

        <div className="history-list">

          {savings.map((saving) => (

            <div
              className="history-item"
              key={saving.id}
            >

              <div className="history-left">

                <div className="history-symbol saving-symbol">
                  +
                </div>

                <div className="history-details">

                  <h3>
                    {getGoalName(
                      saving.goalId
                    )}
                  </h3>

                  <p>
                    {saving.date}

                    {saving.note &&
                      ` • ${saving.note}`}
                  </p>

                </div>

              </div>

              <div className="history-right">

                <strong className="saving-amount">
                  +₹
                  {Number(
                    saving.amount
                  ).toLocaleString("en-IN")}
                </strong>

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteSaving(
                      saving.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default SavingsHistory;