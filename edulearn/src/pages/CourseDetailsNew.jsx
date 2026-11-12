
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const current = JSON.parse(
        localStorage.getItem("eduLearnCurrentUser") || "null"
    );

    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const course = courses.find(item => item.id === id);

    const enrollmentKey = current
        ? `eduLearnEnrollments_${current.email}`
        : "";

    const [enrollments, setEnrollments] = useState(() =>
        JSON.parse(localStorage.getItem(enrollmentKey) || "[]")
    );

    const enrolled = enrollments.includes(id);

    function enroll() {
        if (!current) {
            navigate("/login");
            return;
        }

        if (enrolled) return;

        const updated = [...enrollments, id];

        setEnrollments(updated);

        localStorage.setItem(
            enrollmentKey,
            JSON.stringify(updated)
        );

        alert("Enrollment successful!");
    }

    return (
        <div className="layout">

            <StudentSidebar />

            <main className="main">

                <Link to="/courses" className="backLink">
                    ← Back to Courses
                </Link>

                {!course ? (

                    <div className="panel emptyState">
                        <div style={{ fontSize: "50px" }}>📚</div>

                        <h2>Course Not Found</h2>

                        <p>
                            Sorry, we couldn't find this course.
                            Explore our available courses instead.
                        </p>

                        <Link to="/courses" className="btn">
                            Explore Courses
                        </Link>
                    </div>

                ) : (

                    <>

                        {/* COURSE HERO */}
                        <section className="courseDetailHero">

                            <div className="courseDetailContent">

                                <span className="courseCategory">
                                    {course.category}
                                </span>

                                <span className="eyebrow">
                                    YOUR NEXT LEARNING ADVENTURE
                                </span>

                                <h1>{course.title}</h1>

                                <p>{course.description}</p>

                                {enrolled ? (

                                    <div>
                                        <span className="enrolledLabel">
                                            ✓ You are enrolled in this course
                                        </span>

                                        <button
                                            className="btn"
                                            onClick={() =>
                                                navigate("/my-courses")
                                            }
                                        >
                                            Go to My Courses →
                                        </button>
                                    </div>

                                ) : (

                                    <button
                                        className="btn"
                                        onClick={enroll}
                                    >
                                        Enroll Now →
                                    </button>

                                )}

                            </div>

                            <div className="courseDetailIcon">
                                📖
                            </div>

                        </section>

                        {/* COURSE INFORMATION */}
                        <section className="courseDetailSection">

                            <div className="sectionHeading">
                                <div>
                                    <span className="eyebrow">
                                        COURSE OVERVIEW
                                    </span>

                                    <h2>What You'll Learn</h2>
                                </div>
                            </div>

                            <div className="panel courseTopicsPanel">

                                <p className="muted">
                                    Explore the important topics
                                    included in this course.
                                </p>

                                <div className="detailTopicGrid">

                                    {course.topics?.length > 0 ? (

                                        course.topics.map((topic, index) => (

                                            <div
                                                className="detailTopic"
                                                key={index}
                                            >
                                                <span className="topicCheck">
                                                    ✓
                                                </span>

                                                <span>{topic}</span>
                                            </div>

                                        ))

                                    ) : (

                                        <p>
                                            Course topics will be updated soon.
                                        </p>

                                    )}

                                </div>

                            </div>

                        </section>

                        {/* BOTTOM CTA */}
                        <section className="courseDetailCTA">

                            <div>
                                <h2>
                                    Ready to Begin Learning?
                                </h2>

                                <p>
                                    Every new topic is another step
                                    towards your goals.
                                </p>
                            </div>

                            {enrolled ? (

                                <Link
                                    to="/my-courses"
                                    className="btn"
                                >
                                    Continue Learning
                                </Link>

                            ) : (

                                <button
                                    className="btn"
                                    onClick={enroll}
                                >
                                    Enroll in This Course
                                </button>

                            )}

                        </section>

                    </>

                )}

            </main>
        </div>
    );
}

export default CourseDetails;
