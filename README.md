# Eventico_frontend 🎉

This is the frontend React app for Eventico, a full-stack event management platform.
The application allows users to explore, sign up for, create, and manage events, with full authentication and responsive design.

---

## 🚀 Project Summary
The goal of this project is to build a modern, accessible frontend that interacts with a real-world backend API.
This simulates creating a real-world application like Eventbrite or Meetup, using current best practices for frontend development.

🔗 **Deployed:** [Visit]([https://eventico-backend.onrender.com/api/endpoints](https://eventico.netlify.app/))  

---

## 🛠 Tech Stack
React 18

- Vite (for lightning-fast development)
- TailwindCSS (for styling)
- Axios (for API requests)
- React Router DOM (for routing)
- Lucide-react / Heroicons (for icons)
- Netlify (for deployment)

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
