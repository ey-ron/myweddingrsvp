# 💍 Elegant Wedding Save the Date & RSVP

A luxury, editorial-grade, fully responsive wedding "Save the Date" website with real-time Supabase guest RSVP management.

Designed to deliver a seamless, high-end guest experience on mobile devices, tablets, and desktop displays with zero layout clipping or overlap.

---

## ✨ Features

- **Luxury Editorial Design**: Timeless typography featuring *Playfair Display*, *Alex Brush* calligraphy accents, and *Plus Jakarta Sans*, balanced with a warm ivory, linen, and champagne palette.
- **Flawless Responsive UX**: Tested across mobile (iPhone/Android), tablet (iPad portrait/landscape), and laptop/desktop screens.
- **Supabase RSVP Integration**:
  - Separate fields for **First Name** and **Surname**.
  - **Guest Count Tracker**: Allows guests to specify how many additional guests they are bringing with them.
  - Attendance toggle (Joyfully Accept / Regretfully Decline).
  - Dietary restrictions, song requests, and notes to the couple.
  - Contact information (Email / Phone).
  - Row Level Security (RLS) enabled so guest information remains strictly private.
- **Celebration & Micro-interactions**:
  - Live wedding day countdown timer (Days, Hours, Minutes, Seconds).
  - Golden confetti celebration on RSVP submission.
  - 1-click **Add to Google Calendar** and **Download Apple / Outlook (.ics)** button.
  - Interactive event timeline (Ceremony, Aperitivo, Dinner, Dancing) and venue map integration.
- **Centralized Wedding Configuration**: Edit couple names, date, venue, dress code, and schedule in one place (`src/config/wedding.ts`).
- **Zero-Crash Preview Mode**: If Supabase keys aren't added yet, the app works seamlessly in preview mode so you can preview and test immediately.

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (Ultra-fast build and HMR)
- **Tailwind CSS** (Custom luxury color tokens, typography, and responsive utilities)
- **Supabase JS Client** (`@supabase/supabase-js`)
- **Lucide Icons**
- **Canvas Confetti**

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Navigate to the project directory
cd wedding-save-the-date

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Visit the local URL shown in your terminal (usually `http://localhost:5173`).

---

## 🗄️ Supabase Setup (3 Minutes)

### Step 1: Create Table & Security Rules
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project (or create a new free one).
3. In the left sidebar, click on **SQL Editor** -> **New Query**.
4. Copy and paste the contents of [`supabase_schema.sql`](./supabase_schema.sql) and click **Run**.

This will automatically create:
- The `rsvp_responses` table (with `first_name`, `surname`, `attending`, `additional_guests`, etc.).
- Performance indices for quick filtering.
- Safe **Row Level Security (RLS)** policies allowing guests to submit an RSVP without exposing any other guests' data.

### Step 2: Connect Your API Keys
1. In Supabase, go to **Project Settings** (gear icon) -> **API**.
2. Copy your **Project URL** and **anon / public** key.
3. In your project root, open or create `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

4. Restart your dev server (`npm run dev`). Your RSVPs will now save directly into Supabase!

---

## 🎨 Customizing for Your Wedding

Open [`src/config/wedding.ts`](./src/config/wedding.ts) to customize:
- `couple`: Couple names, initials, monogram.
- `date`: Wedding date, time, and calendar title.
- `venue`: Venue name, full address, and Google Maps link.
- `schedule`: Event timeline (Ceremony, Cocktails, Dinner, Party).
- `dressCode`: Attire description and advice.
- `notes`: RSVP deadline and hotel room blocks.

---

## 🚢 GitHub & Deployment Guide

See the step-by-step instructions in the terminal/chat to push to GitHub and deploy live for free via Vercel or Netlify.
