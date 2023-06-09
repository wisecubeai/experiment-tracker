import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Papa from "papaparse";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
const csv = require("csvtojson");

function App() {
  let arr = ["ABC", "DEF", "GHI"];
  const [htmlData, setHtmlData] = useState([]);
  const [history, setHistory] = useState([]);
  const [popUp, setPopUp] = useState("");
  const [tableTitle, setTableTitle] = useState("");
  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8NgsDs1G5Y57JAWQpmYMlOqIY8Pzi8otdHEKEt_2u9NCcGP1H-x2YFavvgOW0-WvBq63HxjloR1Nk/pub?gid=0&single=true&output=csv",
      {
        download: true,
        delimiter: ",",
        complete: (result) => {
          setHistory(result.data);
          console.log(result.data);
          console.log(htmlData);
        },
      }
    );
  }, []);
  function handleClick2(e, title) {
    console.log(e);
    Papa.parse(e, {
      download: true,
      delimiter: ",",
      complete: (result) => {
        setHtmlData(result.data);
        console.log(result.data);
        console.log(htmlData);
      },
    });
    console.log(e);
    setTableTitle(title);
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
            console.log(result.data);
            console.log(htmlData);
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
                console.log(result.data);
                console.log(htmlData);
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
            console.log(result.data);
            console.log(htmlData);
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
      <h3>History Table</h3>

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

      <div className="iframe">
        {history != "" && (
          <table style={{ border: "1px solid black", padding: "5px" }}>
            <thead>
              <th>Run Name </th>
              <th>Test data name</th>
              <th>Date</th>
              <th>Number of questions</th>
              <th>Number w/ Valid SPARQL</th>
              <th>Number w/ Reasonable Results</th>
              <th>Score name</th>
              <th>Score</th>
              <th>Gdrive URL</th>
            </thead>

            {history?.map((item, idx) => {
              if (idx > 0) {
                return (
                  <tr style={{ cursor: "pointer" }}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
                    <td>{item[6]}</td>
                    <td>{item[7]}</td>
                    <td>
                      <button onClick={() => handleClick2(item[8], item[0])}>
                        {item[0]}
                      </button>
                    </td>
                    {/* <td>
                      {idx == 1 ? (
                        <button
                          className="btn"
                          onClick={() => handleClick("abc")}
                        >
                          Fetch ABC
                        </button>
                      ) : idx == 2 ? (
                        <button
                          className="btn"
                          onClick={() => handleClick("def")}
                        >
                          Fetch DEF
                        </button>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => handleClick("GHI")}
                        >
                          Fetch GHI
                        </button>
                      )}
                    </td> */}
                  </tr>
                );
              }
            })}
          </table>
        )}
        {/* <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT8NgsDs1G5Y57JAWQpmYMlOqIY8Pzi8otdHEKEt_2u9NCcGP1H-x2YFavvgOW0-WvBq63HxjloR1Nk/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
            width="100%"
            title="description"
            style={{ border: "1px solid black" }}
          ></iframe> */}
      </div>

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
      {htmlData != "" && (
        <table style={{ border: "1px solid black" }}>
          <thead>
            <th>ID </th>
            <th>Question</th>
            <th>SBN</th>
            <th>SBN comments</th>
            <th>SPARQL</th>
            <th>SPARQL comments</th>
            <th>Exact answer</th>
            <th>Result</th>
            <th>Result comments</th>
          </thead>

          {htmlData?.map((item, idx) => {
            if (idx > 0) {
              return (
                // <Tooltip title={item}>
                <tr style={{ cursor: "pointer" }}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{item[5]}</td>
                  <td>{item[6]}</td>
                  <td>{item[7]}</td>
                  <td>{item[8]}</td>
                </tr>
                // </Tooltip>
              );
            }
          })}
        </table>
      )}
    </div>
  );
}

export default App;
