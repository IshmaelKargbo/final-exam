from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import Session
from covid.models import Base

engine = create_engine("postgresql+psycopg2://root:secret@localhost/pipline")

Base.metadata.create_all(engine)

session = Session(bind=engine)