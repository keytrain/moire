import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import data from "../data/releaseData";
import SeriesList from "./SeriesList";
import SeriesModal from "./SeriesModal";

import logo from "../img/logoB.png";

import "./App.css";

function App() {
  const [filter, setFilter] = useState("All");

  const handleFilter = (e) => {
    setFilter(e);
  };

  let seriesData = data.list.sort((a, b) => {
    if (a.updated.getTime() < b.updated.getTime()) return 1;
    else if (a.updated.getTime() > b.updated.getTime()) return -1;
    else return 0;
  });

  switch (filter) {
    case "All":
      seriesData = data.list;
      break;
    case "Current":
      seriesData = data.list.filter((e) => {
        if (e.completed === undefined) return true;
        else return false;
      });
      break;
    case "Complete":
      seriesData = data.list.filter((e) => {
        return e.completed !== undefined && e.completed;
      });
      break;
    case "Dropped":
      seriesData = data.list.filter((e) => {
        return e.completed !== undefined && !e.completed;
      });
      break;
    default:
  }

  return (
    <div>
      <Route path="/r/:series" render={(props) => <SeriesModal {...props} />} />
      <div className="logo-container">
        <img src={logo} className="logo" alt="logo" />
        <div className="logo-text">
          <span style={{ color: "#888" }}>まいご (maigo)</span>
        </div>
      </div>

      <div className="wrapper">
        <div className="filter-controls">
          <div className="filters">
            {["All", "Current", "Complete", "Dropped"].map((e) => (
              <div
                key={e}
                style={filter === e ? { borderBottom: "2px solid #ccc" } : {}}
                onClick={() => handleFilter(e)}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
        <div className="serieslist-container">
          <div className="serieslist">
            <SeriesList list={seriesData} />
          </div>
        </div>
        <footer>
          <div className="timeline-text">
            2009 - 20XX
            <br />
            <a href="https://discord.gg/CnZBudA">Discord</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
