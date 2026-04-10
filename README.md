# Narayan e-Gurukul 🎓

A smart online learning platform for competitive exam preparation — JEE, NEET, CUET, SSC, and more.

---

## Pages & Features

| Page | Description |
|------|-------------|
| `index.html` | Home page with hero carousel, stats, courses, exam calendar |
| `courses.html` | All available courses listing |
| `login.html` / `register.html` | Student authentication |
| `admin-login.html` | Admin panel login |
| `student-dashboard.html` | Student dashboard after login |
| `student-profile.html` | Student profile details |
| `student-details.html` | Admin view of student info |
| `my-batches.html` | Enrolled batches for a student |
| `batch-details.html` | Details of a specific batch |
| `schedule.html` | Class schedule |
| `performance.html` | Student performance tracker |
| `study-material.html` | Study resources hub |
| `library.html` | Digital library |
| `bookshelf.html` | Saved/bookmarked materials |
| `favorites.html` | Favorite content |
| `pyq-archive.html` | Previous Year Questions archive |
| `rank-predictor.html` | Rank prediction tool |
| `jee-syllabus.html` / `neet-syllabus.html` / `cuet-syllabus.html` / `board-syllabus.html` | Exam syllabi |
| `jee-materials.html` / `neet-materials.html` / `btech-materials.html` | Subject-wise materials |
| `enroll-jee.html` / `enroll-neet.html` / `enroll-cuet.html` / `enroll-ssc.html` | Enrollment forms |
| `ai-guru.js` | AI assistant integration |
| `support.html` | Help & support page |
| `app.html` | Mobile app download page |
| `forgot-password.html` | Password reset flow |

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend: Node.js + Express
- Database: MongoDB (via Mongoose)
- Icons: RemixIcon
- Fonts: Google Fonts (Outfit)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation

```bash
cd Narayan-e-Gurukul-main
npm install
```

### Run the Backend

```bash
npm start
```

Or with auto-reload:

```bash
npm run dev
```

The server starts on `http://localhost:5000`.

> On Windows you can also double-click `start-backend.bat`.

### Open the Frontend

Open `index.html` directly in your browser, or serve it with any static file server:

```bash
npx serve .
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/register` | Register a new student |
| POST | `/api/login` | Student login |
| POST | `/api/admin/login` | Admin login |
| POST | `/api/forgot-password` | Request password reset |
| POST | `/api/send-otp` | Send OTP to email |
| POST | `/api/verify-otp` | Verify OTP and login |
| POST | `/api/reset-password` | Reset password with OTP |
| GET | `/api/students` | Get all students (admin) |
| POST | `/api/students/import` | Bulk import students |

---

## Environment Variables

Create a `.env` file in the project root to override defaults:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edhills
```

---

## Project Structure

```
Narayan-e-Gurukul-main/
├── index.html          # Home page
├── server.js           # Express backend
├── package.json
├── ai-guru.js          # AI assistant
├── start-backend.bat   # Windows quick-start
├── *.html              # All frontend pages
└── .github/            # GitHub workflows
```

---

## License

This project is for educational purposes.
