import React from "react";
import { useSavings } from "../context/SavingsContext";

const formatRupees = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const ExpenseChart = () => {
  const { expenses } = useSavings();

  const totals = expenses.reduce((result, expense) => {
    const category = String(expense.category || "Other");
    result[category] = (result[category] || 0) + Number(expense.amount || 0);
    return result;
  }, {});

  const data = Object.entries(totals)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);

  const width = 620;
  const height = 300;
  const left = 58;
  const right = 18;
  const top = 22;
  const bottom = 58;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const barGap = 18;
  const barWidth = data.length ? Math.min(52, (plotWidth - barGap * (data.length - 1)) / data.length) : 32;
  const totalBarsWidth = data.length * barWidth + Math.max(0, data.length - 1) * barGap;
  const startX = left + (plotWidth - totalBarsWidth) / 2;
  const gridValues = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section className="chart-card graph-card">
      <div className="history-header graph-heading">
        <div>
          <span className="graph-eyebrow">SPENDING BREAKDOWN</span>
          <h2>Expense Chart</h2>
          <p>Compare your spending by category.</p>
        </div>
        <span className="graph-total">{formatRupees(data.reduce((sum, item) => sum + item.value, 0))}</span>
      </div>

      {data.length === 0 ? (
        <div className="empty-state"><h3>No expense data yet</h3><p>Add an expense to see your graph.</p></div>
      ) : (
        <div className="graph-scroll" role="img" aria-label="Bar graph comparing expenses by category">
          <svg className="finance-graph" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            {gridValues.map((fraction) => {
              const y = top + plotHeight * (1 - fraction);
              return (
                <g key={fraction}>
                  <line x1={left} x2={width - right} y1={y} y2={y} className="graph-grid-line" />
                  <text x={left - 10} y={y + 4} textAnchor="end" className="graph-axis-label">
                    {fraction === 0 ? "0" : (maxValue * fraction >= 1000 ? `${(maxValue * fraction / 1000).toFixed(maxValue >= 10000 ? 0 : 1)}k` : Math.round(maxValue * fraction))}
                  </text>
                </g>
              );
            })}
            {data.map((item, index) => {
              const barHeight = (item.value / maxValue) * plotHeight;
              const x = startX + index * (barWidth + barGap);
              const y = top + plotHeight - barHeight;
              const label = item.label.length > 10 ? `${item.label.slice(0, 9)}…` : item.label;
              return (
                <g key={item.label}>
                  <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx="8" className="expense-graph-bar" />
                  <text x={x + barWidth / 2} y={Math.max(y - 9, 13)} textAnchor="middle" className="graph-value-label">{formatRupees(item.value)}</text>
                  <text x={x + barWidth / 2} y={height - 28} textAnchor="middle" className="graph-category-label">{label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </section>
  );
};

export default ExpenseChart;
