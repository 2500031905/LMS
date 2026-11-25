
import { useState } from "react";
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

    const progressKey = `eduLearnProgress_${user?.email}`;

    const [completedTopics, setCompletedTopics] = useState(() =>
        JSON.parse(localStorage.getItem(progressKey) || "{}")
    );

    const myCourses = courses.filter(course =>
        enrollments.includes(course.id)
    );

    function toggleTopic(courseId, topic) {
        const currentTopics = completedTopics[courseId] || [];

        const updatedTopics = currentTopics.includes(topic)
            ? currentTopics.filter(item => item !== topic)
            : [...currentTopics, topic];

        const updatedProgress = {
            ...completedTopics,
            [courseId]: updatedTopics
        };

        setCompletedTopics(updatedProgress);

        localStorage.setItem(
            progressKey,
            JSON.stringify(updatedProgress)
        );
    }

    function getProgress(course) {
        const topics = course.topics || [];

        if (topics.length === 0) return 0;

        const completed = completedTopics[course.id] || [];

        return Math.round(
            (completed.filter(topic => topics.includes(topic)).length /
                topics.length) * 100
        );
    }

    return (
        <div className="layout">
            <StudentSidebar />

            <main className="main">
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
                                const topics = course.topics || [];
                                const completed = completedTopics[course.id] || [];
                                const value = getProgress(course);

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

                                        <div className="topicChecklist">
                                            <h4>Course Topics</h4>

                                            {topics.length === 0 ? (
                                                <p>No topics added yet.</p>
                                            ) : (
                                                topics.map((topic, topicIndex) => (
                                                    <label
                                                        key={`${course.id}-${topicIndex}`}
                                                        className="topicCheckbox"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={completed.includes(topic)}
                                                            onChange={() =>
                                                                toggleTopic(course.id, topic)
                                                            }
                                                        />

                                                        <span>{topic}</span>
                                                    </label>
                                                ))
                                            )}

                                            <p className="topicCount">
                                                {completed.filter(topic =>
                                                    topics.includes(topic)
                                                ).length} of {topics.length} topics completed
                                            </p>
                                        </div>

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
