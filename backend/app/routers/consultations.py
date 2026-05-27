import os
import requests
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from psycopg2.extras import RealDictCursor

# 🚨 REMOVED the top-level 'from main import get_db_connection' line to break the loop!

router = APIRouter(prefix="/api/consultations", tags=["Consultations"])

TELEGRAM_BOT_TOKEN = "8988851177:AAEqOLWOjIzEULODYdDNAMRRX_7XUnS4kqk"
ADMIN_CHAT_ID = "5948489456"

class ConsultationCreateSchema(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    message: str

# =========================================================================
# FETCH ENGINE: GET ALL INQUIRIES FOR THE ADMINISTRATIVE VIEWS
# =========================================================================
@router.get("/", status_code=status.HTTP_200_OK)
def get_all_inquiries():
    # 🌟 LOCAL IMPORT: Break circular loop safely
    from main import get_db_connection
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM consultations ORDER BY id DESC;")
                return cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"PostgreSQL inquiry pool parsing failure: {str(e)}"
        )

# =========================================================================
# SUBMISSION LOGIC: SENDS AN INQUIRY & DISPATCHES TELEGRAM PUSH ALERTS
# =========================================================================
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_inquiry(payload: ConsultationCreateSchema):
    # 🌟 LOCAL IMPORT: Break circular loop safely
    from main import get_db_connection
    
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO consultations (firstname, lastname, email, message)
                    VALUES (%s, %s, %s, %s)
                ''', (payload.firstname, payload.lastname, payload.email, payload.message))
                conn.commit()
        
        try:
            notification_message = (
                "✉️ *NEW GENERAL INQUIRY RECEIVED!* ✉️\n\n"
                f"👤 *Sender Name:* {payload.firstname} {payload.lastname}\n"
                f"📧 *Email Address:* {payload.email}\n\n"
                "📝 *MESSAGE CONTENT:*\n"
                f"\"{payload.message}\"\n\n"
                "👉 _Open your Admin panel control matrix to reply directly!_"
            )
            
            telegram_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            requests.post(telegram_url, json={
                "chat_id": ADMIN_CHAT_ID,
                "text": notification_message,
                "parse_mode": "Markdown"
            }, timeout=5)
            
            print("🔔 Inquiry text alert pushed to admin phone cleanly.")
            
        except Exception as bot_err:
            print(f"⚠️ Failed to dispatch live message alert: {str(bot_err)}")

        return {"status": "success", "message": "Inquiry successfully logged."}
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database inquiry insertion failure: {str(e)}"
        )