import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import GoalSetup from "./pages/GoalSetup";

import "./App.css";

const App = () => {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">

      <Navbar
        page={page}
        setPage={setPage}
      />

      <main className="main-content">

        {page === "dashboard" && (
          <Dashboard setPage={setPage} />
        )}

        {page === "goals" && (
          <GoalSetup />
        )}

      </main>

    </div>
  );
};

export default App;