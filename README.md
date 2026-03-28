## VISDOM-PROTOTYPE

Smart Experiment Management & Meta-Analysis System for tracking, filtering, comparing, and visualizing machine learning experiment runs.

---

### 🚀 Features

- Add experiment runs (learning rate, batch size, accuracy, tag)
- Filter runs using tags
- Compare multiple runs side-by-side
- Export experiment data as CSV
- Parallel Coordinates Plot for hyperparameter analysis
- Real-time updates in UI

---

### 🧱 Project Structure
```bash
visdom-prototype/
│
├── backend/
│ ├── main.py # FastAPI backend
│ ├── models.py # Database models
│ ├── database.py # DB connection
│ └── test.db # SQLite database
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── App.js # Main React UI
│ │ ├── App.css # Styling
│ │ └── index.js
│ ├── package.json
│ └── node_modules/
│
└── README.md
```
---

### 🛠️ Tech Stack

#### Backend
- FastAPI
- SQLAlchemy
- SQLite

#### Frontend
- React.js
- Axios
- Plotly.js
---

### ⚙️ Setup Instructions
#### Backend

```bash
cd backend
pip install fastapi uvicorn sqlalchemy
uvicorn main:app --reload
```
Runs at: http://127.0.0.1:8000

#### frontend

```bash
cd frontend
npm install
npm start
```
Runs at: http://localhost:3000

---
### 📊 Key Functionalities

*#### Add Experiment Runs
Input learning rate, batch size, accuracy, and tag. Data is stored in SQLite database.

*#### Filter Runs
Filter runs using tag. Results update dynamically.

*#### Compare Runs
Select two runs using IDs and compare them side-by-side.

*#### Export CSV
Download all experiment data as a CSV file.

*#### Visualization
Parallel Coordinates Plot showing relationships between:
* Learning Rate
* Batch Size
* Accuracy

---
### 📌 Example Use Cases
* Identify best-performing hyperparameters
* Compare different training configurations
* Analyze trends across experiments
* Manage multiple ML runs efficiently

---
### ⚠️ Notes
* Parallel Coordinates Plot requires WebGL support in browser
* If not supported, visualization may not render

---
### 🚀 Future Improvements
* Hyperparameter optimization (Optuna integration)
* Advanced query system
* Authentication & multi-user support
* Docker deployment
* Improved UI/UX design
---

### 📎 Project Status

Prototype completed with core experiment tracking, filtering, comparison, and visualization features.

---
### 👩‍💻 Author
#### Keerthana S

Developed as part of GSoC preparation for Smart Experiment Management.

