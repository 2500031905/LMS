
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebarnew.jsx";

function FacultyAttendance() {
    const courses = JSON.parse(
        localStorage.getItem("eduLearnCourses") || "[]"
    );

    const users = JSON.parse(
        localStorage.getItem("eduLearnUsers") || "[]"
    );

    const students = users.filter(
        user => user.role?.toLowerCase() === "student"
    );

    const [selectedCourse, setSelectedCourse] = useState("");
    const [attendanceDate, setAttendanceDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [attendance, setAttendance] = useState({});
    const [message, setMessage] = useState("");
    const [loaded, setLoaded] = useState(false);

    const enrolledStudents = students.filter(student => {
        const enrollments = JSON.parse(
            localStorage.getItem(
                `eduLearnEnrollments_${student.email}`
            ) || "[]"
        );

        return enrollments.includes(selectedCourse);
    });

    function loadAttendance() {
        if (!selectedCourse || !attendanceDate) {
            setMessage("Please select a course and date.");
            return;
        }

        const key = `eduLearnAttendance_${selectedCourse}_${attendanceDate}`;

        const savedAttendance = JSON.parse(
            localStorage.getItem(key) || "{}"
        );

        const initialAttendance = {};

        enrolledStudents.forEach(student => {
            initialAttendance[student.email] =
                savedAttendance[student.email] || "Present";
        });

        setAttendance(initialAttendance);
        setLoaded(true);
        setMessage("");
    }

    function updateAttendance(email, status) {
        setAttendance(previous => ({
            ...previous,
            [email]: status
        }));
    }

    function saveAttendance() {
        const key = `eduLearnAttendance_${selectedCourse}_${attendanceDate}`;

        localStorage.setItem(key, JSON.stringify(attendance));

        setMessage("Attendance saved successfully.");
    }

    const presentCount = Object.values(attendance).filter(
        status => status === "Present"
    ).length;

    const absentCount = Object.values(attendance).filter(
        status => status === "Absent"
    ).length;

    return (
        <div className="layout">
            <AdminSidebar />

            <main className="main">
                <section className="adminCoursesWelcome">
                    <div>
                        <span className="eyebrow">FACULTY MODULE</span>
                        <h1>Attendance Management</h1>
                        <p className="muted">
                            Record and manage student attendance.
                        </p>
                    </div>

                    <div className="adminCoursesHeaderIcon">📋</div>
                </section>

                <section className="panel">
                    <span className="eyebrow">ATTENDANCE DETAILS</span>
                    <h2>Select Course and Date</h2>

                    <div className="adminGrid">
                        <div>
                            <label>Select Course</label>

                            <select
                                value={selectedCourse}
                                onChange={e => {
                                    setSelectedCourse(e.target.value);
                                    setLoaded(false);
                                    setAttendance({});
                                    setMessage("");
                                }}
                            >
                                <option value="">Choose a course</option>

                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Attendance Date</label>

                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={e => {
                                    setAttendanceDate(e.target.value);
                                    setLoaded(false);
                                    setAttendance({});
                                    setMessage("");
                                }}
                            />
                        </div>
                    </div>

                    <button className="btn" type="button" onClick={loadAttendance}>
                        Load Students
                    </button>
                </section>

                {loaded && (
                    <>
                        <div className="adminGrid">
                            <div className="panel">
                                <span className="eyebrow">TOTAL STUDENTS</span>
                                <h2>{enrolledStudents.length}</h2>
                            </div>

                            <div className="panel">
                                <span className="eyebrow">PRESENT</span>
                                <h2>{presentCount}</h2>
                            </div>

                            <div className="panel">
                                <span className="eyebrow">ABSENT</span>
                                <h2>{absentCount}</h2>
                            </div>
                        </div>

                        <section className="panel">
                            <span className="eyebrow">STUDENT RECORDS</span>
                            <h2>Mark Attendance</h2>

                            {enrolledStudents.length === 0 ? (
                                <p className="muted">
                                    No students are enrolled in this course.
                                </p>
                            ) : (
                                <div className="tableWrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Email</th>
                                                <th>Attendance Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {enrolledStudents.map(student => (
                                                <tr key={student.email}>
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>
                                                        <select
                                                            value={attendance[student.email] || "Present"}
                                                            onChange={e =>
                                                                updateAttendance(
                                                                    student.email,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            <option value="Present">Present</option>
                                                            <option value="Absent">Absent</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <button
                                className="btn"
                                type="button"
                                onClick={saveAttendance}
                            >
                                Save Attendance
                            </button>

                            {message && <p className="message">{message}</p>}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export default FacultyAttendance;
