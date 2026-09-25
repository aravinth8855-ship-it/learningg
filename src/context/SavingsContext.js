import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SavingsContext = createContext();

const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const SavingsProvider = ({ children }) => {
  const [goals, setGoals] = useState(() =>
    getStoredData("savingsGoals")
  );

  const [savings, setSavings] = useState(() =>
    getStoredData("savingsRecords")
  );

  const [expenses, setExpenses] = useState(() =>
    getStoredData("expenseRecords")
  );

  /* =========================
     PERMANENT STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem("savingsGoals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("savingsRecords", JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem("expenseRecords", JSON.stringify(expenses));
  }, [expenses]);

  /* =========================
     GOALS
  ========================= */

  const createGoal = (goal) => {
    const newGoal = {
      id: createId(),
      name: String(goal.name || "").trim(),
      targetAmount: Number(goal.targetAmount) || 0,
      createdAt: new Date().toISOString(),
    };

    setGoals((previous) => [...previous, newGoal]);

    return newGoal;
  };

  const addGoal = createGoal;

  const deleteGoal = (id) => {
    setGoals((previous) =>
      previous.filter((goal) => String(goal.id) !== String(id))
    );

    setSavings((previous) =>
      previous.filter(
        (saving) => String(saving.goalId) !== String(id)
      )
    );
  };

  /* =========================
     SAVINGS
  ========================= */

  const addSaving = (saving) => {
    const newSaving = {
      id: createId(),
      goalId: saving.goalId,
      amount: Number(saving.amount) || 0,
      date:
        saving.date ||
        new Date().toISOString().split("T")[0],
      note: String(saving.note || "").trim(),
    };

    setSavings((previous) => [
      ...previous,
      newSaving,
    ]);

    return newSaving;
  };

  const deleteSaving = (id) => {
    setSavings((previous) =>
      previous.filter(
        (saving) => String(saving.id) !== String(id)
      )
    );
  };

  /* =========================
     EXPENSES
  ========================= */

  const addExpense = (expense) => {
    const expenseName = String(
      expense.name ||
        expense.title ||
        expense.description ||
        "Unnamed Expense"
    ).trim();

    const newExpense = {
      id: createId(),

      // Save BOTH names so old/new components work
      name: expenseName,
      title: expenseName,

      category:
        String(expense.category || "Other").trim(),

      amount: Number(expense.amount) || 0,

      date:
        expense.date ||
        new Date().toISOString().split("T")[0],

      note: String(expense.note || "").trim(),

      createdAt: new Date().toISOString(),
    };

    setExpenses((previous) => [
      ...previous,
      newExpense,
    ]);

    return newExpense;
  };

  const deleteExpense = (id) => {
    setExpenses((previous) =>
      previous.filter(
        (expense) => String(expense.id) !== String(id)
      )
    );
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((previous) =>
      previous.map((expense) => {
        if (String(expense.id) !== String(id)) {
          return expense;
        }

        const expenseName = String(
          updatedExpense.name ||
            updatedExpense.title ||
            expense.name ||
            "Unnamed Expense"
        ).trim();

        return {
          ...expense,
          ...updatedExpense,
          id: expense.id,
          name: expenseName,
          title: expenseName,
          amount:
            Number(updatedExpense.amount) || 0,
          category:
            updatedExpense.category ||
            expense.category ||
            "Other",
        };
      })
    );
  };

  // Keep old function name working too
  const editExpense = (updatedExpense) => {
    updateExpense(
      updatedExpense.id,
      updatedExpense
    );
  };

  /* =========================
     TOTALS
  ========================= */

  const totalSaved = useMemo(() => {
    return savings.reduce(
      (total, saving) =>
        total + Number(saving.amount || 0),
      0
    );
  }, [savings]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  const totalTarget = useMemo(() => {
    return goals.reduce(
      (total, goal) =>
        total + Number(goal.targetAmount || 0),
      0
    );
  }, [goals]);

  /* =========================
     CONTEXT
  ========================= */

  const value = {
    goals,
    savings,
    expenses,

    createGoal,
    addGoal,
    deleteGoal,

    addSaving,
    deleteSaving,

    addExpense,
    deleteExpense,
    updateExpense,
    editExpense,

    totalSaved,
    totalExpenses,
    totalTarget,
  };

  return (
    <SavingsContext.Provider value={value}>
      {children}
    </SavingsContext.Provider>
  );
};

export const useSavings = () => {
  return useContext(SavingsContext);
};

export default SavingsContext;