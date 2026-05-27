import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. MAKE SURE YOUR POSTGRESQL PASSWORD IS CORRECT BELOW:
# Replace 'your_password' with the database password you created during installation.
DATABASE_URL = "postgresql://postgres:pradibanshu@localhost:5432/astro_souvik_db"

# 2. Open up the connection gateway
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# 3. Establish session and operational base configurations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()