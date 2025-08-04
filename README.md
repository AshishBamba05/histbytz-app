# 🕰️ HistBytz

**Interactive Timeline Explorer for U.S. History**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
🔗 **Live App:** [HistBytz](https://abamba-histbytz.netlify.app)  
> 💡 For best performance, we recommend using **Google Chrome**.

---

## 📌 Overview

**HistBytz** is a React + Vite web app that helps users explore key events in U.S. history. Users can search using:

- 🔤 **Keyword search**: e.g., "civil rights", "World War"
- 📅 **Date search**: e.g., "7/4/1776", "1960s"

The app maps your input to a **relevant historical period** and a **specific U.S. event**, providing clear, concise context.

---

## 🎯 Features

- 🧠 Intelligent search by word or date
- 📆 Mapped to both general era + specific event
- ⚡ Fast and lightweight UI powered by Vite + React
- 🧭 Educational for students, teachers, and trivia lovers

---

## ⚙️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React + Vite       |
| Styling      | Tailwind CSS *(or specify)* |
| Dev Tools    | ESLint, Babel / SWC |
| Backend (Planned) | MongoDB (for dynamic event storage) |

---

## 🚀 How It Works

1. The app has **two search engines**:
   - One for **keywords**
   - One for **dates**
2. The search input is mapped to:
   - A **broad U.S. time period**
   - A **specific historical event**
3. The result includes:
   - Event name
   - Year
   - Brief description
   - Contextual notes

---

## 🧩 Vite + React Setup

This project uses [Vite](https://vitejs.dev/) for blazing-fast dev with HMR.

### 🔌 Plugins Used

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) (Babel-based)
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc) (SWC-based)

Both support **Fast Refresh** during development.

---

## ✅ Linting & TypeScript Support

If you're using TypeScript:

- Use [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) for **type-aware linting**
- Template to get started: [React TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

---

## 🖥️ Screenshots

| Home Page | Search Result |
|-----------|----------------|
| ![Home Screenshot](./assets/home.png) | ![Result Screenshot](./assets/result.png) |

> Replace `./assets/home.png` and `./assets/result.png` with your actual image paths

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/your-username/histbytz.git
cd histbytz

# Install dependencies
npm install

# Start dev server
npm run dev
