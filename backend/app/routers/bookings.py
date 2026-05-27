import os
import uuid
import requests  # 🌟 Imported to push instant Telegram notifications
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Column, String, Integer, Date, Time
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from datetime import date, time
from ..config.database import get_db, Base

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

# --- TELEGRAM NOTIFICATION SYSTEM SETTINGS ---
# 🌟 Make sure these match your tokens perfectly!
TELEGRAM_BOT_TOKEN = "PASTE_YOUR_BOTFATHER_TOKEN_HERE"
ADMIN_CHAT_ID = "PASTE_YOUR_USERINFOBOT_ID_HERE"

# =========================================================================
# DATABASE TABLE SCHEMA MODEL MAPPING TO POSTGRESQL
# =========================================================================
class BookingModel(Base):
    __tablename__ = "bookings"
    id = Column(String(50), primary_key=True, index=True)
    service_id = Column(String(50), nullable=False)  
    client_name = Column(String(255), nullable=False)
    client_email = Column(String(255), nullable=False)
    client_phone = Column(String(50), nullable=False)
    consultation_type = Column(String(50), nullable=False)
    appointment_date = Column(Date, nullable=False)
    appointment_time = Column(Time, nullable=False)
    birth_date = Column(Date, nullable=False)
    birth_time = Column(Time, nullable=False)
    birth_place = Column(String(255), nullable=False)

# =========================================================================
# VALIDATION RULES FOR DATA COMING FROM THE FRONTEND REACT FORM
# =========================================================================
class BookingCreateSchema(BaseModel):
    service_id: str  
    client_name: str
    client_email: EmailStr
    client_phone: str
    consultation_type: str
    appointment_date: date
    appointment_time: time
    birth_date: date
    birth_time: time
    birth_place: str

# =========================================================================
# 🌟 NEW ENDPOINT: GET ALL RECORDS FOR THE ADMIN DASHBOARD (FIXES 405 ERROR)
# =========================================================================
@router.get("/", status_code=status.HTTP_200_OK)
def get_all_bookings(db: Session = Depends(get_db)):
    try:
        bookings = db.query(BookingModel).all()
        return bookings
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"PostgreSQL stream connection failure: {str(e)}"
        )

# =========================================================================
# THE BACKEND EXECUTION LOGIC WHEN SOMEONE CLICKS "BOOK NOW"
# =========================================================================
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_booking(payload: BookingCreateSchema, db: Session = Depends(get_db)):
    # Generates a clear trackable identity tag like: AS-4B9D2C
    generated_id = f"AS-{uuid.uuid4().hex[:6].upper()}"
    
    db_booking = BookingModel(
        id=generated_id,
        service_id=payload.service_id,  
        client_name=payload.client_name,
        client_email=payload.client_email,
        client_phone=payload.client_phone,
        consultation_type=payload.consultation_type,
        appointment_date=payload.appointment_date,
        appointment_time=payload.appointment_time,
        birth_date=payload.birth_date,
        birth_time=payload.birth_time,
        birth_place=payload.birth_place
    )
    
    try:
        # Save structural attributes inside PostgreSQL
        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)
        
        # =========================================================================
        # 🔔 LIVE RELAY: DISPATCH INSTANT TELEGRAM NOTIFICATION TO ADMIN PHONE
        # =========================================================================
        try:
            notification_message = (
                "🚨 *NEW CONSULTATION BOOKED!* 🚨\n\n"
                f"🆔 *Booking ID:* `{db_booking.id}`\n"
                f"👤 *Client Name:* {payload.client_name}\n"
                f"📞 *Phone Number:* {payload.client_phone}\n"
                f"✉️ *Email Address:* {payload.client_email}\n"
                f"🔮 *Consultation:* {payload.consultation_type}\n\n"
                "📅 *SCHEDULED APPOINTMENT:*\n"
                f"📆 Date: {payload.appointment_date.strftime('%d-%m-%Y')}\n"
                f"⏰ Time: {payload.appointment_time.strftime('%I:%M %p')}\n\n"
                "👶 *NATAL BIRTH DATA:*\n"
                f"🗓️ DOB: {payload.birth_date.strftime('%d-%m-%Y')}\n"
                f"⏳ TOB: {payload.birth_time.strftime('%H:%M')}\n"
                f"📍 POB: {payload.birth_place}\n\n"
                "👉 _Check your Sacred Control Matrix Dashboard to view full logs!_"
            )
            
            telegram_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            requests.post(telegram_url, json={
                "chat_id": ADMIN_CHAT_ID,
                "text": notification_message,
                "parse_mode": "Markdown"
            }, timeout=5) # Added timeout safeguard so your API response never hangs
            
            print("🔔 Admin phone alert dispatched successfully over Telegram relays.")
            
        except Exception as bot_err:
            # Catches network drops cleanly without stopping the client's confirmation response
            print(f"⚠️ Failed to dispatch live phone alert: {str(bot_err)}")

        return {
            "status": "success",
            "message": "Booking recorded successfully!",
            "booking_id": db_booking.id
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database state insertion failure: {str(e)}")