
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
                <section className="adminWelcome">
                    <div>
                        <span className="eyebrow">
                            FACULTY MODULE
                        </span>

                        <h1>
                            Welcome, {current.name || "Faculty"}!
                        </h1>

                        <p>
                            Manage your courses, monitor student
                            enrollment and support your students'
                            learning journey.
                        </p>
                    </div>

                    <div className="adminWelcomeIcon">
                        🎓
                    </div>
                </section>

                <section className="adminStatsSection">
                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                FACULTY OVERVIEW
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

                <section className="adminActionsSection">
                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                FACULTY TOOLS
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
                                Add, edit and manage available courses.
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
                                View registered students and monitor
                                their course progress.
                            </span>

                            <strong className="adminActionLink">
                                Go to Students →
                            </strong>
                        </Link>
                    </div>
                </section>

                <section className="adminBottomBanner">
                    <div>
                        <h2>Empower Every Learner!</h2>

                        <p>
                            Support student growth through effective
                            teaching and course management.
                        </p>
                    </div>

                    <span>🌿</span>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;
