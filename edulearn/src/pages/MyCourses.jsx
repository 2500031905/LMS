
import { Link } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function MyCourses() {
    const user = JSON.parse(
        localStorage.getItem("eduLearnCurrentUser") || "null"
    );

    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const enrollments = JSON.parse(
        localStorage.getItem(
            `eduLearnEnrollments_${user?.email}`
        ) || "[]"
    );

    const progress = JSON.parse(
        localStorage.getItem(
            `eduLearnProgress_${user?.email}`
        ) || "{}"
    );

    const myCourses = courses.filter(course =>
        enrollments.includes(course.id)
    );

    return (
        <div className="layout">

            <StudentSidebar />

            <main className="main">

                {/* PAGE HEADER */}
                <div className="myCoursesWelcome">

                    <div>
                        <span className="eyebrow">
                            YOUR LEARNING SPACE
                        </span>

                        <h1>My Learning</h1>

                        <p className="muted">
                            Welcome back, {user?.name || "Student"}!
                            Keep learning and growing every day.
                        </p>
                    </div>

                    <div className="myCoursesIcon">
                        🎓
                    </div>

                </div>

                {/* SUMMARY */}
                <div className="panel myCoursesSummary">

                    <div>
                        <span className="eyebrow">
                            LEARNING OVERVIEW
                        </span>

                        <h2>My Enrolled Courses</h2>

                        <p className="muted">
                            You are currently enrolled in{" "}
                            <strong>{myCourses.length}</strong>{" "}
                            courses.
                        </p>
                    </div>

                    <div className="enrolledCount">
                        {myCourses.length}
                        <span>Courses</span>
                    </div>

                </div>

                {/* COURSE LIST */}
                {myCourses.length === 0 ? (

                    <div className="panel emptyState myCoursesEmpty">

                        <div style={{ fontSize: "55px" }}>
                            📖
                        </div>

                        <h2>No Courses Yet</h2>

                        <p>
                            Your learning journey is waiting!
                            Explore our courses and enroll in
                            something interesting.
                        </p>

                        <Link to="/courses" className="btn">
                            Explore Courses →
                        </Link>

                    </div>

                ) : (

                    <section className="myCoursesSection">

                        <div className="sectionHeading">
                            <div>
                                <h2>Your Courses</h2>

                                <p className="muted">
                                    Pick up right where you left off.
                                </p>
                            </div>
                        </div>

                        <div className="courseGrid">

                            {myCourses.map((course, index) => {

                                const value = Math.min(
                                    100,
                                    Math.max(
                                        0,
                                        Number(progress[course.id]) || 0
                                    )
                                );

                                return (

                                    <div
                                        className="courseCard myCourseCard"
                                        key={course.id}
                                    >

                                        <div className={`courseIcon icon${index % 3}`}>
                                            {index % 3 === 0
                                                ? "💻"
                                                : index % 3 === 1
                                                ? "⚡"
                                                : "🐍"}
                                        </div>

                                        <span className="courseCategory">
                                            {course.category}
                                        </span>

                                        <h3>{course.title}</h3>

                                        <p>{course.description}</p>

                                        {/* PROGRESS */}
                                        <div className="myProgressHeader">
                                            <strong>Course Progress</strong>

                                            <strong>{value}%</strong>
                                        </div>

                                        <div className="progressTrack">
                                            <div
                                                className="progressFill"
                                                style={{
                                                    width: `${value}%`
                                                }}
                                            />
                                        </div>

                                        <span className="progressMessage">
                                            {value === 100
                                                ? "Course Completed! 🎉"
                                                : value === 0
                                                ? "Ready to get started?"
                                                : "Keep up the great work!"}
                                        </span>

                                        <Link
                                            to={`/course/${course.id}`}
                                            className="btn myCourseButton"
                                        >
                                            {value === 100
                                                ? "Review Course"
                                                : "Continue Learning →"}
                                        </Link>

                                    </div>

                                );
                            })}

                        </div>

                    </section>

                )}

                <div className="myCoursesBottom">
                    <Link to="/courses" className="textLink">
                        + Explore More Courses
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default MyCourses;
