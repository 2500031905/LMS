
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetailsNew.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCourses from "./pages/AdminCourses.jsx";
import AdminStudents from "./pages/AdminStudents.jsx";
import FacultyAttendance from "./pages/FacultyAttendance.jsx";
import FacultyAssignments from "./pages/FacultyAssignments.jsx";

const defaultCourses = [
    {
        id: "c1",
        title: "HTML & CSS Basics",
        category: "Web Development",
        description: "Learn the foundations of web development.",
        topics: ["HTML", "CSS", "Flexbox", "Grid"]
    },
    {
        id: "c2",
        title: "JavaScript Fundamentals",
        category: "Programming",
        description: "Learn JavaScript fundamentals and DOM concepts.",
        topics: ["Variables", "Functions", "DOM", "Events"]
    },
    {
        id: "c3",
        title: "Python for Beginners",
        category: "Programming",
        description: "Start programming using beginner-friendly Python.",
        topics: ["Data Types", "Conditions", "Loops", "Functions"]
    }
];

function getCurrentUser() {
    try {
        return JSON.parse(
            localStorage.getItem("eduLearnCurrentUser")
        );
    } catch {
        return null;
    }
}

function StudentOnly({ children }) {
    const current = getCurrentUser();

    if (!current) {
        return <Navigate to="/login" replace />;
    }

    if (current.role?.toLowerCase() !== "student") {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

function AdminOnly({ children }) {
    const current = getCurrentUser();

    if (!current) {
        return <Navigate to="/login" replace />;
    }

    const role = current.role?.toLowerCase();

    if (role !== "faculty" && role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

function App() {
    if (localStorage.getItem("eduLearnCourses") === null) {
        localStorage.setItem(
            "eduLearnCourses",
            JSON.stringify(defaultCourses)
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<StudentOnly><Dashboard /></StudentOnly>} />
                <Route path="/courses" element={<StudentOnly><Courses /></StudentOnly>} />
                <Route path="/course/:id" element={<StudentOnly><CourseDetails /></StudentOnly>} />
                <Route path="/my-courses" element={<StudentOnly><MyCourses /></StudentOnly>} />
                <Route path="/profile" element={<StudentOnly><Profile /></StudentOnly>} />

                <Route path="/admin" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
                <Route path="/admin/courses" element={<AdminOnly><AdminCourses /></AdminOnly>} />
                <Route path="/admin/students" element={<AdminOnly><AdminStudents /></AdminOnly>} />
                <Route path="/admin/attendance" element={<AdminOnly><FacultyAttendance /></AdminOnly>} />
                <Route path="/admin/assignments" element={<AdminOnly><FacultyAssignments /></AdminOnly>} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
