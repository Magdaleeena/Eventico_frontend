# Eventico Frontend 🎉

Welcome to the frontend of **Eventico**, a modern full-stack event management platform.  

This React application allows users to browse, sign up for, create, and manage events. It features full authentication, responsive design, and seamless integration with the Eventico backend API.

---

## 🚀 Project Summary
Eventico Frontend delivers an interactive and accessible user experience by consuming a RESTful backend API.
Built with **React**, **Vite**, and **TailwindCSS**, it follows modern frontend best practices to simulate real-world platforms like Eventbrite or Meetup.

🔗 **Deployed App:** [Visit Eventico](https://eventico.netlify.app/)  


---

## 🛠 Tech Stack

- **React 18** – Component-based UI library for building fast and dynamic interfaces
- **Vite** – Modern frontend build tool for fast development and optimised production builds
- **TailwindCSS** – Utility-first CSS framework for custom and responsive styling
- **Axios** – HTTP client for interacting with the backend API
- **React Router DOM** – Client-side routing and navigation
- **Lucide-react** / **Heroicons** – Accessible, scalable icon libraries
- **Netlify** – CI/CD deployment and hosting platform

---

## ⚙️ Setup instructions
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
Create a `.env file` in the root of the project:
 ```bash
VITE_API_BASE_URL=https://eventico-backend.onrender.com/api
```
> 💡**Note:** For local development with a locally running backend, use:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 4. Run the app in development:
```
npm run dev
```

---

## 📱Main Features

- 🧑‍💻 **User Authentication** – Sign up, log in, and access protected routes using JWT

- 🗺️ **Event Browsing** – View all events with support for filtering and sorting

- 🎫 **Event Signup** – Join or leave events with real-time updates

- 🛠️ **Profile Management** – Edit user profile and view joined events
  
- 🧹 **Delete Account** – Users can permanently delete their profile and all associated data

- 👑 **Admin Controls** – Create, update, and delete events (admin only)

- 📱 **Responsive Design** – Optimised layout for mobile and desktop screens

- ♿ **Accessibility Considerations** – ARIA roles, keyboard navigation, and semantic HTML

---

## 🔒 Security

- 🔐 **Token-Based Authentication** – Secure user sessions using JWTs for stateless authentication
  
- 🛡️ **Protected Routes** – Restrict access to authenticated users using client-side route guards

- ⚠️ **Error Handling** – Display user-friendly messages for authentication and authorisation errors (e.g., 401 Unauthorised, 403 Forbidden)
  
- ✅ **Secure API Communication** – Attach JWTs to Axios requests via Authorisation headers for authenticated API communication

---

## 📝 Notes
- This frontend depends on the Eventico Backend for data and authentication.

- For full functionality, ensure the backend is running or deployed properly.

- Deployment handled via **Netlify** with automatic CI/CD on push.

