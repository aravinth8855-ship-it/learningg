import React from "react";

import { useSavings } from "../context/SavingsContext";

import SummaryCards from "../components/SummaryCards";
import GoalCard from "../components/GoalCard";
import ExpenseForm from "../components/ExpenseForm";
import SavingsForm from "../components/SavingsForm";
import ExpenseHistory from "../components/ExpenseHistory";
import SavingsHistory from "../components/SavingsHistory";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  const {
    goals,
    expenses,
    savings,
  } = useSavings();

  const totalSaved = savings.reduce(
    (total, saving) =>
      total + Number(saving.amount || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const totalTarget = goals.reduce(
    (total, goal) =>
      total + Number(goal.targetAmount || 0),
    0
  );

  const remaining =
    Math.max(totalTarget - totalSaved, 0);

  const progress =
    totalTarget > 0
      ? Math.min(
          Math.round(
            (totalSaved / totalTarget) * 100
          ),
          100
        )
      : 0;

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date || 0) -
        new Date(a.date || 0)
    )
    .slice(0, 3);

  return (
    <div className="advanced-dashboard">

      {/* HERO */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <span className="hero-eyebrow">
            PERSONAL FINANCE
          </span>

          <h1>
            Take control of
            <span> your money.</span>
          </h1>

          <p>
            Track spending, build savings and
            stay focused on the goals that matter.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary"
              onClick={() =>
                document
                  .getElementById("money-actions")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Start tracking
              <span>→</span>
            </button>

            <button
              className="hero-secondary"
              onClick={() =>
                document
                  .getElementById("financial-goals")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              View goals
            </button>
          </div>

        </div>

        <div className="hero-orbit">

          <div className="orbit-ring"></div>

          <div className="hero-money-card">

            <span>Current progress</span>

            <strong>
              {progress}%
            </strong>

            <div className="hero-progress">
              <div
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <small>
              ₹
              {totalSaved.toLocaleString(
                "en-IN"
              )}{" "}
              saved
            </small>

          </div>

        </div>

      </section>

      {/* QUICK STATS */}

      <section className="dashboard-section">

        <div className="section-heading">
          <div>
            <span>OVERVIEW</span>
            <h2>Your financial pulse</h2>
          </div>

          <div className="live-indicator">
            <i></i>
            Live data
          </div>
        </div>

        <SummaryCards
          goals={goals}
          totalSaved={totalSaved}
          totalExpenses={totalExpenses}
        />

      </section>

      {/* GOALS */}

      <section
        id="financial-goals"
        className="dashboard-section"
      >

        <div className="section-heading">

          <div>
            <span>YOUR TARGETS</span>
            <h2>Financial goals</h2>
            <p>
              Every goal gets you closer to where
              you want to be.
            </p>
          </div>

        </div>

        {goals.length === 0 ? (

          <div className="premium-empty">
            <div className="empty-icon">
              🎯
            </div>

            <h3>
              Your first goal starts here
            </h3>

            <p>
              Create a savings target and start
              building momentum.
            </p>

          </div>

        ) : (

          <div className="goals-grid">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
              />
            ))}
          </div>

        )}

      </section>

      {/* MONEY ACTIONS */}

      <section
        id="money-actions"
        className="dashboard-section"
      >

        <div className="section-heading">

          <div>
            <span>MONEY ACTIONS</span>
            <h2>Move your money</h2>
            <p>
              Record savings and expenses in
              seconds.
            </p>
          </div>

        </div>

        <div className="forms-grid">
          <ExpenseForm />
          <SavingsForm />
        </div>

      </section>

      {/* ACTIVITY */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <span>ACTIVITY</span>
            <h2>Recent financial activity</h2>
          </div>

        </div>

        <div className="activity-layout">

          <div className="activity-main">
            <ExpenseHistory />
          </div>

          <div className="activity-side">
            <SavingsHistory />
          </div>

        </div>

      </section>

      {/* RECENT */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <span>QUICK VIEW</span>
            <h2>Latest expenses</h2>
          </div>

        </div>

        <div className="recent-expenses">

          {recentExpenses.length === 0 ? (

            <div className="premium-empty">
              <div className="empty-icon">
                ✨
              </div>

              <h3>No expenses yet</h3>

              <p>
                Your recent spending will appear
                here.
              </p>
            </div>

          ) : (

            recentExpenses.map((expense) => {

              const name =
                expense.name ||
                expense.title ||
                "Expense";

              return (
                <div
                  className="recent-expense"
                  key={expense.id}
                >

                  <div className="recent-expense-icon">
                    −
                  </div>

                  <div className="recent-expense-info">
                    <strong>{name}</strong>

                    <span>
                      {expense.category ||
                        "Other"}{" "}
                      •{" "}
                      {expense.date}
                    </span>
                  </div>

                  <strong className="recent-expense-amount">
                    −₹
                    {Number(
                      expense.amount || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>
              );
            })

          )}

        </div>

      </section>

      {/* ANALYTICS */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <span>ANALYTICS</span>
            <h2>Spending intelligence</h2>
            <p>
              Understand where your money is
              going.
            </p>
          </div>

        </div>

        <ExpenseChart />

      </section>

      {/* BOTTOM INSIGHT */}

      <section className="insight-banner">

        <div className="insight-icon">
          ✦
        </div>

        <div>
          <span>FINANCIAL SNAPSHOT</span>

          <h3>
            ₹
            {remaining.toLocaleString(
              "en-IN"
            )}{" "}
            remaining towards your targets
          </h3>

          <p>
            Keep recording your savings to
            maintain your progress.
          </p>
        </div>

      </section>

    </div>
  );
};

export default Dashboard;