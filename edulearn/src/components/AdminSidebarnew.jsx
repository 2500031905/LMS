
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("eduLearnCurrentUser");
        navigate("/login");
    }

    return (
        <aside className="sidebar">
            <h2 className="sidebarBrand">
                EduLearn Faculty
            </h2>

            <p className="sidebarLabel">
                FACULTY MENU
            </p>

            <nav className="sidebarNav">
                <NavLink to="/admin" end className="sidebarLink">
                    <span>📊</span>
                    Overview
                </NavLink>

                <NavLink to="/admin/courses" className="sidebarLink">
                    <span>📚</span>
                    Manage Courses
                </NavLink>

                <NavLink to="/admin/students" className="sidebarLink">
                    <span>👥</span>
                    Manage Students
                </NavLink>

                <NavLink to="/admin/attendance" className="sidebarLink">
                    <span>📋</span>
                    Attendance
                </NavLink>
            </nav>

            <div className="sidebarBottom">
                <div className="sidebarMessage">
                    <span>🌿</span>
                    <p>Teach. Inspire. Empower.</p>
                </div>

                <button
                    className="sidebarLogout"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;
