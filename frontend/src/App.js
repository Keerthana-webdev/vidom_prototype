import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./App.css";

function App() {
  const [runs, setRuns] = useState([]);

  // FORM STATES
  const [learningRate, setLearningRate] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [tag, setTag] = useState("");

  // FILTER
  const [filterTag, setFilterTag] = useState("");

  // COMPARE
  const [compare1, setCompare1] = useState("");
  const [compare2, setCompare2] = useState("");

  // FETCH RUNS
  const fetchRuns = () => {
    let url = "http://127.0.0.1:8000/runs/?";

    if (filterTag) url += `tag=${filterTag}`;

    axios.get(url)
      .then(res => setRuns(res.data))
      .catch(err => console.error(err));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
  fetchRuns();
  }, []);

  // ADD RUN
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/runs/", null, {
      params: {
        learning_rate: learningRate,
        batch_size: batchSize,
        accuracy: accuracy,
        tag: tag
      }
    })
    .then(() => {
      setLearningRate("");
      setBatchSize("");
      setAccuracy("");
      setTag("");
      fetchRuns();
    })
    .catch(err => console.error(err));
  };

  // EXPORT CSV
  const exportCSV = () => {
    window.open("http://127.0.0.1:8000/export/");
  };

  // COMPARE DATA
  const selectedRuns = runs.filter(
  r => r.id === Number(compare1) || r.id === Number(compare2)
  );

  return (
    <div className="container">

      {/* ADD RUN */}
      <div className="section">
        <h2>Add Run</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="LR" value={learningRate} onChange={e => setLearningRate(e.target.value)} />
          <input placeholder="Batch" value={batchSize} onChange={e => setBatchSize(e.target.value)} />
          <input placeholder="Accuracy" value={accuracy} onChange={e => setAccuracy(e.target.value)} />
          <input placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </div>

      {/* FILTER */}
      <div className="section">
        <h2>Filter by Tag</h2>
        <input
          placeholder="Enter tag (e.g. best)"
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
        />
        <button onClick={fetchRuns}>Apply</button>
      </div>

      {/* TABLE */}
      <div className="section">
        <h2>Runs</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>LR</th>
              <th>Batch</th>
              <th>Accuracy</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.learning_rate}</td>
                <td>{r.batch_size}</td>
                <td>{r.accuracy}</td>
                <td>{r.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMPARE */}
      <div className="section">
        <h2>Compare Runs</h2>

        <input
          placeholder="Run ID 1"
          value={compare1}
          onChange={e => setCompare1(e.target.value)}
        />

        <input
          placeholder="Run ID 2"
          value={compare2}
          onChange={e => setCompare2(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>LR</th>
              <th>Batch</th>
              <th>Accuracy</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {selectedRuns.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.learning_rate}</td>
                <td>{r.batch_size}</td>
                <td>{r.accuracy}</td>
                <td>{r.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EXPORT */}
      <div className="section">
        <h2>Export</h2>
        <button onClick={exportCSV}>Download CSV</button>
      </div>

      {/* PARALLEL PLOT */}
      <div className="section plot-container">
        <div>
          <h2>Parallel Coordinates</h2>
          <Plot
            data={[
              {
                type: "parcoords",
                line: {
                  color: runs.map(r => r.accuracy),
                  showscale: true
                },
                dimensions: [
                  { label: "Learning Rate", values: runs.map(r => r.learning_rate) },
                  { label: "Batch Size", values: runs.map(r => r.batch_size) },
                  { label: "Accuracy", values: runs.map(r => r.accuracy) }
                ]
              }
            ]}
            layout={{ width: 800, height: 400 }}
          />
        </div>
      </div>

    </div>
  );
}

export default App;