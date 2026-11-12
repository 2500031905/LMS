
import { Link, useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("eduLearnCurrentUser") || "{}"
    );

    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const enrollments = JSON.parse(
        localStorage.getItem(
            `eduLearnEnrollments_${user.email}`
        ) || "[]"
    );

    const enrolledCourses = courses.filter(course =>
        enrollments.includes(course.id)
    );

    function handleLogout() {
        localStorage.removeItem("eduLearnCurrentUser");
        navigate("/login");
    }

    return (
        <div className="layout">

            <StudentSidebar />

            <main className="main">

                {/* WELCOME SECTION */}
                <div className="dashboardWelcome">

                    <div>
                        <span className="eyebrow">
                            STUDENT LEARNING SPACE
                        </span>

                        <h1>
                            Welcome back, {user.name || "Student"}! 🌿
                        </h1>

                        <p className="muted">
                            Every new skill brings you one step
                            closer to your goals. Keep learning!
                        </p>
                    </div>

                    <button
                        className="btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

                {/* STATISTICS */}
                <div className="statsGrid">

                    <div className="panel stat">
                        <span>Available Courses</span>
                        <strong>{courses.length}</strong>
                        <small>Courses to explore</small>
                    </div>

                    <div className="panel stat">
                        <span>My Enrolled Courses</span>
                        <strong>{enrolledCourses.length}</strong>
                        <small>Your learning journey</small>
                    </div>

                    <div className="panel stat">
                        <span>Learning Status</span>
                        <strong>Active</strong>
                        <small>Keep up the progress!</small>
                    </div>

                </div>

                {/* QUICK ACCESS */}
                <section className="dashboardSection">

                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                QUICK ACCESS
                            </span>

                            <h2>Continue Your Journey</h2>
                        </div>
                    </div>

                    <div className="courseGrid">

                        <div className="courseCard dashboardCard">
                            <div className="courseIcon">📚</div>

                            <h3>Explore Courses</h3>

                            <p>
                                Discover new subjects, explore
                                different courses and learn new skills.
                            </p>

                            <Link
                                to="/courses"
                                className="textLink"
                            >
                                Browse Courses →
                            </Link>
                        </div>

                        <div className="courseCard dashboardCard">
                            <div className="courseIcon icon1">🎓</div>

                            <h3>My Courses</h3>

                            <p>
                                Access your enrolled courses and
                                continue learning at your own pace.
                            </p>

                            <Link
                                to="/my-courses"
                                className="textLink"
                            >
                                View My Courses →
                            </Link>
                        </div>

                        <div className="courseCard dashboardCard">
                            <div className="courseIcon icon2">👤</div>

                            <h3>My Profile</h3>

                            <p>
                                View your personal information
                                and manage your student profile.
                            </p>

                            <Link
                                to="/profile"
                                className="textLink"
                            >
                                View Profile →
                            </Link>
                        </div>

                    </div>
                </section>

                {/* ENROLLED COURSES */}
                <section className="panel dashboardEnrolled">

                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                YOUR LEARNING
                            </span>

                            <h2>My Learning Overview</h2>
                        </div>

                        <Link
                            to="/my-courses"
                            className="textLink"
                        >
                            View All →
                        </Link>
                    </div>

                    {enrolledCourses.length > 0 ? (

                        enrolledCourses.slice(0, 3).map(course => (

                            <div
                                className="courseRow"
                                key={course.id}
                            >
                                <div>
                                    <strong>{course.title}</strong>

                                    <p className="muted">
                                        {course.category}
                                    </p>
                                </div>

                                <Link
                                    to={`/course/${course.id}`}
                                    className="btn light small"
                                >
                                    Continue
                                </Link>
                            </div>

                        ))

                    ) : (

                        <div className="emptyState">
                            <div style={{ fontSize: "35px" }}>
                                📖
                            </div>

                            <h3>No courses enrolled yet</h3>

                            <p>
                                Start exploring courses and build
                                your learning journey.
                            </p>

                            <Link
                                to="/courses"
                                className="btn"
                            >
                                Explore Courses
                            </Link>
                        </div>

                    )}

                </section>

                {/* MOTIVATION */}
                <section className="dashboardMotivation">

                    <div>
                        <span className="eyebrow">
                            A LITTLE MOTIVATION
                        </span>

                        <h2>Small Steps. Big Achievements.</h2>

                        <p>
                            Learning is a journey, not a race.
                            Stay curious, stay consistent and
                            celebrate every achievement.
                        </p>
                    </div>

                    <div className="motivationIcon">
                        🌱
                    </div>

                </section>

            </main>
        </div>
    );
}

export default Dashboard;
