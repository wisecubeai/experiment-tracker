import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Papa from "papaparse";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { fields } from "../src/config";
import { fields2 } from "../src/config";
import { csvFile } from "../src/config";
import logo1 from "../src/images/Wisecube-icon-no-text.jpg";
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
    ...fields,
    "Gdrive URL",
  ]);
  const [secondColTitles, setSecondColTitles] = useState([
    "ID",
    "Input",
    "Result",
    "Label",
    ...fields2,
  ]);

  const [rowsLength, setRowsLength] = useState(0);
  const [rowsLengthForTableData, setRowsLengthForTableData] = useState(0);
  const [dict, setDict] = useState({});
  const [dict2, setDict2] = useState({});

  useEffect(() => {
    console.log("sort was changed");
    if (currentSort == "Run Name") {
      console.log("current sort is in Run Name");
      let newHistory = [...history];
      let first = newHistory.shift();
      console.log(newHistory);
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
      console.log("current sort is in run date");
      let newHistory = [...history];
      let first = newHistory.shift();
      console.log(newHistory);
      newHistory.sort(function (a, b) {
        let split4a = a[1].split("/");
        console.log(split4a);
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
    } else if (currentSort == "Number of questions") {
      console.log("current sort is in number of question");
      let newHistory = [...history];
      let first = newHistory.shift();
      console.log(newHistory);
      newHistory.sort((a, b) => {
        if (Number(a[3]) < Number(b[3])) {
          return 1;
        } else if (Number(b[3]) < Number(a[3])) {
          return -1;
        } else {
          return 0;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
    } else if (currentSort == "Number w/ Valid SPARQL") {
      console.log("current sort is in Number w/ Valid SPARQL");
      let newHistory = [...history];
      let first = newHistory.shift();
      console.log(newHistory);
      newHistory.sort((a, b) => {
        if (Number(a[4]) < Number(b[4])) {
          return 1;
        } else if (Number(b[4]) < Number(a[4])) {
          return -1;
        } else {
          return 0;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
      console.log(history);
    } else if (currentSort == "Number w/ Reasonable Results") {
      console.log("current sort is in Number w/ Reasonable Results");
      let newHistory = [...history];
      let first = newHistory.shift();
      console.log(newHistory);
      newHistory.sort((a, b) => {
        if (Number(a[5]) < Number(b[5])) {
          return 1;
        } else if (Number(b[5]) > Number(a[5])) {
          return -1;
        } else {
          return 0;
        }
      });
      newHistory.unshift(first);
      setHistory(newHistory);
    } else if (currentSort == "Score") {
      console.log("current sort is in Score");
      let newHistory = [...history];
      let first = newHistory.shift();
      console.log(newHistory);
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
    if (currentSort == "ID") {
      console.log("current sort is in ID");
      let newHtmlData = [...htmlData];
      let first = newHtmlData.shift();
      console.log(newHtmlData);
      newHtmlData.sort((a, b) => {
        if (a[0] > b[0]) {
          return 1;
        } else if (b[0] > a[0]) {
          return -1;
        } else {
          return 0;
        }
      });
      newHtmlData.unshift(first);
      setHistory(newHtmlData);
    }
  }, [currentSort]);
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
  const handleChange = (e) => {
    console.log(e);
  };
  useEffect(() => {
    // https://docs.google.com/spreadsheets/d/e/2PACX-1vT8NgsDs1G5Y57JAWQpmYMlOqIY8Pzi8otdHEKEt_2u9NCcGP1H-x2YFavvgOW0-WvBq63HxjloR1Nk/pub?gid=0&single=true&output=csv
    Papa.parse(csvFile, {
      download: true,
      delimiter: ",",
      complete: (result) => {
        setHistory(result.data);
        console.log(result.data);
        console.log(htmlData);
        setRowsLength(result.data.length);
      },
    });
  }, []);
  function handleClick2(e, title) {
    console.log(e);
    Papa.parse(e, {
      download: true,
      delimiter: ",",
      complete: (result) => {
        setHtmlData(result.data);
        setRowsLengthForTableData(result.data.length);
        console.log(htmlData);
        setTableTitle(title);
      },
    });
    console.log(e);
  }

  function handleClick(e) {
    if (e == "abc") {
      console.log("abc");

      Papa.parse(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pub?gid=0&single=true&output=csv",
        {
          download: true,
          delimiter: ",",
          complete: (result) => {
            setHtmlData(result.data);
            //console.log(result.data);
            //console.log(htmlData);
            setTableTitle("ABC Table");
          },
        }
      );

      setPopUp(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pubhtml"
      );
    } else if (e == "def") {
      console.log("def");
      axios
        .get(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pubhtml?gid=343529110&single=true"
        )
        .then((result) => {
          Papa.parse(
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pub?gid=343529110&single=true&output=csv",
            {
              download: true,
              delimiter: ",",
              complete: (result) => {
                setHtmlData(result.data);
                // console.log(result.data);
                // console.log(htmlData);
                setTableTitle("DEF Table");
              },
            }
          );
        });
      setPopUp(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pubhtml"
      );
    } else {
      Papa.parse(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pub?gid=1882971444&single=true&output=csv",
        {
          download: true,
          delimiter: ",",
          complete: (result) => {
            setHtmlData(result.data);
            //console.log(result.data);
            //console.log(htmlData);
            setTableTitle("GHI Table");
          },
        }
      );

      console.log("ghi");
      setPopUp(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsajnYfZeMR7uLMJYkPfPQcr-Whhf2e394DX1FD4GEgQGGY4fg1Pyjy11eQ8pOwO1TfGbVa_35Cj-w/pubhtml"
      );
    }
  }
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vT8NgsDs1G5Y57JAWQpmYMlOqIY8Pzi8otdHEKEt_2u9NCcGP1H-x2YFavvgOW0-WvBq63HxjloR1Nk/pubhtml"
  //     )
  //     .then((result) => {
  //       console.log(result.data);
  //       setHtmlData(result.data);
  //     });
  // }, []);
  return (
    <div className="App">
      <img
        style={{ position: "absolute", top: "0", left: "0" }}
        src={logo1}
        height={"100px"}
        width={"100px"}
      ></img>
      <div className="topTableContainer">
        <h3 style={{ paddingBottom: "50px" }}>Runs Table</h3>
        {history != "" && (
          <div>
            <select
              style={{ height: "25px", marginLeft: "558px" }}
              className="selectMenu"
              onChange={(e) => setCurrentSort(e.target.value)}
            >
              {history[0]?.map((item, idex) => {
                if (item != "Gdrive URL")
                  return (
                    <>
                      <option key={item}>{item}</option>
                    </>
                  );
              })}
            </select>
          </div>
        )}
        {history[0]?.map((item, idx) => {
          dict[item] = idx;
        })}
        {history != "" && (
          <table style={{ border: "1px solid black", padding: "5px" }}>
            {columnTitles.map((col, idx) => {
              return <th>{col}</th>;
            })}

            {/* {history.map((item, idx) => {
            return <td>{item[dict["Run Name"]]}</td>;
          })} */}

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
        )}
      </div>

      {/* <div className="buttons">
          <button
            style={{
              paddingBottom: "30px",
              cursor: "pointer",
            }}
            className="btn"
            onClick={() => handleClick("abc")}
          >
            Fetch ABC
          </button>
          <button
            style={{
              paddingBottom: "30px",
              cursor: "pointer",
            }}
            className="btn"
            onClick={() => handleClick("def")}
          >
            Fetch DEF
          </button>
          <button
            style={{
              paddingBottom: "30px",
              cursor: "pointer",
            }}
            className="btn"
            onClick={() => handleClick("ghi")}
          >
            Fetch GHI
          </button>
        </div> */}

      {/* <div className="iframe">
        {history != "" && (
          <>
            <div className="resultsort">
              <select
                style={{ height: "25px" }}
                className="selectMenu"
                onChange={(e) => setCurrentSort(e.target.value)}
              >
                {history[0].map((item, idex) => {
                  if (item != "Gdrive URL")
                    return (
                      <>
                        <option key={item}>{item}</option>
                      </>
                    );
                })}
              </select>
            </div>

            <table style={{ border: "1px solid black", padding: "5px" }}>
              <thead>
                {history[0].map((item, idx) => {
                  dict[item] = idx;
                  if (item != "Gdrive URL") return <th>{item}</th>;
                })}
              </thead>

              {history?.map((item, idx) => {
                if (idx > 0) {
                  return (
                    <tr style={{ cursor: "pointer" }}>
                      <td>
                        <button onClick={() => handleClick2(item[6], item[0])}>
                          {item[0]}
                        </button>
                      </td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                    </tr>
                  );
                }
              })}
            </table>
          </>
        )}
      </div> */}
      {/* {parse(htmlData)} */}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlData }}></div> */}
      {/* <div className="secondPop">
        {popUp !== "" && (
          <iframe
            src={popUp}
            height="500px"
            width="100%"
            title="description"
            style={{ border: "1px solid black" }}
          ></iframe>
        )}
      </div> */}
      <h3>{tableTitle}</h3>
      <div className="htmlData" style={{ position: "relative" }}>
        {htmlData != "" && (
          <div>
            <select
              style={{
                height: "25px",
                marginLeft: "750px",
              }}
              className="selectMenu"
              onChange={(e) => setCurrentSort(e.target.value)}
            >
              {secondColTitles.map((item, idex) => {
                return (
                  <>
                    <option key={item}>{item}</option>
                  </>
                );
              })}
            </select>
          </div>
        )}
        {/* {console.log(fields)} */}
        {htmlData[0]?.map((item, idx) => {
          dict2[item] = idx;
        })}
        {/* {console.log(dict2)} */}
        {htmlData != "" && (
          <table style={{ border: "1px solid black", padding: "5px" }}>
            {secondColTitles.map((col, idx) => {
              return <th>{col}</th>;
            })}

            {/* {history.map((item, idx) => {
            return <td>{item[dict["Run Name"]]}</td>;
          })} */}

            {[...Array(rowsLengthForTableData - 1)]?.map((e, i) => (
              <tr key={i}>
                {secondColTitles?.map((col, idx) => {
                  //console.log(htmlData[i + 1][dict2[col]]);
                  return <td>{htmlData[i + 1][dict2[col]]}</td>;
                })}
              </tr>
            ))}
          </table>
        )}
      </div>
      {/* <div className="htmlData">
        {htmlData != "" && (
          <>
            <div className="secondselect">
              <select
                style={{ height: "25px" }}
                className="selectMenu"
                onChange={(e) => setCurrentSort(e.target.value)}
              >
                {htmlData[0].map((item, idex) => {
                  if (item != "Gdrive URL")
                    return (
                      <>
                        <option key={item}>{item}</option>
                      </>
                    );
                })}
              </select>
            </div>
            <table style={{ border: "1px solid black" }}>
              <thead>
                {htmlData[0].map((item) => {
                  return <th>{item}</th>;
                })}
              </thead>

              {htmlData?.map((item, idx) => {
                if (idx > 0) {
                  return (
                    <tr style={{ cursor: "pointer" }}>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                    </tr>
                  );
                }
              })}
            </table>
          </>
        )}
      </div> */}
    </div>
  );
}

export default App;
