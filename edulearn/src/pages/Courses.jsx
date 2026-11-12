
import { Link } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function Courses() {
    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    return (
        <div className="layout">

            <StudentSidebar />

            <main className="main">

                {/* PAGE HEADER */}
                <div className="coursesWelcome">

                    <div>
                        <span className="eyebrow">
                            DISCOVER & LEARN
                        </span>

                        <h1>Explore Courses</h1>

                        <p className="muted">
                            Find something interesting to learn
                            and take the next step in your journey.
                        </p>
                    </div>

                    <div className="coursesHeaderIcon">
                        📚
                    </div>

                </div>

                {/* COURSE COUNT */}
                <div className="coursesInfo">
                    <div>
                        <h2>Available Courses</h2>
                        <p className="muted">
                            Choose a course that interests you.
                        </p>
                    </div>

                    <span className="courseCount">
                        {courses.length} Courses
                    </span>
                </div>

                {/* COURSE CARDS */}
                {courses.length > 0 ? (

                    <div className="courseGrid">

                        {courses.map((course, index) => (

                            <div
                                className="courseCard exploreCard"
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

                                {course.topics?.length > 0 && (
                                    <div className="courseTopics">
                                        {course.topics.slice(0, 3).map(
                                            (topic, topicIndex) => (
                                                <span key={topicIndex}>
                                                    {topic}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                                <Link
                                    to={`/course/${course.id}`}
                                    className="btn courseButton"
                                >
                                    View Details →
                                </Link>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="panel emptyState">
                        <div style={{ fontSize: "45px" }}>
                            📖
                        </div>

                        <h2>No Courses Available</h2>

                        <p>
                            There are no courses available right now.
                            Please check again later.
                        </p>

                    </div>

                )}

                <div className="coursesBottom">
                    <Link to="/dashboard" className="textLink">
                        ← Back to Dashboard
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default Courses;
