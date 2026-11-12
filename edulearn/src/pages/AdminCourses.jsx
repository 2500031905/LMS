
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
        setMessage("");
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

        const updated = courses.filter(
            course => course.id !== courseId
        );

        saveCourses(updated);

        if (id === courseId) {
            clearForm();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

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

        if (id) {
            updated = courses.map(item =>
                item.id === id ? course : item
            );
            setMessage("Course updated successfully.");
        } else {
            updated = [...courses, course];
            setMessage("Course added successfully.");
        }

        saveCourses(updated);
        clearForm();
    }

    return (
        <div className="layout">

            <AdminSidebar />

            <main className="main">

                {/* PAGE HEADER */}
                <section className="adminCoursesWelcome">

                    <div>
                        <span className="eyebrow">
                            ADMIN MODULE
                        </span>

                        <h1>Manage Courses</h1>

                        <p className="muted">
                            Create, update and organize courses
                            available on EduLearn.
                        </p>
                    </div>

                    <div className="adminCoursesHeaderIcon">
                        📚
                    </div>

                </section>

                {/* COURSE COUNT */}
                <div className="adminCourseSummary">

                    <div>
                        <span className="adminSummaryIcon">📖</span>

                        <div>
                            <strong>{courses.length}</strong>
                            <span>Total Courses</span>
                        </div>
                    </div>

                    <p>
                        Manage your platform's learning content
                        from one place.
                    </p>

                </div>

                {/* FORM AND COURSE LIST */}
                <div className="adminGrid adminCoursesGrid">

                    {/* ADD / EDIT FORM */}
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
                                    onClick={clearForm}
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

                    {/* COURSE LIST */}
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
