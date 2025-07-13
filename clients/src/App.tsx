import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BlogView from "./pages/BlogView";
import BlogEdit from "./pages/BlogEdit";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import ForgetPassword from "./pages/ForgetPassword";
import BlogForm from "./components/BlogForm";

export default function App() {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/profile" ||
    (location.pathname.startsWith("/blogs/") &&
      /^\/blogs\/\d+$/.test(location.pathname)) ||
    location.pathname === "/blogs/new" ||
    location.pathname.startsWith("/blogs/edit");

  return (
    <AuthProvider>
      {!hideHeader && location.pathname !== "/blogs" && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/blogs/new" element={<BlogForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blogs/edit/:id" element={<BlogEdit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </AuthProvider>
  );
}
