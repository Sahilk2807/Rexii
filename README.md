# Rexii - Hindi AI Text-to-Speech Generator

Rexii is a modern, free, and open-source AI web app that converts Hindi text into natural-sounding speech. It uses the Hugging Face Inference API with the `sarvamai/hindi-tts` model to generate high-quality audio.

The app features a mobile-first, dark-themed UI built with Tailwind CSS, a TypeScript frontend, and a Node.js + Express backend.

 <!-- Placeholder image -->

## 🛠️ Tech Stack

- **Frontend:** HTML, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js, TypeScript
- **AI Model:** Hugging Face `sarvamai/hindi-tts` via Inference API
- **Hosting:** Railway/Render (Backend), GitHub Pages/Vercel (Frontend)

## 🎯 Features

- **Real-time TTS:** Type Hindi text and generate audio instantly.
- **Modern UI:** Sleek, dark-themed, and responsive design that works beautifully on any device.
- **Secure:** Your Hugging Face API key is kept safe on the backend and never exposed to the client.
- **Error Handling:** Gracefully handles API errors and rate limits.
- **Easy Deployment:** Ready for deployment on popular free-tier services.

---

## 🚀 Getting Started

Follow these instructions to set up, run, and deploy the project.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [GitHub](https://github.com/) account
- A [Hugging Face](https://huggingface.co/) account

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd hindi-tts-ai

### 3. Get Hugging Face API Key
Go to your Hugging Face account settings: huggingface.co/settings/tokens.
Click "New token", give it a name (e.g., hindi-tts-app), and choose the read role.
Click "Generate a token" and copy the key.



