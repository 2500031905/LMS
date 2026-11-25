
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebarnew.jsx";

function AdminStudents() {
    const users = JSON.parse(
        localStorage.getItem("eduLearnUsers") || "[]"
    );

    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const students = users.filter(
        user => user.role?.toLowerCase() === "student"
    );

    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = students.filter(student =>
        `${student.name || ""} ${student.email || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function getEnrollments(email) {
        return JSON.parse(
            localStorage.getItem(
                `eduLearnEnrollments_${email}`
            ) || "[]"
        );
    }

    function getProgress(email) {
        return JSON.parse(
            localStorage.getItem(
                `eduLearnProgress_${email}`
            ) || "{}"
        );
    }

    function calculateProgress(course, progress) {
        const topics = course?.topics || [];
        const completedTopics = progress[course.id] || [];

        if (topics.length === 0) return 0;

        const completedCount = completedTopics.filter(topic =>
            topics.includes(topic)
        ).length;

        return Math.round(
            (completedCount / topics.length) * 100
        );
    }

    const selectedEnrollments = selectedStudent
        ? getEnrollments(selectedStudent.email)
        : [];

    const selectedProgress = selectedStudent
        ? getProgress(selectedStudent.email)
        : {};

    return (
        <div className="layout">
            <AdminSidebar />

            <main className="main">
                <section className="adminStudentsWelcome">
                    <div>
                        <span className="eyebrow">
                            FACULTY MODULE
                        </span>

                        <h1>Manage Students</h1>

                        <p>
                            View your students, monitor their course
                            enrollments and track their learning progress.
                        </p>
                    </div>

                    <div className="adminStudentsHeaderIcon">
                        👨‍🎓
                    </div>
                </section>

                <div className="adminStudentSummary">
                    <div className="adminStudentSummaryIcon">
                        👥
                    </div>

                    <div>
                        <strong>{students.length}</strong>
                        <span>Registered Students</span>
                    </div>
                </div>

                <section className="panel adminStudentsPanel">
                    <div className="adminStudentsHeading">
                        <div>
                            <span className="eyebrow">
                                STUDENT DIRECTORY
                            </span>

                            <h2>My Students</h2>

                            <p className="muted">
                                Search and view student account details
                                and academic progress.
                            </p>
                        </div>

                        <span className="adminStudentCount">
                            {filteredStudents.length} Students
                        </span>
                    </div>

                    <div className="adminStudentSearch">
                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="tableWrap adminStudentTableWrap">
                        <table className="adminStudentTable">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Email Address</th>
                                    <th>Enrollments</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.email}>
                                        <td>
                                            <div className="adminStudentName">
                                                <span className="adminStudentAvatar">
                                                    {(student.name || "S")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                                <strong>
                                                    {student.name || "Student"}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>{student.email}</td>

                                        <td>
                                            <span className="adminEnrollmentBadge">
                                                {getEnrollments(student.email).length}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className="btn light small"
                                                type="button"
                                                onClick={() =>
                                                    setSelectedStudent(student)
                                                }
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="adminStudentsEmpty">
                            <span>🔍</span>
                            <h3>No students found</h3>
                            <p>
                                Try searching with another name or email.
                            </p>
                        </div>
                    )}
                </section>

                {selectedStudent && (
                    <section className="panel adminSelectedStudent">
                        <div className="adminSelectedHeading">
                            <div>
                                <span className="eyebrow">
                                    STUDENT OVERVIEW
                                </span>

                                <h2>Student Details</h2>
                            </div>

                            <button
                                className="btn light small"
                                type="button"
                                onClick={() => setSelectedStudent(null)}
                            >
                                Close ✕
                            </button>
                        </div>

                        <div className="adminSelectedIdentity">
                            <div className="adminSelectedAvatar">
                                {(selectedStudent.name || "S")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>
                                <h3>{selectedStudent.name || "Student"}</h3>
                                <p>{selectedStudent.email}</p>

                                <span className="profileRole">
                                    Student Account
                                </span>
                            </div>
                        </div>

                        <div className="adminEnrolledHeading">
                            <h3>Enrolled Courses</h3>

                            <span className="adminStudentCount">
                                {selectedEnrollments.length} Courses
                            </span>
                        </div>

                        {selectedEnrollments.length === 0 ? (
                            <div className="adminStudentsEmpty">
                                <span>📚</span>
                                <h3>No enrolled courses</h3>
                                <p>
                                    This student has not enrolled
                                    in any courses yet.
                                </p>
                            </div>
                        ) : (
                            <div className="adminEnrolledCourses">
                                {selectedEnrollments.map(courseId => {
                                    const course = courses.find(
                                        item => item.id === courseId
                                    );

                                    if (!course) {
                                        return (
                                            <div
                                                className="adminEnrolledCourse"
                                                key={courseId}
                                            >
                                                <h3>Deleted course</h3>
                                                <p>Course details are unavailable.</p>
                                            </div>
                                        );
                                    }

                                    const topics = course.topics || [];
                                    const completedTopics =
                                        selectedProgress[courseId] || [];

                                    const completedCount =
                                        completedTopics.filter(topic =>
                                            topics.includes(topic)
                                        ).length;

                                    const value = calculateProgress(
                                        course,
                                        selectedProgress
                                    );

                                    return (
                                        <div
                                            className="adminEnrolledCourse"
                                            key={courseId}
                                        >
                                            <div className="adminEnrolledCourseTop">
                                                <div>
                                                    <span className="adminCourseCategory">
                                                        {course.category || "Course"}
                                                    </span>

                                                    <h3>{course.title}</h3>
                                                </div>

                                                <strong>{value}%</strong>
                                            </div>

                                            <div className="progressTrack">
                                                <span
                                                    style={{
                                                        width: `${value}%`
                                                    }}
                                                />
                                            </div>

                                            <p className="adminProgressText">
                                                {completedCount} of {topics.length} topics completed
                                            </p>

                                            <div className="adminStudentTopics">
                                                {topics.map((topic, index) => (
                                                    <div
                                                        className="adminStudentTopic"
                                                        key={`${courseId}-${index}`}
                                                    >
                                                        <span>
                                                            {completedTopics.includes(topic)
                                                                ? "☑"
                                                                : "☐"}
                                                        </span>

                                                        <span>{topic}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="adminProgressText">
                                                {value === 100
                                                    ? "Course completed! 🎉"
                                                    : "Learning progress"}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}

export default AdminStudents;
