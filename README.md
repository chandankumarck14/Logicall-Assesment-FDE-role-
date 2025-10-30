# Favorite Movies & TV Shows

A full-stack web application for managing your favorite movies and TV shows with advanced filtering, pagination, and infinite scroll.

## Tech Stack

### Frontend
- React + Vite + TypeScript
- TailwindCSS + Shadcn UI + Radix UI
- Axios for API requests
- Zod for validation

### Backend
- Node.js + Express
- MySQL + Prisma ORM
- Zod for validation
- CORS enabled

## Features

- User Authentication (Signup + Login with JWT)  
- Full CRUD operations (Create, Read, Update, Delete)  
- Filtering (Type, Year)  
- Search by title or director  
- Infinite scroll pagination  
- Protected routes  
- Responsive design  
- Form validation with Zod  
- Toast notifications  
- Delete confirmation dialogs

**Note**
While adding the url for poster make sure it is a valid link example:
https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png
because 64bit based images dont work example:
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/.............

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
   cd backend

2. **Install dependencies:**
   npm install

3. **Configure environment variables:**
   
   Create a `.env` file in the `backend/` folder:
   DATABASE_URL="mysql://root:password@localhost:3306/favorites_db"
   PORT=5000
   JWT_SECRET=your_key
   
   Replace `root`, `password`, database name, and JWT_SECRET as needed.

4. **Create the database:**
   mysql -u root -p
   CREATE DATABASE favorites_db;
   EXIT;


5. **Run Prisma migrations:**
   npm run prisma:migrate
   npm run prisma:generate

   or

   npx prisma generate
   npx prisma migrate dev --name init

6. **Start the backend server:**
   npm run dev
   Server will run on `http://localhost:5000`

**Additional**
Run npx prisma studio to view the details of user and favourite

### Frontend Setup

1. **Navigate to root folder:**

   cd frontend


2. **Install dependencies:**

   npm install

3. **Configure environment variables:**
   
   Create a `.env` file in the root folder:
   VITE_API_URL=http://localhost:5000

4. **Start the development server:**
   npm run dev
   
   Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication: `http://localhost:5000/api/auth`

### Favorites: `http://localhost:5000/api/favorites`

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}

model Favorite {
  id        Int      @id @default(autoincrement())
  title     String
  type      String
  director  String
  budget    String
  location  String
  duration  String
  year      String
  posterUrl String?
  createdAt DateTime @default(now())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}

```

## Development Commands

### Backend
```bash
npm run dev          # Start development server with auto-reload
npm start            # Start production server
npm run prisma:migrate    # Run database migrations
npm run prisma:generate   # Generate Prisma client
npm run prisma:studio     # Open Prisma Studio (GUI)
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify `DATABASE_URL` in `.env`
- Check database exists and user has permissions

### CORS Errors
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS is enabled in `backend/src/index.js`

### Prisma Issues
```bash
cd backend
npx prisma migrate reset  # Reset database and migrations
npx prisma generate       # Regenerate Prisma client
```
