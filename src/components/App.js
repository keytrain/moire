import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import MdFilterList from "react-icons/lib/md/filter-list";
import MdSearch from "react-icons/lib/md/search";
import MdSort from "react-icons/lib/md/sort";
import MdMoreVert from "react-icons/lib/md/more-vert";

import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import data from "../data/releaseData";
import SeriesList from "./SeriesList";
import SeriesModal from "./SeriesModal";

import logo from "../img/logoB.png";
import { ReactComponent as DiscordIcon } from "../img/discord-icon.svg";

import "./App.css";

function App() {
  const [seriesData, setSeriesData] = useState(
    data.list.sort((a, b) => {
      if (a.updated.getTime() < b.updated.getTime()) return 1;
      else if (a.updated.getTime() > b.updated.getTime()) return -1;
      else return 0;
    })
  );
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Date");
  const [searchBuffer, setSearchBuffer] = useState("");

  const handleFilter = (e) => {
    setFilter(e);
    // let value = e.currentTarget.attributes.value.value;
    // let name = e.currentTarget.attributes.name.value;

    // switch (name) {
    //   case "sort":
    //     setSort(value);
    //     break;
    //   case "filter":
    //     setFilter(value);
    //     break;
    //   default:
    // }
  };

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    setSearchBuffer(value);
  };

  useEffect(() => {
    let dataTemp = null;
    switch (filter) {
      case "All":
        dataTemp = data.list;
        break;
      case "Current":
        dataTemp = data.list.filter((e) => {
          if (e.completed === undefined) return true;
          else return false;
        });
        break;
      case "Complete":
        dataTemp = data.list.filter((e) => {
          return e.completed !== undefined && e.completed;
        });
        break;
      case "Dropped":
        dataTemp = data.list.filter((e) => {
          return e.completed !== undefined && !e.completed;
        });
        break;
      default:
    }

    switch (sort) {
      case "Date":
        dataTemp = dataTemp.sort((a, b) => {
          if (a.updated.getTime() < b.updated.getTime()) return 1;
          else if (a.updated.getTime() > b.updated.getTime()) return -1;
          else return 0;
        });
        break;
      case "Alphabetical":
        dataTemp = dataTemp.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        break;
      default:
    }

    if (searchBuffer.length > 0) {
      dataTemp = dataTemp.filter((e) => e.title.toLowerCase().includes(searchBuffer));
    }

    setSeriesData([...dataTemp]);
  }, [filter, sort, searchBuffer]);

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
            <SeriesList title="" list={seriesData} />
          </div>
        </div>
        <footer>
          <div className="timeline-text">2009 - ?</div>
          <div className="discord">
            <div>
              <a href="https://discord.gg/CnZBudA">
                <DiscordIcon style={{ width: "24px" }} />
              </a>
            </div>
          </div>
        </footer>
      </div>
      {/* <nav>
        <div className="nav-container">
          <div className="filter-container">
            <div className="search">
              <MdSearch size={24} style={{ marginBottom: "2px", marginRight: "0.3rem" }} />
              <input type="search" onChange={handleSearch} />
            </div>
            <div className="filterBy">
              <Dropdown
                position="top"
                attach={
                  <div>
                    <MdFilterList size={24} style={{ marginBottom: "2px" }} /> <small>FILTER</small>
                  </div>
                }
              >
                {["All", "Current", "Complete", "Dropped"].map((e) => (
                  <DropdownItem
                    key={e}
                    name={"filter"}
                    icon={<MdFilterList size={16} />}
                    selection={filter}
                    text={e}
                    handle={handleFilter}
                  />
                ))}
              </Dropdown>
            </div>
            <div className="sortBy">
              <Dropdown
                position="top"
                attach={
                  <div>
                    <MdSort size={24} style={{ marginBottom: "2px" }} /> <small>SORT</small>
                  </div>
                }
              >
                {["Date", "Alphabetical"].map((e) => (
                  <DropdownItem
                    key={e}
                    name={"sort"}
                    icon={<MdSort size={16} />}
                    selection={sort}
                    text={e}
                    handle={handleFilter}
                  />
                ))}
              </Dropdown>
            </div>

            <div className="more">
              <Dropdown
                position="top"
                attach={<MdMoreVert size={24} style={{ marginBottom: "2px" }} />}
              >
                <div>
                  <a href="https://discord.gg/CnZBudA">
                    <DropdownItem
                      icon={
                        <img
                          style={{
                            height: "1.4rem",
                            verticalAlign: "middle",
                          }}
                          src={discordIcon}
                          alt="discord logo"
                        />
                      }
                      text={"Discord"}
                    />
                  </a>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav> */}
    </div>
  );
}

export default App;
