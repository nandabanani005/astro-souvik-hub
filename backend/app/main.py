import os
import sys
import shutil
import psycopg2
import requests
from contextlib import contextmanager
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, status, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# ==========================================
# ⚙️ 0. CORE RUNTIME ENVIRONMENT PATH PATCH
# ==========================================
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.append(CURRENT_DIR)

# ==========================================
# ⚙️ 1. SYSTEM INITIALIZATION & CORE SETUP
# ==========================================
app = FastAPI(title="Astro Souvik Master API Hub", version="2.0.0")

# Setup local file storage arrays safely
UPLOAD_DIR = os.path.join(CURRENT_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# --- CORS MIDDLEWARE CONFIGURATION ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://astro-souvik.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_serveo_bypass_header(request, call_next):
    response = await call_next(request)
    response.headers["skip-browser-warning"] = "true"
    response.headers["Access-Control-Allow-Origin"] = "https://astro-souvik.vercel.app"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# ==========================================
# 🔌 2. LIFECYCLE ROUTER MOUNTING
# ==========================================
try:
    from routers import consultations
except ModuleNotFoundError:
    from app.routers import consultations

app.include_router(consultations.router)

# --- DATABASE CONNECTION MAPPING SETUP ---
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:pradibanshu@localhost:5432/astro_souvik_db")

# Global Telegram Configuration Matrix
BOT_TOKEN = "8988851177:AAEqOLWOjIzEULODYdDNAMRRX_7XUnS4kqk"
CHAT_ID = "5948489456"

@contextmanager
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()

# ==========================================
# 📋 3. DATA ARCHITECTURE VALIDATION (Pydantic)
# ==========================================
class BookingRequest(BaseModel):
    client_name: str
    client_phone: str
    client_email: str
    consultation_type: str
    appointment_date: str
    appointment_time: str
    birth_date: str
    birth_time: str
    birth_place: str

class ContactRequest(BaseModel):
    name: str = ""       
    firstname: str = ""
    lastname: str = ""
    firstName: str = ""  
    lastName: str = ""   
    email: str
    message: str
    
class FeedbackRequest(BaseModel):
    client_name: str = "Anonymous Client"
    rating: int
    review_tags: str = ""
    comments: str = ""

class NewsRequest(BaseModel):
    title: str
    content: str
    category: str = "Daily Transit"
    image_url: str = ""

# ==========================================
# ⚙️ 4. POSTGRESQL SCHEMA ENGINE INITIALIZER
# ==========================================
def init_db():
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS appointments (
                    id SERIAL PRIMARY KEY,
                    client_name TEXT NOT NULL,
                    client_phone TEXT NOT NULL,
                    client_email TEXT NOT NULL,
                    consultation_type TEXT NOT NULL,
                    appointment_date TEXT NOT NULL,
                    appointment_time TEXT NOT NULL,
                    birth_date TEXT NOT NULL,
                    birth_time TEXT NOT NULL,
                    birth_place TEXT NOT NULL,
                    status TEXT DEFAULT 'pending',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            ''')
            
            try:
                cursor.execute("ALTER TABLE appointments ADD COLUMN status TEXT DEFAULT 'pending';")
                conn.commit()
            except psycopg2.errors.DuplicateColumn:
                conn.rollback()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS consultations (
                    id SERIAL PRIMARY KEY,
                    firstname TEXT NOT NULL,
                    lastname TEXT DEFAULT '',
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS feedback (
                    id SERIAL PRIMARY KEY,
                    client_name TEXT DEFAULT 'Anonymous Client',
                    rating INTEGER NOT NULL,
                    review_tags TEXT,
                    comments TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS astrology_news (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL,
                    content TEXT NOT NULL,
                    category TEXT DEFAULT 'Daily Transit',
                    image_url TEXT DEFAULT '', 
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            ''')
            conn.commit()
            print("🌟 All PostgreSQL matrix cores synchronized and deployed successfully.")

init_db()

# ==========================================
# 📡 5. CORE ENDPOINTS & CORE LOGIC
# ==========================================
@app.get("/")
def read_root():
    return {"status": "online", "system": "Astro Souvik Quantum Core"}

# ------------------------------------------
# 📅 MODULE A: SESSION BOOKINGS
# ------------------------------------------
@app.post("/api/booking", status_code=status.HTTP_201_CREATED)
async def create_booking(data: BookingRequest):
    try:
        new_id = None
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO appointments (client_name, client_phone, client_email, consultation_type, appointment_date, appointment_time, birth_date, birth_time, birth_place)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                ''', (data.client_name, data.client_phone, data.client_email, data.consultation_type, data.appointment_date, data.appointment_time, data.birth_date, data.birth_time, data.birth_place))
                
                new_id = cursor.fetchone()[0]
                conn.commit()
                
        try:
            notification_message = (
                "🔮 *NEW APPOINTMENT BOOKED!* 🔮\n\n"
                f"👤 *Client Name:* {data.client_name}\n"
                f"📞 *Phone:* `{data.client_phone}`\n"
                f"📧 *Email:* {data.client_email}\n\n"
                f"📅 *Schedule:* {data.appointment_date} @ {data.appointment_time}\n"
                f"🌐 *Medium:* _{data.consultation_type}_\n\n"
                f"📌 *NATAL CONFIGURATION MATRICES:*\n"
                f"🗓️ *DOB:* {data.birth_date}\n"
                f"⏰ *Time:* {data.birth_time}\n"
                f"📍 *Place:* {data.birth_place}\n\n"
                f"🆔 *Tracking ID:* `ALIGNED-{new_id if new_id else 'NEW'}`\n\n"
                "👉 _Verify ephemeris transitions before the session alignment starts!_"
            )
            
            telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            requests.post(telegram_url, json={
                "chat_id": CHAT_ID,
                "text": notification_message,
                "parse_mode": "Markdown"
            }, timeout=5)
            print("🔔 Session booking text alert pushed to admin phone cleanly.")
        except Exception as bot_err:
            print(f"⚠️ Failed to dispatch live booking alert: {str(bot_err)}")

        return {
            "status": "success", 
            "message": "Planetary alignment session booked!",
            "booking_id": f"ALIGNED-{new_id}" if new_id else "ALIGNED-SECURED"
        }
    except Exception as e:
        print(f"❌ BACKEND BOOKING CRASH LOG: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/all-bookings")
async def get_all_bookings():
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM appointments WHERE status = 'pending' ORDER BY id DESC;")
                return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/booking/{booking_id}/complete", status_code=status.HTTP_200_OK)
async def complete_booking_session(booking_id: int):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    UPDATE appointments 
                    SET status = 'completed' 
                    WHERE id = %s;
                ''', (booking_id,))
                conn.commit()
        return {"status": "success", "message": f"Appointment {booking_id} marked as completed."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------------------------------
# ✉️ MODULE B: CONTACT INQUIRIES ALIAS
# ------------------------------------------
@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
async def create_contact_inquiry(data: ContactRequest):
    try:
        sender_name = "Valued Client"
        if data.name:
            sender_name = data.name
        elif data.firstname or data.firstName:
            first = data.firstname if data.firstname else data.firstName
            last = data.lastname if data.lastname else data.lastName
            sender_name = f"{first} {last}".strip()

        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO consultations (firstname, lastname, email, message)
                    VALUES (%s, %s, %s, %s)
                ''', (sender_name, "", data.email, data.message))
                conn.commit()
                
        try:
            notification_message = (
                "✉️ *NEW GENERAL INQUIRY RECEIVED!* ✉️\n\n"
                f"👤 *Sender:* {sender_name}\n"
                f"📧 *Email:* {data.email}\n\n"
                "📝 *MESSAGE:*\n"
                f"\"{data.message}\""
            )
            telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            requests.post(telegram_url, json={
                "chat_id": CHAT_ID,
                "text": notification_message,
                "parse_mode": "Markdown"
            }, timeout=5)
        except Exception as bot_err:
            print(f"⚠️ Telegram alert inside main failed: {str(bot_err)}")
            
        return {"status": "success", "message": "Inquiry successfully logged."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------------------------------
# ⭐ MODULE C: CLIENT REVIEWS (FEEDBACK)
# ------------------------------------------
@app.post("/api/feedback", status_code=status.HTTP_201_CREATED)
async def post_feedback(data: FeedbackRequest):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO feedback (client_name, rating, review_tags, comments)
                    VALUES (%s, %s, %s, %s)
                ''', (data.client_name, data.rating, data.review_tags, data.comments))
                conn.commit()
        return {"status": "success", "message": "Testimonial saved!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/all-feedback")
