import logo from "./logo.svg";
import "./App.css";
import "./normalize.css";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Papa from "papaparse";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { optionalFieldsForRunsTable } from "../src/config";
import { optionalFieldsForResultsTable } from "../src/config";
import { runsTableCsvFile } from "../src/config";
import logo1 from "../src/images/Wisecube-icon-no-text.jpg";
import Loading from "./images/loading.gif";
const csv = require("csvtojson");

function App() {
  let arr = ["ABC", "DEF", "GHI"];
  const [htmlData, setHtmlData] = useState([]);
  const [history, setHistory] = useState([]);
  const [popUp, setPopUp] = useState("");
  const [tableTitle, setTableTitle] = useState("");
  const [currentSort, setCurrentSort] = useState("Run name");
  const [columnTitles, setColumnTitles] = useState([
    "Run Name",
    "Run Date",
    "Score Name",
    "Score",
    ...optionalFieldsForRunsTable,
    "Gdrive URL",
  ]);
  const [secondColTitles, setSecondColTitles] = useState([
    "ID",
    "Input",
    "Result",
    "Label",
    ...optionalFieldsForResultsTable,
  ]);
  const [secondSortDropdown, setSecondSortDropdown] = useState([
    "Default",
    "ID",
    "Input",
    "Result",
    "Label",
  ]);
  const [defaultSort, setDefaultSort] = useState("");
  const [query, SetQuery] = useState("");
  const [columnSearchQuery, setColumnSearchQuery] = useState("ID");
  const [rowsLength, setRowsLength] = useState(0);
  const [rowsLengthForTableData, setRowsLengthForTableData] = useState(0);
  const [dict, setDict] = useState({});
  const [dict2, setDict2] = useState({});

  useEffect(() => {
    if (currentSort == "Run Name") {
      let newHistory = [...history];
      let first = newHistory.shift();

      newHistory.sort((a, b) => {
        if (a[0] > b[0]) {
          return 1;
        } else if (b[0] > a[0]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
    } else if (currentSort == "Run Date") {
      let newHistory = [...history];
      let first = newHistory.shift();

      newHistory.sort(function (a, b) {
        let split4a = a[1].split("/");

        let split4b = b[1].split("/");

        if (split4a[1].length == 1) {
          split4a[1] = "0" + split4a[1];
        }
        if (split4b[1].length == 1) {
          split4b[1] = "0" + split4b[1];
        }

        var dateA = new Date(a[1]),
          dateB = new Date(b[1]);
        if (dateB > dateA) {
          return -1;
        } else {
          return 1;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
    } else if (currentSort == "Score Name") {
      let newHistory = [...history];
      let first = newHistory.shift();

      newHistory.sort((a, b) => {
        if (b[2] < a[2]) {
          return 1;
        } else if (a[2] < b[2]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
    } else if (currentSort == "Score") {
      let newHistory = [...history];
      let first = newHistory.shift();

      newHistory.sort((a, b) => {
        if (a[3] < b[3]) {
          return 1;
        } else if (b[3] < a[3]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
    }
    if (currentSort == "Default") {
      setHtmlData(defaultSort);
    }
    if (currentSort == "ID") {
      let newHtmlData = [...htmlData];
      let first = newHtmlData.shift();

      newHtmlData.sort((a, b) => {
        if (Number(a[0]) > Number(b[0])) {
          return 1;
        } else if (Number(b[0]) > Number(a[0])) {
          return -1;
        } else {
          return 0;
        }
      });
      newHtmlData.unshift(first);
      setHtmlData(newHtmlData);
    } else if (currentSort == "Input") {
      let newHtmlData = [...htmlData];
      let first = newHtmlData.shift();

      newHtmlData.sort((a, b) => {
        if (a[1] > b[1]) {
          return 1;
        } else if (b[1] > a[1]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHtmlData.unshift(first);
      setHtmlData(newHtmlData);
    } else if (currentSort == "Result") {
      let newHtmlData = [...htmlData];
      let first = newHtmlData.shift();

      newHtmlData.sort((a, b) => {
        if (a[2] > b[2]) {
          return 1;
        } else if (b[2] > a[2]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHtmlData.unshift(first);
      setHtmlData(newHtmlData);
    } else if (currentSort == "Label") {
      let newHtmlData = [...htmlData];
      let first = newHtmlData.shift();

      newHtmlData.sort((a, b) => {
        if (a[3] > b[3]) {
          return 1;
        } else if (b[3] > a[3]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHtmlData.unshift(first);
      setHtmlData(newHtmlData);
    }
  }, [currentSort, setCurrentSort]);
  const sortTypes = {
    up: {
      class: "sort-up",
      fn: (a, b) => a["Number of questions"] - b["Number of question"],
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b["Number of questions"] - a["Number of question"],
    },
    default: {
      class: "sort",
      fn: (a, b) => a,
    },
  };
  function sortData() {
    let sortedItems = [...htmlData];
    sortedItems.sort((a, b) => {
      if (a[0] > b[0]) {
        return -1;
      }
    });
  }
  function onSortChange() {
    const { currentSort } = currentSort;
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentSort(nextSort);
  }

  useEffect(() => {
    Papa.parse(runsTableCsvFile, {
      download: true,
      delimiter: ",",
      complete: (result) => {
        setHistory(result.data);

        setRowsLength(result.data.length);
      },
    });
  }, [htmlData]);
  function handleClick2(e, title) {
    setTableTitle(title);
    setHtmlData([]);
    Papa.parse(e, {
      download: true,
      delimiter: ",",
      complete: (result) => {
        setHtmlData(result.data);
        setDefaultSort(result.data);
        setRowsLengthForTableData(result.data.length);
      },
    });
  }

  return (
    <div className="App">
      <img
        style={{ position: "absolute", top: "0", left: "0" }}
        src={logo1}
        height={"100px"}
        width={"100px"}
      ></img>
      <h3 style={{ paddingBottom: "50px" }}>Runs Table</h3>
      {runsTableCsvFile != "" ? (
        <div className="topTableContainer">
          {history.length ? (
            <select
              className="selectMenu"
              onChange={(e) => setCurrentSort(e.target.value)}
            >
              {history[0]?.map((item, idex) => {
                if (item != "Gdrive URL" && idex < 4)
                  return (
                    <>
                      <option key={item}>{item}</option>
                    </>
                  );
              })}
            </select>
          ) : null}
          {history[0]?.map((item, idx) => {
            dict[item] = idx;
          })}
          <div class="table-container">
            {!history.length && (
              <>
                <h2>Loading</h2>
                <img className="loading" src={Loading} alt="loading" />
              </>
            )}
            {history.length ? (
              <table>
                {columnTitles.map((col, idx) => {
                  return <th>{col}</th>;
                })}

                {[...Array(rowsLength - 1)]?.map((e, i) => (
                  <tr key={i}>
                    {columnTitles?.map((col, idx) => {
                      return (
                        <td>
                          {col == "Gdrive URL" ? (
                            <button
                              onClick={() =>
                                handleClick2(
                                  history[i + 1][dict["Gdrive URL"]],
                                  history[i + 1][dict["Run Name"]]
                                )
                              }
                            >
                              {history[i + 1][dict["Run Name"]]}
                            </button>
                          ) : (
                            history[i + 1][dict[col]]
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </table>
            ) : null}
          </div>
        </div>
      ) : (
        "please copy and paste CSV into the config.js file"
      )}

      <h3>{tableTitle}</h3>

      {tableTitle && (
        <>
          <input
            type="text"
            className="search"
            placeholder="Search by Column"
            onChange={(e) => SetQuery(e.target.value)}
          />
          <select onChange={(e) => setColumnSearchQuery(e.target.value)}>
            {secondColTitles.map((item, idx) => {
              if (idx < 4) return <option>{item}</option>;
            })}
          </select>
        </>
      )}

      {tableTitle && (
        <div className="topTableContainer">
          {htmlData?.length ? (
            <select
              className="selectMenu"
              onChange={(e) => setCurrentSort(e.target.value)}
            >
              {secondSortDropdown.map((item, idex) => {
                return (
                  <>
                    <option key={item}>{item}</option>
                  </>
                );
              })}
            </select>
          ) : null}

          {htmlData[0]?.map((item, idx) => {
            dict2[item] = idx;
          })}

          <div class="table-container">
            {!htmlData.length && (
              <>
                <h2>Loading</h2>
                <img className="loading" src={Loading} alt="loading" />
              </>
            )}

            {htmlData.length ? (
              <table>
                {secondColTitles.map((col, idx) => {
                  return <th>{col}</th>;
                })}

                {[...Array(rowsLengthForTableData - 1)]?.map((e, i) =>
                  Object.keys(htmlData[i + 1]).filter(
                    (j) =>
                      j == secondColTitles.indexOf(columnSearchQuery) &&
                      htmlData[i + 1][j].includes(query) &&
                      secondColTitles.includes(htmlData[0][j])
                  ).length ? (
                    <tr key={i}>
                      {secondColTitles?.map((col, idx) => {
                        return <td>{htmlData[i + 1][dict2[col]]}</td>;
                      })}
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </table>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
