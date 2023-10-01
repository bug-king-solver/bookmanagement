from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from entity.models.index import Base, User  # Import your database models
from dotenv import load_dotenv
from passlib.context import CryptContext
import os
# Load environment variables from the .env file in the current directory
load_dotenv()
# Create a database connection
engine = create_engine(os.getenv("DATABASE_LOCAL_URL"))

# Create a Session class
Session = sessionmaker(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Sample data to seed
users_to_seed = [
    User(name='Datacose', password=pwd_context.hash('password')),
    # Add more user objects as needed
]

# Create tables if they don't exist
Base.metadata.create_all(engine)

# Create a session
session = Session()

# Add seed data to the database
for user in users_to_seed:
    session.add(user)

# Commit the changes to the database
session.commit()

# Close the session
session.close()

# Print a confirmation message
print("Database seeded successfully.")
