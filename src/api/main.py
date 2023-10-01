from entity.db.session import SessionLocal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from route.auth import router as authRouter
from route.authors import router as authorRouter
from route.books import router as booksRouter
from dotenv import load_dotenv

# Load environment variables from the .env file in the current directory
load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    app.state.db = SessionLocal()


@app.on_event("shutdown")
async def shutdown():
    app.state.db.close()

app.include_router(authRouter, prefix="/api")
app.include_router(booksRouter, prefix="/api")
app.include_router(authorRouter, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}