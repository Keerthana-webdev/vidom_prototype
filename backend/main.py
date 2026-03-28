from fastapi import FastAPI
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import csv
import io

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

# CREATE RUN (WITH TAG)
@app.post("/runs/")
def create_run(
    learning_rate: float,
    batch_size: int,
    accuracy: float,
    tag: str = None
):
    db = SessionLocal()
    run = models.Run(
        learning_rate=learning_rate,
        batch_size=batch_size,
        accuracy=accuracy,
        tag=tag
    )
    db.add(run)
    db.commit()
    db.refresh(run)
    return run

# GET RUNS (FILTER)
@app.get("/runs/")
def get_runs(
    learning_rate: float = None,
    batch_size: int = None,
    accuracy: float = None,
    tag: str = None
):
    db = SessionLocal()
    query = db.query(models.Run)

    if learning_rate is not None:
        query = query.filter(models.Run.learning_rate == learning_rate)
    if batch_size is not None:
        query = query.filter(models.Run.batch_size == batch_size)
    if accuracy is not None:
        query = query.filter(models.Run.accuracy == accuracy)
    if tag:
        query = query.filter(models.Run.tag == tag)

    return query.all()

# EXPORT CSV
@app.get("/export/")
def export_csv():
    db = SessionLocal()
    runs = db.query(models.Run).all()

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(["LR", "Batch", "Accuracy", "Tag"])

    for r in runs:
        writer.writerow([r.learning_rate, r.batch_size, r.accuracy, r.tag])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=runs.csv"}
    )