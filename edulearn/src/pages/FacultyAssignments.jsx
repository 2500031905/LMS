
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebarnew.jsx";

function FacultyAssignments() {
    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const [assignments, setAssignments] = useState(() =>
        JSON.parse(localStorage.getItem("eduLearnAssignments") || "[]")
    );

    const [id, setId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [message, setMessage] = useState("");

    function saveAssignments(updated) {
        setAssignments(updated);
        localStorage.setItem(
            "eduLearnAssignments",
            JSON.stringify(updated)
        );
    }

    function clearForm() {
        setId("");
        setCourseId("");
        setTitle("");
        setDescription("");
        setDeadline("");
    }

    function editAssignment(assignment) {
        setId(assignment.id);
        setCourseId(assignment.courseId);
        setTitle(assignment.title);
        setDescription(assignment.description);
        setDeadline(assignment.deadline);
        setMessage("");

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function deleteAssignment(assignmentId) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this assignment?"
        );

        if (!confirmDelete) return;

        const updated = assignments.filter(
            assignment => assignment.id !== assignmentId
        );

        saveAssignments(updated);

        if (id === assignmentId) {
            clearForm();
        }

        setMessage("Assignment deleted successfully.");
    }

    function handleSubmit(e) {
        e.preventDefault();

        const assignment = {
            id: id || "a" + Date.now(),
            courseId,
            title: title.trim(),
            description: description.trim(),
            deadline
        };

        let updated;
        let successMessage;

        if (id) {
            updated = assignments.map(item =>
                item.id === id ? assignment : item
            );

            successMessage = "Assignment updated successfully.";
        } else {
            updated = [...assignments, assignment];

            successMessage = "Assignment created successfully.";
        }

        saveAssignments(updated);
        clearForm();
        setMessage(successMessage);
    }

    function getCourseTitle(id) {
        const course = courses.find(item => item.id === id);
        return course ? course.title : "Course unavailable";
    }

    return (
        <div className="layout">
            <AdminSidebar />

            <main className="main">
                <section className="adminCoursesWelcome">
                    <div>
                        <span className="eyebrow">FACULTY MODULE</span>
                        <h1>Assignment Management</h1>
                        <p className="muted">
                            Create and organize assignments for your students.
                        </p>
                    </div>

                    <div className="adminCoursesHeaderIcon">📝</div>
                </section>

                <div className="adminCourseSummary">
                    <div>
                        <span className="adminSummaryIcon">📑</span>
                        <div>
                            <strong>{assignments.length}</strong>
                            <span>Total Assignments</span>
                        </div>
                    </div>

                    <p>Manage course assignments and submission deadlines.</p>
                </div>

                <div className="adminGrid adminCoursesGrid">
                    <section className="panel adminCourseForm">
                        <div className="adminFormHeading">
                            <div>
                                <span className="eyebrow">ASSIGNMENT DETAILS</span>
                                <h2>{id ? "Edit Assignment" : "Create Assignment"}</h2>
                            </div>

                            <span className="adminFormIcon">
                                {id ? "✏️" : "➕"}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label>Select Course</label>

                            <select
                                value={courseId}
                                onChange={e => setCourseId(e.target.value)}
                                required
                            >
                                <option value="">Choose a course</option>

                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>

                            <label>Assignment Title</label>

                            <input
                                type="text"
                                placeholder="Enter assignment title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />

                            <label>Description and Instructions</label>

                            <textarea
                                rows="5"
                                placeholder="Enter assignment instructions"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />

                            <label>Submission Deadline</label>

                            <input
                                type="date"
                                value={deadline}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={e => setDeadline(e.target.value)}
                                required
                            />

                            <div className="formButtons">
                                <button className="btn" type="submit">
                                    {id ? "Update Assignment" : "Create Assignment"}
                                </button>

                                <button
                                    className="btn light"
                                    type="button"
                                    onClick={() => {
                                        clearForm();
                                        setMessage("");
                                    }}
                                >
                                    Clear
                                </button>
                            </div>

                            {message && <p className="message">{message}</p>}
                        </form>
                    </section>

                    <section className="panel adminCourseList">
                        <div className="adminListHeading">
                            <div>
                                <span className="eyebrow">YOUR CONTENT</span>
                                <h2>All Assignments</h2>
                            </div>

                            <span className="adminListCount">
                                {assignments.length} Assignments
                            </span>
                        </div>

                        {assignments.length === 0 ? (
                            <div className="adminCourseEmpty">
                                <span>📝</span>
                                <h3>No assignments created</h3>
                                <p>Create your first assignment using the form.</p>
                            </div>
                        ) : (
                            <div className="adminCourseItems">
                                {assignments.map(assignment => (
                                    <div
                                        className="adminCourseItem"
                                        key={assignment.id}
                                    >
                                        <div className="adminCourseItemInfo">
                                            <span className="adminCourseCategory">
                                                {getCourseTitle(assignment.courseId)}
                                            </span>

                                            <h3>{assignment.title}</h3>
                                            <p>{assignment.description}</p>

                                            <span className="adminTopicCount">
                                                Deadline: {assignment.deadline}
                                            </span>
                                        </div>

                                        <div className="rowActions">
                                            <button
                                                className="btn light small"
                                                type="button"
                                                onClick={() => editAssignment(assignment)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn danger small"
                                                type="button"
                                                onClick={() => deleteAssignment(assignment.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default FacultyAssignments;
