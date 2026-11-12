
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebarnew.jsx";

function AdminDashboard() {
    const current = JSON.parse(
        localStorage.getItem("eduLearnCurrentUser") || "null"
    ) || {};

    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const users = JSON.parse(
        localStorage.getItem("eduLearnUsers") || "[]"
    );

    const students = users.filter(
        user => user.role?.toLowerCase() === "student"
    );

    const totalEnrollments = students.reduce((total, student) => {
        const enrollments = JSON.parse(
            localStorage.getItem(
                `eduLearnEnrollments_${student.email}`
            ) || "[]"
        );

        return total + enrollments.length;
    }, 0);

    return (
        <div className="layout">

            <AdminSidebar />

            <main className="main">

                {/* WELCOME SECTION */}
                <section className="adminWelcome">

                    <div>
                        <span className="eyebrow">
                            ADMIN MODULE
                        </span>

                        <h1>
                            Welcome, {current.name || "Admin"}!
                        </h1>

                        <p>
                            Manage your learning platform,
                            courses and registered students.
                        </p>
                    </div>

                    <div className="adminWelcomeIcon">
                        🏫
                    </div>

                </section>

                {/* STATISTICS */}
                <section className="adminStatsSection">

                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                PLATFORM OVERVIEW
                            </span>

                            <h2>Dashboard Statistics</h2>
                        </div>
                    </div>

                    <div className="statsGrid">

                        <div className="card stat adminStatCard">
                            <div className="adminStatIcon">📚</div>

                            <span>Total Courses</span>

                            <strong>{courses.length}</strong>

                            <small>Available courses</small>
                        </div>

                        <div className="card stat adminStatCard">
                            <div className="adminStatIcon">👨‍🎓</div>

                            <span>Registered Students</span>

                            <strong>{students.length}</strong>

                            <small>Student accounts</small>
                        </div>

                        <div className="card stat adminStatCard">
                            <div className="adminStatIcon">📝</div>

                            <span>Total Enrollments</span>

                            <strong>{totalEnrollments}</strong>

                            <small>Course registrations</small>
                        </div>

                    </div>

                </section>

                {/* QUICK ACTIONS */}
                <section className="adminActionsSection">

                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                MANAGEMENT
                            </span>

                            <h2>Quick Actions</h2>
                        </div>
                    </div>

                    <div className="actionCards">

                        <Link
                            to="/admin/courses"
                            className="actionCard adminActionCard"
                        >
                            <div className="adminActionIcon">
                                📖
                            </div>

                            <b>Manage Courses</b>

                            <span>
                                Add, edit and delete courses.
                            </span>

                            <strong className="adminActionLink">
                                Go to Courses →
                            </strong>
                        </Link>

                        <Link
                            to="/admin/students"
                            className="actionCard adminActionCard"
                        >
                            <div className="adminActionIcon">
                                👥
                            </div>

                            <b>Manage Students</b>

                            <span>
                                View registered students and their progress.
                            </span>

                            <strong className="adminActionLink">
                                Go to Students →
                            </strong>
                        </Link>

                    </div>

                </section>

                {/* BOTTOM MESSAGE */}
                <section className="adminBottomBanner">
                    <div>
                        <h2>Keep EduLearn Growing!</h2>

                        <p>
                            A better learning experience starts
                            with effective course management.
                        </p>
                    </div>

                    <span>🌿</span>
                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;
