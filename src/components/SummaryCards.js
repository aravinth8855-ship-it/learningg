import React from "react";

const SummaryCards = ({
  goals = [],
  totalSaved = 0,
  totalExpenses = 0,
}) => {

  const totalTarget = goals.reduce(
    (total, goal) =>
      total + Number(goal?.targetAmount || 0),
    0
  );

  const totalRemaining = Math.max(
    totalTarget - Number(totalSaved || 0),
    0
  );

  const cards = [
    {
      icon: "🎯",
      label: "Total Targets",
      value: totalTarget,
      className: "blue",
    },
    {
      icon: "💰",
      label: "Total Saved",
      value: totalSaved,
      className: "green",
    },
    {
      icon: "💸",
      label: "Total Expenses",
      value: totalExpenses,
      className: "red",
    },
    {
      icon: "📌",
      label: "Remaining Target",
      value: totalRemaining,
      className: "purple",
    },
  ];

  return (
    <div className="summary-grid">

      {cards.map((card) => (

        <div
          className={`summary-card modern-summary ${card.className}`}
          key={card.label}
        >

          <div className="summary-card-top">

            <div className="summary-icon">
              {card.icon}
            </div>

            <span className="summary-arrow">
              ↗
            </span>

          </div>

          <span className="summary-label">
            {card.label}
          </span>

          <h2>
            ₹
            {Number(card.value || 0).toLocaleString(
              "en-IN"
            )}
          </h2>

          <div className="summary-line">
            <span></span>
          </div>

        </div>

      ))}

    </div>
  );
};

export default SummaryCards;