import React from "react";
import { useSavings } from "../context/SavingsContext";

const formatRupees = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const shortDate = (date) => {
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const SavingsChart = () => {
  const { savings } = useSavings();

  // Group savings by date and show cumulative savings over time.
  const byDate = savings.reduce((result, saving) => {
    const date = saving.date || "Undated";
    result[date] = (result[date] || 0) + Number(saving.amount || 0);
    return result;
  }, {});

  const daily = Object.entries(byDate)
    .filter(([date]) => date !== "Undated")
    .sort(([a], [b]) => new Date(a) - new Date(b));

  let runningTotal = 0;
  const data = daily.map(([date, amount]) => {
    runningTotal += amount;
    return { date, amount, total: runningTotal };
  });

  const width = 620;
  const height = 300;
  const left = 58;
  const right = 22;
  const top = 24;
  const bottom = 52;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const values = data.map((item) => item.total);
  const dataMin = values.length ? Math.min(...values) : 0;
  const dataMax = values.length ? Math.max(...values) : 1;
  const spread = dataMax - dataMin;
  const padding = spread > 0 ? spread * 0.25 : Math.max(dataMax * 0.12, 100);
  // A little headroom and a focused vertical scale make small changes visible.
  const minValue = Math.max(0, dataMin - padding);
  const maxValue = dataMax + padding;
  const points = data.map((item, index) => ({
    ...item,
    x: data.length <= 1 ? left + plotWidth / 2 : left + (index / (data.length - 1)) * plotWidth,
    y: top + plotHeight - ((item.total - minValue) / Math.max(maxValue - minValue, 1)) * plotHeight,
  }));
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${top + plotHeight} L ${points[0].x} ${top + plotHeight} Z`
    : "";
  const gridValues = [0, 0.25, 0.5, 0.75, 1];
  const totalSaved = savings.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <section className="chart-card graph-card">
      <div className="history-header graph-heading">
        <div>
          <span className="graph-eyebrow">SAVINGS PROGRESS</span>
          <h2>Savings Chart</h2>
          <p>Track your cumulative savings over time.</p><span className="graph-scale-note">Scale adjusted to make progress changes easier to see.</span>
        </div>
        <span className="graph-total graph-total-savings">{formatRupees(totalSaved)}</span>
      </div>

      {data.length === 0 ? (
        <div className="empty-state"><h3>No savings data yet</h3><p>Add savings with a date to see your progress graph.</p></div>
      ) : (
        <div className="graph-scroll" role="img" aria-label="Line graph showing cumulative savings over time">
          <svg className="finance-graph" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="savingsAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#36cfa0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#36cfa0" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {gridValues.map((fraction) => {
              const y = top + plotHeight * (1 - fraction);
              return (
                <g key={fraction}>
                  <line x1={left} x2={width - right} y1={y} y2={y} className="graph-grid-line" />
                  <text x={left - 10} y={y + 4} textAnchor="end" className="graph-axis-label">
                    {(() => { const value = minValue + (maxValue - minValue) * fraction; return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : Math.round(value); })()}
                  </text>
                </g>
              );
            })}
            {points.length > 1 && <path d={areaPath} fill="url(#savingsAreaFill)" />}
            {points.length > 1 && <path d={linePath} className="savings-graph-line" />}
            {points.map((point, index) => (
              <g key={`${point.date}-${index}`}>
                <circle cx={point.x} cy={point.y} r="5" className="savings-graph-point" />
                {(points.length <= 6 || index === 0 || index === points.length - 1 || index === Math.floor(points.length / 2)) && (
                  <text x={point.x} y={height - 24} textAnchor="middle" className="graph-category-label">{shortDate(point.date)}</text>
                )}
              </g>
            ))}
          </svg>
        </div>
      )}
    </section>
  );
};

export default SavingsChart;
