# Eventico_frontend 🎉

This is the frontend React app for Eventico, a full-stack event management platform.
The application allows users to explore, sign up for, create, and manage events, with full authentication and responsive design.

---

## 🚀 Project Summary
The goal of this project is to build a modern, accessible frontend that interacts with a real-world backend API.
This simulates creating a real-world application like Eventbrite or Meetup, using current best practices for frontend development.

🔗 **Deployed:** [Visit deployed App here](https://eventico.netlify.app/)  


---

## 🛠 Tech Stack

- **React 18** – Frontend JavaScript library for building dynamic UIs
- **Vite** – Modern frontend build tool for fast development and optimized production builds
- **TailwindCSS** – Utility-first CSS framework for custom and responsive styling
- **Axios** – Promise-based HTTP client for communicating with the backend API
- **React Router DOM** – Declarative routing and navigation management in React apps
- **Lucide-react** / **Heroicons** – Icon libraries for clean, accessible SVG icons
- **Netlify** – Deployment platform used to host the frontend (with CI/CD support)

---

## Set up instructions
#### 1. Clone the repository:

   ```bash
git clone https://github.com/Magdaleeena/Eventico_frontend.git
cd Eventico_backend
```

#### 2. Install dependencies:
  ```bash
npm install
  ```

#### 3. Environment Variables:
Create a .env file in the root of the project:
 ```bash
VITE_API_BASE_URL=https://eventico-backend.onrender.com/api
```
Or if running locally with your backend:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 4. Run the app in development:
```
npm run dev
```

---

## Main Features

🧑‍💻 User Authentication (Sign up, Login, JWT protected routes)

🗺️ Event Browsing (View all events, filter, and sort)

🎫 Event Signup (Join and leave events)

🛠️ Profile Management (Edit profile, see events you've joined)

👑 Admin Controls (Create, edit, delete events)

📱 Responsive Design (Mobile & Desktop friendly)

♿ Accessibility Considerations (Keyboard-friendly and ARIA practices)

---

## 🔒 Security

Token-based authentication via secure JWT.

Frontend route protection — redirects unauthenticated users.

Error handling for better user experience (friendly messages).

Best practices in API calls (secured endpoints, 401/403 handling).
