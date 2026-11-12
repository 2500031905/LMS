
import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("eduLearnCurrentUser");
        navigate("/login");
    }

    return (
        <aside className="sidebar">

            <h2 className="sidebarBrand">
                EduLearn
            </h2>

            <p className="sidebarLabel">
                STUDENT MENU
            </p>

            <nav className="sidebarNav">

                <NavLink to="/dashboard" className="sidebarLink">
                    <span>🏠</span>
                    Dashboard
                </NavLink>

                <NavLink to="/courses" className="sidebarLink">
                    <span>📚</span>
                    Explore Courses
                </NavLink>

                <NavLink to="/my-courses" className="sidebarLink">
                    <span>🎓</span>
                    My Courses
                </NavLink>

                <NavLink to="/profile" className="sidebarLink">
                    <span>👤</span>
                    My Profile
                </NavLink>

            </nav>

            <div className="sidebarBottom">

                <div className="sidebarMessage">
                    <span>🌱</span>
                    <p>Keep learning. Keep growing.</p>
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

export default StudentSidebar;