async def get_all_feedback():
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM feedback ORDER BY id DESC;")
                return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------------------------------
# 📰 MODULE D: DAILY NEWS (TEXT METHOD)
# ------------------------------------------
@app.post("/api/news", status_code=status.HTTP_201_CREATED)
async def create_news_post(data: NewsRequest):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO astrology_news (title, content, category, image_url)
                    VALUES (%s, %s, %s, %s)
                ''', (data.title, data.content, data.category, data.image_url))
                conn.commit()
        return {"status": "success", "message": "Cosmic news posted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------------------------------
# 📸 MODULE E: NATIVE GALLERY FILE UPLOADER
# ------------------------------------------
@app.post("/api/news-with-file", status_code=status.HTTP_201_CREATED)
async def create_news_with_file(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    file: UploadFile = File(None)
):
    try:
        file_url = ""
        
        if file and file.filename:
            safe_filename = file.filename.replace(" ", "_").replace(":", "-")
            file_location = os.path.join(UPLOAD_DIR, safe_filename)
            
            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                
            file_url = f"https://astro-souvik-hub.onrender.com/uploads/{safe_filename}"

        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO astrology_news (title, content, category, image_url)
                    VALUES (%s, %s, %s, %s)
                ''', (title, content, category, file_url))
                conn.commit()
                
        return {"status": "success", "message": "Poster and news uploaded successfully!"}
    except Exception as e:
        print(f"❌ BACKEND CRASH ERROR LOG: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/public-news")
async def view_public_news():
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM astrology_news ORDER BY id DESC;")
                return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================================
# 🏎️ 6. APPS SERVER EXECUTION LOOP (ALWAYS KEEP LAST)
# ==========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)





    
    