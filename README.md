
# 🛠️ Fullstack App: Next.js + Express.js

This project contains a fullstack web application built with:

- **Frontend:** [Next.js](https://nextjs.org/) (React framework)
- **Backend:** [Express.js](https://expressjs.com/) (Node.js server framework)

---

## 📁 Project Structure

```
/frontend   → Next.js app (client)
/backend    → Express.js API (server)
```

---

## 🚀 Getting Started

### 🔧 Requirements

- Node.js v18+
- npm or yarn
- PostgreSQL (or any other DB if applicable)

---

### 📦 Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 🛠️ Environment Variables

#### `backend/.env`

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
```

#### `frontend/.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🏃 Run Locally

### ✅ Start Backend

```bash
cd backend
npm run dev
```

This runs the Express server on `http://localhost:5000`.

---

### ✅ Start Frontend

```bash
cd frontend
npm run dev
```

This starts the Next.js development server on `http://localhost:3000`.

The frontend will call API endpoints using `NEXT_PUBLIC_API_URL`.

---

## 🔄 API Proxy Setup (Optional)

To proxy API requests in development:

**`frontend/next.config.js`**


Then in frontend, call APIs like:

```js
fetch('/api/users')
```

---

## 🧪 Build & Deploy

### 🏗️ Build Frontend

```bash
cd frontend
npm run build
```

### 🏗️ Build Backend

```bash
cd backend
npm run build
```

---

## ☁️ Deployment

You can deploy:

| Layer     | Platform        |
|-----------|-----------------|
| Frontend  | [Vercel](https://vercel.com/) |
| Backend   | [Render](https://render.com/) |

Set environment variables in your deployment platform as defined in the `.env` files.

---

## 📂 Example API Route (Backend)

**`backend/routes/recommendation.js`**
```js
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }]);
});
```

---

## 👨‍💻 Author

Created by **Ernst**
