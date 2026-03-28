from sqlalchemy import Column, Integer, Float, String
from database import Base

class Run(Base):
    __tablename__ = "runs"

    id = Column(Integer, primary_key=True, index=True)
    learning_rate = Column(Float)
    batch_size = Column(Integer)
    accuracy = Column(Float)
    tag = Column(String)