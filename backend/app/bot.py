import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Enable active terminal debugging logs
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

DATABASE_URL = "postgresql://postgres:pradibanshu@localhost:5432/astro_souvik_db"
# 🚨 PASTE YOUR TOKEN HERE FROM BOTFATHER
TELEGRAM_BOT_TOKEN = "8988851177:AAEqOLWOjIzEULODYdDNAMRRX_7XUnS4kqk" 

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# --- START COMMAND GATEWAY ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    welcome_text = (
        f"🙏 নমস্কার {user.first_name}! Welcome to Astro Souvik Celestial Matrix.\n\n"
        "🪐 I am your automated cosmic assistant. Choose an option below to pull "
        "live data streams straight from our sanctuary cores:"
    )
    
    # Custom Keyboard Menu Buttons
    keyboard = [
        ['📰 Read Daily News', '🪐 Check Latest Transit'],
        ['📞 Contact Astrologer', '⭐ View Client Reviews']
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text(welcome_text, reply_markup=reply_markup)

# --- ENGINE: FETCH LATEST NEWS/TRANSIT ---
async def handle_news_request(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT title, content, category, created_at FROM astrology_news ORDER BY id DESC LIMIT 1;")
        latest_post = cursor.fetchone()
        cursor.close()
        conn.close()

        if latest_post:
            # Clean out your inline text image tags [img:...] so they look nice on Telegram chat screens
            clean_content = latest_post['content']
            import re
            clean_content = re.sub(r'\[img:.*?\]', '', clean_content).strip()

            response_text = (
                f"✨ *CHANNEL:* {latest_post['category']}\n"
                f"📢 *HEADLINE:* {latest_post['title']}\n"
                f"📅 *DATE:* {latest_post['created_at'].strftime('%d-%m-%Y')}\n\n"
                f"{clean_content}"
            )
        else:
            response_text = "✨ No celestial logs have been broadcasted today. Check back later!"
            
        await update.message.reply_text(response_text, parse_mode="Markdown")
    except Exception as e:
        await update.message.reply_text("❌ Connection fault trying to decrypt database cores.")

# --- ENGINE: FETCH REVIEWS ---
async def handle_reviews_request(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT client_name, rating, comments FROM feedback ORDER BY id DESC LIMIT 2;")
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()

        if reviews:
            response_text = "🌟 *Recent Client Testimonials:*\n\n"
            for r in reviews:
                stars = "⭐" * r['rating']
                response_text += f"👤 *{r['client_name']}* ({stars})\n💬 \"{r['comments']}\"\n\n"
        else:
            response_text = "⭐ No reviews found inside the storage logs."

        await update.message.reply_text(response_text, parse_mode="Markdown")
    except Exception as e:
        await update.message.reply_text("❌ Unable to parse customer feedback stream.")

# --- ENGINE: CONTACT CHANNEL ---
async def handle_contact_request(update: Update, context: ContextTypes.DEFAULT_TYPE):
    contact_info = (
        "📞 *Contact Astro Souvik Directly:*\n\n"
        "💬 WhatsApp: +91 9933924535\n"
        "🌐 Website: http://localhost:5173\n"
        "🏢 Sanctuary Office: Kolkata, West Bengal, India\n\n"
        "You can drop your name and message on our website Contact form, "
        "and our team will analyze your horoscope coordinates immediately!"
    )
    await update.message.reply_text(contact_info, parse_mode="Markdown")

# --- TEXT ROUTER SWITCH MATRIX ---
async def handle_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text
    
    if text == '📰 Read Daily News' or text == '🪐 Check Latest Transit':
        await handle_news_request(update, context)
    elif text == '⭐ View Client Reviews':
        await handle_reviews_request(update, context)
    elif text == '📞 Contact Astrologer':
        await handle_contact_request(update, context)
    else:
        await update.message.reply_text("✨ Unknown planetary command array. Please click one of the menu buttons below.")

# --- MAIN EXECUTION APPLICATION ENGINE ---
def main():
    if TELEGRAM_BOT_TOKEN == "8988851177:AAEqOLWOjIzEULODYdDNAMRRX_7XUnS4kqk":
        print("❌ CRITICAL: Please paste your real token from @BotFather inside bot.py!")
        return

    print("🚀 Astro Souvik Telegram Matrix Core initiated. Polling messages live...")
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Register Handler Hooks
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_messages))

    # Start long-polling listener
    app.run_polling()

if __name__ == '__main__':
    main()
