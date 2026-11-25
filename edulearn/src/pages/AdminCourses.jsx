
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebarnew.jsx";

function AdminCourses() {
    const [courses, setCourses] = useState(() =>
        JSON.parse(localStorage.getItem("eduLearnCourses") || "[]")
    );

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [topics, setTopics] = useState("");
    const [message, setMessage] = useState("");

    function notifyAllStudents(type, course) {
        const users = JSON.parse(
            localStorage.getItem("eduLearnUsers") || "[]"
        );

        const students = users.filter(
            user => user.role?.toLowerCase() === "student"
        );

        students.forEach(student => {
            const storageKey = `eduLearnNotifications_${student.email}`;

            const notifications = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            let notificationTitle = "";
            let notificationMessage = "";

            if (type === "added") {
                notificationTitle = "New Course Available";
                notificationMessage = `${course.title} has been added to EduLearn. Explore the course and start learning!`;
            } else if (type === "edited") {
                notificationTitle = "Course Updated";
                notificationMessage = `${course.title} has been updated by faculty. Check out the latest course details.`;
            } else if (type === "deleted") {
                notificationTitle = "Course Removed";
                notificationMessage = `${course.title} has been removed from EduLearn and is no longer available.`;
            }

            const newNotification = {
                id: "n" + Date.now() + Math.random().toString(36).slice(2, 8),
                type,
                title: notificationTitle,
                message: notificationMessage,
                courseId: course.id,
                createdAt: new Date().toISOString(),
                read: false
            };

            localStorage.setItem(
                storageKey,
                JSON.stringify([newNotification, ...notifications])
            );
        });
    }

    function saveCourses(updatedCourses) {
        setCourses(updatedCourses);

        localStorage.setItem(
            "eduLearnCourses",
            JSON.stringify(updatedCourses)
        );
    }

    function clearForm() {
        setId("");
        setTitle("");
        setCategory("");
        setDescription("");
        setTopics("");
    }

    function editCourse(course) {
        setId(course.id);
        setTitle(course.title);
        setCategory(course.category);
        setDescription(course.description);
        setTopics((course.topics || []).join(", "));
        setMessage("");

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function deleteCourse(courseId) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        const deletedCourse = courses.find(
            course => course.id === courseId
        );

        const updated = courses.filter(
            course => course.id !== courseId
        );

        saveCourses(updated);

        if (deletedCourse) {
            notifyAllStudents("deleted", deletedCourse);
        }

        if (id === courseId) {
            clearForm();
        }

        setMessage("Course deleted successfully.");
    }

    function handleSubmit(e) {
        e.preventDefault();

        const isEditing = Boolean(id);

        const course = {
            id: id || "c" + Date.now(),
            title: title.trim(),
            category: category.trim(),
            description: description.trim(),
            topics: topics
                .split(",")
                .map(topic => topic.trim())
                .filter(Boolean)
        };

        let updated;
        let successMessage;

        if (isEditing) {
            updated = courses.map(item =>
                item.id === id ? course : item
            );

            successMessage = "Course updated successfully.";
        } else {
            updated = [...courses, course];

            successMessage = "Course added successfully.";
        }

        saveCourses(updated);

        notifyAllStudents(
            isEditing ? "edited" : "added",
            course
        );

        clearForm();
        setMessage(successMessage);
    }

    return (
        <div className="layout">
            <AdminSidebar />

            <main className="main">
                <section className="adminCoursesWelcome">
                    <div>
                        <span className="eyebrow">
                            FACULTY MODULE
                        </span>

                        <h1>Manage Courses</h1>

                        <p className="muted">
                            Create, update and organize learning
                            content for your students.
                        </p>
                    </div>

                    <div className="adminCoursesHeaderIcon">
                        📚
                    </div>
                </section>

                <div className="adminCourseSummary">
                    <div>
                        <span className="adminSummaryIcon">📖</span>

                        <div>
                            <strong>{courses.length}</strong>
                            <span>Total Courses</span>
                        </div>
                    </div>

                    <p>
                        Manage your teaching content and learning
                        resources from one place.
                    </p>
                </div>

                <div className="adminGrid adminCoursesGrid">
                    <section className="panel adminCourseForm">
                        <div className="adminFormHeading">
                            <div>
                                <span className="eyebrow">
                                    COURSE DETAILS
                                </span>

                                <h2>
                                    {id ? "Edit Course" : "Add New Course"}
                                </h2>
                            </div>

                            <span className="adminFormIcon">
                                {id ? "✏️" : "➕"}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label>Course Title</label>

                            <input
                                type="text"
                                placeholder="Enter course title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />

                            <label>Category</label>

                            <input
                                type="text"
                                placeholder="Example: Web Development"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                            />

                            <label>Description</label>

                            <textarea
                                rows="4"
                                placeholder="Write a short course description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />

                            <label>Topics</label>

                            <input
                                type="text"
                                placeholder="HTML, CSS, Flexbox"
                                value={topics}
                                onChange={e => setTopics(e.target.value)}
                            />

                            <small className="adminFieldHint">
                                Separate each topic using a comma.
                            </small>

                            <div className="formButtons">
                                <button className="btn" type="submit">
                                    {id ? "Update Course" : "Save Course"}
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

                            {message && (
                                <p className="message">
                                    {message}
                                </p>
                            )}
                        </form>
                    </section>

                    <section className="panel adminCourseList">
                        <div className="adminListHeading">
                            <div>
                                <span className="eyebrow">
                                    YOUR CONTENT
                                </span>

                                <h2>All Courses</h2>
                            </div>

                            <span className="adminListCount">
                                {courses.length} Courses
                            </span>
                        </div>

                        {courses.length === 0 ? (
                            <div className="adminCourseEmpty">
                                <span>📚</span>
                                <h3>No courses available</h3>
                                <p>Add your first course using the form.</p>
                            </div>
                        ) : (
                            <div className="adminCourseItems">
                                {courses.map(course => (
                                    <div
                                        className="adminCourseItem"
                                        key={course.id}
                                    >
                                        <div className="adminCourseItemInfo">
                                            <span className="adminCourseCategory">
                                                {course.category}
                                            </span>

                                            <h3>{course.title}</h3>

                                            <p>{course.description}</p>

                                            <span className="adminTopicCount">
                                                {(course.topics || []).length} Topics
                                            </span>
                                        </div>

                                        <div className="rowActions">
                                            <button
                                                className="btn light small"
                                                type="button"
                                                onClick={() => editCourse(course)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn danger small"
                                                type="button"
                                                onClick={() => deleteCourse(course.id)}
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

export default AdminCourses;
