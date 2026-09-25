import React from "react";
import { useSavings } from "../context/SavingsContext";

const ExpenseChart = () => {
  const { expenses } = useSavings();

  const categoryTotals = expenses.reduce(
    (result, expense) => {
      const category =
        expense.category || "Other";

      result[category] =
        (result[category] || 0) +
        Number(expense.amount || 0);

      return result;
    },
    {}
  );

  const data = Object.entries(categoryTotals);

  const maxAmount =
    data.length > 0
      ? Math.max(...data.map((item) => item[1]))
      : 0;

  return (
    <div className="chart-card">

      <div className="history-header">

        <div>
          <h2>📈 Expense Chart</h2>

          <p>
            See where your money is being spent.
          </p>
        </div>

      </div>

      {data.length === 0 ? (

        <div className="empty-state">
          <h3>No chart data yet</h3>

          <p>
            Add expenses to generate the chart.
          </p>
        </div>

      ) : (

        <div className="chart-list">

          {data.map(([category, amount]) => {

            const percentage =
              maxAmount > 0
                ? (amount / maxAmount) * 100
                : 0;

            return (
              <div
                className="chart-row"
                key={category}
              >

                <div className="chart-label">
                  <span>{category}</span>

                  <strong>
                    ₹
                    {amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="chart-bar">
                  <div
                    className="chart-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
};

export default ExpenseChart;