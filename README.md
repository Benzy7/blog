# Collaborative Blog Platform (MEAN Stack)

A collaborative blogging platform built with Angular 19 and Node.js 22 using a microservice architecture. The platform supports real-time comments, role-based permissions, and article management by multiple types of users.

---

## 🧰 Technologies Used

### Frontend:
- Angular 19 (Standalone components setup)
- CSS for styling
- RxJS, Angular Forms, HttpClient

### Backend:
- Node.js 22
- Express (REST APIs per microservice)
- MongoDB with Mongoose
- JWT Authentication
- Multer for image uploads
- Socket.IO (planned for notifications)

### Architecture:
- Microservices:
  - `user-service`: Authentication and user roles
  - `article-service`: CRUD for articles & nested comment
  - `notification-service`: todo...
  - *(Gateway was skipped for simplicity in this version)*

---

## 🚀 Installation & Setup

### Prerequisites:
- Node.js v22+
- MongoDB running locally (or configure URI)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
```

### 2. Backend Setup

Each microservice is in `backend/`:

#### Common Steps:

```bash
cd backend/<microservice>
npm install
cp .env.example .env  # and fill required vars like MONGO_URI, JWT_SECRET
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend will run on: [http://localhost:4200](http://localhost:4200)

---

## 📁 Project Structure

```plaintext
blog_app/
├── backend/
│   ├── user-service/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── package.json
│   │   └── .env
│   ├── article-service/
│   └── notification-service/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # services, models, interceptors, services
│   │   │   ├── shared/      # shared UI components
│   │   │   ├── features/    # article, auth, admin modules
│   │   │   └── app.routes.ts
│   │   └── assets/
│   └── angular.json
└── README.md
```

---

## 👥 User Roles & Permissions

| Role       | Permissions                                                                 |
|------------|------------------------------------------------------------------------------|
| Reader     | View articles and comments                                                  |
| Writer     | Create articles and comment; can edit their own articles                    |
| Editor     | Edit any article                                                            |
| Admin      | Full access: manage roles, delete articles, moderate users                  |

---

## ✅ Features

- User registration & login (with refresh token)
- Role management via admin interface
- Create/edit/delete articles (based on role)
- Upload image with article
- Filter/search articles by title and tags
- View nested comments and reply
- Paginated article listing
- Real-time notification support (to be implemented)

---

## 🧠 Technical Decisions

- **Modular Angular**: Using standalone components + modular architecture for clarity.
- **No API Gateway**: Each microservice runs independently for development speed.
- **Mongoose Aggregation**: Used for performance in article queries (with comment/user joins).
- **JWT Auth**: Simple, stateless auth system.

---

## ⚙️ Environment Variables

Each service uses its own `.env`. Common variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/<service-db>
JWT_SECRET=yourSecretKey
```

---

## 🧪 Testing

- Manually tested API endpoints with Postman
- Frontend tested in browser with real user flow
- Pagination and filtering validated
- JWT expiration and role-based access enforced

---

## ✍️ Author

Khoubaib Benzayed  
Full Stack Developer — [Tunis, Tunisia]  
Languages: 🇫🇷
