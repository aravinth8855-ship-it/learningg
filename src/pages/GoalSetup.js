import React, { useState } from "react";
import { useSavings } from "../context/SavingsContext";

const GoalSetup = () => {
  const { addGoal, goals, deleteGoal } = useSavings();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [showForm, setShowForm] = useState(false);

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
      targetAmount: Number(targetAmount)
    });

    setGoalName("");
    setTargetAmount("");
    setShowForm(false);
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  return (
    <div className="goal-page">

      {/* HERO SECTION */}
      <section className="goal-hero">

        <div className="goal-hero-content">

          <div className="goal-eyebrow">
            <span className="eyebrow-dot"></span>
            FINANCIAL PLANNING
          </div>

          <h1>
            Turn your plans
            <br />
            into <span>progress.</span>
          </h1>

          <p>
            Create savings goals, track your targets and
            build your financial future one step at a time.
          </p>

          <button
            className="primary-goal-button"
            onClick={() => setShowForm(true)}
          >
            <span>+</span>
            Create New Goal
          </button>

        </div>

        {/* HERO VISUAL */}
        <div className="goal-hero-visual">

          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-target">

            <div className="target-icon">
              🎯
            </div>

            <div className="target-label">
              SAVINGS TARGET
            </div>

            <div className="target-amount">
              ₹1,00,000
            </div>

            <div className="target-progress">
              <div className="target-progress-fill"></div>
            </div>

            <div className="target-bottom">
              <span>Build your future</span>
              <span>24%</span>
            </div>

          </div>

        </div>

      </section>


      {/* QUICK STATS */}
      <section className="goal-stats">

        <div className="goal-stat-card">

          <div className="stat-icon purple">
            🎯
          </div>

          <div>
            <span>ACTIVE GOALS</span>
            <strong>{goals.length}</strong>
          </div>

        </div>


        <div className="goal-stat-card">

          <div className="stat-icon green">
            ₹
          </div>

          <div>
            <span>TOTAL TARGET</span>

            <strong>
              ₹
              {formatAmount(
                goals.reduce(
                  (total, goal) =>
                    total + Number(goal.targetAmount || 0),
                  0
                )
              )}
            </strong>

          </div>

        </div>


        <div className="goal-stat-card">

          <div className="stat-icon orange">
            ↗
          </div>

          <div>
            <span>FINANCIAL FOCUS</span>
            <strong>Growing</strong>
          </div>

        </div>

      </section>


      {/* GOALS SECTION */}
      <section className="goals-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              YOUR FINANCIAL PLAN
            </span>

            <h2>Your Goals</h2>

            <p>
              Stay focused on what you're saving for.
            </p>
          </div>

          <button
            className="small-add-button"
            onClick={() => setShowForm(true)}
          >
            + Add Goal
          </button>

        </div>


        {goals.length === 0 ? (

          <div className="empty-goals">

            <div className="empty-icon">
              🎯
            </div>

            <h3>No goals yet</h3>

            <p>
              Start your first financial goal and
              turn your plans into progress.
            </p>

            <button
              onClick={() => setShowForm(true)}
            >
              Create your first goal
            </button>

          </div>

        ) : (

          <div className="advanced-goals-grid">

            {goals.map((goal, index) => {

              const target = Number(goal.targetAmount || 0);

              /*
                Your current goal object only contains:
                name + targetAmount.

                So the progress starts at 0 until your
                savings context connects savings to goals.
              */
              const saved = Number(
                goal.savedAmount || 0
              );

              const percentage =
                target > 0
                  ? Math.min(
                      Math.round((saved / target) * 100),
                      100
                    )
                  : 0;

              const remaining =
                Math.max(target - saved, 0);

              return (

                <div
                  className="advanced-goal-card"
                  key={goal.id}
                >

                  {/* TOP */}
                  <div className="goal-card-top">

                    <div className="goal-card-icon">
                      {index % 3 === 0
                        ? "🚀"
                        : index % 3 === 1
                        ? "🏠"
                        : "⭐"}
                    </div>

                    <button
                      className="delete-goal-button"
                      type="button"
                      onClick={() => deleteGoal(goal.id)}
                      title="Delete goal"
                    >
                      ×
                    </button>

                  </div>


                  {/* NAME */}
                  <div className="goal-card-title">

                    <span>GOAL {String(index + 1).padStart(2, "0")}</span>

                    <h3>{goal.name}</h3>

                  </div>


                  {/* AMOUNT */}
                  <div className="goal-money">

                    <div>
                      <span>Target amount</span>

                      <strong>
                        ₹{formatAmount(target)}
                      </strong>
                    </div>

                    <div className="goal-percent">
                      {percentage}%
                    </div>

                  </div>


                  {/* PROGRESS */}
                  <div className="advanced-progress">

                    <div className="progress-track">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${percentage}%`
                        }}
                      ></div>

                    </div>

                    <div className="progress-info">

                      <span>
                        ₹{formatAmount(saved)} saved
                      </span>

                      <span>
                        ₹{formatAmount(remaining)} remaining
                      </span>

                    </div>

                  </div>


                  {/* FOOTER */}
                  <div className="goal-card-footer">

                    <div className="goal-status">

                      <span className="status-dot"></span>

                      {percentage >= 100
                        ? "Goal completed"
                        : "In progress"}

                    </div>

                    <span className="arrow">
                      →
                    </span>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>


      {/* CREATE GOAL MODAL */}
      {showForm && (

        <div
          className="goal-modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="goal-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              🎯
            </div>

            <span className="modal-label">
              NEW FINANCIAL GOAL
            </span>

            <h2>
              What are you
              <br />
              saving for?
            </h2>

            <p>
              Give your goal a name and set the
              amount you want to reach.
            </p>


            <form onSubmit={handleSubmit}>

              <div className="modern-input-group">

                <label>
                  Goal name
                </label>

                <input
                  type="text"
                  placeholder="Example: New Bike"
                  value={goalName}
                  onChange={(event) =>
                    setGoalName(event.target.value)
                  }
                  autoFocus
                />

              </div>


              <div className="modern-input-group">

                <label>
                  Target amount
                </label>

                <div className="amount-input">

                  <span>₹</span>

                  <input
                    type="number"
                    placeholder="1,00,000"
                    value={targetAmount}
                    onChange={(event) =>
                      setTargetAmount(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>


              <button
                className="create-goal-submit"
                type="submit"
              >
                Create Goal
                <span>→</span>
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default GoalSetup;