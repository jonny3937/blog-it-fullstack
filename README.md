# BlogIt - Full Stack Blog Application

A modern full-stack blog application built with React, TypeScript, Node.js, Express, and Prisma.

## Features

- User authentication and authorization
- Create, read, update, and delete blog posts
- Password strength validation
- JWT token-based authentication
- Responsive Material-UI design
- Image upload support
- User profile management

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite/PostgreSQL
- JWT Authentication
- bcrypt for password hashing
- zxcvbn for password strength validation

## Project Structure

```
├── clients/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── App.tsx         # Main application component
│   └── package.json
├── server/                  # Backend Node.js application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API route definitions
│   │   ├── generated/      # Prisma generated files
│   │   └── app.ts          # Express application setup
│   ├── prisma/             # Database schema and migrations
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd test-my-blogs
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Set up the database
```bash
npx prisma generate
npx prisma db push
```

4. Create environment variables
Create a `.env` file in the server directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

5. Install frontend dependencies
```bash
cd ../clients
npm install
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend development server
```bash
cd clients
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs (authenticated)
- `POST /api/blogs` - Create a new blog (authenticated)
- `GET /api/blogs/user` - Get user's blogs (authenticated)
- `GET /api/blogs/:id` - Get blog by ID
- `PUT /api/blogs/:id` - Update blog (authenticated)
- `DELETE /api/blogs/:id` - Delete blog (authenticated)

### User Profile
- `PATCH /api/user` - Update user profile (authenticated)
- `PATCH /api/user/password` - Change password (authenticated)

## Database Schema

### User Model
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- firstName (Optional)
- lastName (Optional)
- createdAt
- updatedAt

### Blog Model
- id (Primary Key)
- title
- synopsis
- content
- featuredImg (Optional)
- authorId (Foreign Key to User)
- createdAt
- updatedAt

## Features in Detail

### Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Password strength validation using zxcvbn
- User registration with email/username login
- Protected routes for authenticated users

### Blog Management
- Create, read, update, and delete blog posts
- Rich text content support
- Image upload functionality
- Author attribution
- Timestamp tracking

### User Interface
- Responsive Material-UI design
- Clean and modern user interface
- Form validation and error handling
- Loading states and user feedback
- Navigation between pages

## Security Features

- Password strength validation
- JWT token authentication
- Protected API endpoints
- Input validation and sanitization
- CORS configuration
- Secure password hashing

## Development

### Backend Development
```bash
cd server
npm run dev
```

### Frontend Development
```bash
cd clients
npm run dev
```

### Database Management
```bash
cd server
npx prisma studio
npx prisma migrate dev
npx prisma generate
```

## Deployment

### Backend Deployment
1. Set up environment variables
2. Configure database connection
3. Build and start the server

### Frontend Deployment
1. Build the React application
2. Deploy to a static hosting service
3. Configure API endpoint URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 