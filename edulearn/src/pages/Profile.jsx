
import { Link } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function Profile() {
    const user = JSON.parse(
        localStorage.getItem("eduLearnCurrentUser") || "{}"
    );

    return (
        <div className="layout">

            <StudentSidebar />

            <main className="main">

                {/* PAGE HEADER */}
                <div className="profileWelcome">

                    <div>
                        <span className="eyebrow">
                            YOUR ACCOUNT
                        </span>

                        <h1>My Profile</h1>

                        <p className="muted">
                            View your personal information
                            and account details.
                        </p>
                    </div>

                    <div className="profileHeaderIcon">
                        👤
                    </div>

                </div>

                {/* PROFILE CARD */}
                <section className="profileMainCard">

                    <div className="profileAvatar">
                        {(user.name || "S").charAt(0).toUpperCase()}
                    </div>

                    <div className="profileIdentity">
                        <h2>{user.name || "Student"}</h2>

                        <p>{user.email || "Email not available"}</p>

                        <span className="profileRole">
                            {user.role || "Student"}
                        </span>
                    </div>

                </section>

                {/* ACCOUNT INFORMATION */}
                <section className="profileDetailsSection">

                    <div className="sectionHeading">
                        <div>
                            <span className="eyebrow">
                                PERSONAL DETAILS
                            </span>

                            <h2>Account Information</h2>
                        </div>
                    </div>

                    <div className="profileDetailsGrid">

                        <div className="panel profileDetailCard">
                            <span className="profileDetailIcon">
                                👤
                            </span>

                            <div>
                                <span className="profileLabel">
                                    Full Name
                                </span>

                                <h3>
                                    {user.name || "Not available"}
                                </h3>
                            </div>
                        </div>

                        <div className="panel profileDetailCard">
                            <span className="profileDetailIcon">
                                ✉️
                            </span>

                            <div>
                                <span className="profileLabel">
                                    Email Address
                                </span>

                                <h3>
                                    {user.email || "Not available"}
                                </h3>
                            </div>
                        </div>

                        <div className="panel profileDetailCard">
                            <span className="profileDetailIcon">
                                🎓
                            </span>

                            <div>
                                <span className="profileLabel">
                                    Account Role
                                </span>

                                <h3>
                                    {user.role || "Student"}
                                </h3>
                            </div>
                        </div>

                        <div className="panel profileDetailCard">
                            <span className="profileDetailIcon">
                                🌿
                            </span>

                            <div>
                                <span className="profileLabel">
                                    Platform
                                </span>

                                <h3>EduLearn</h3>
                            </div>
                        </div>

                    </div>

                </section>

                {/* PROFILE FOOTER */}
                <section className="profileFooter">

                    <div>
                        <h2>Keep Growing with EduLearn!</h2>

                        <p>
                            Continue exploring courses and
                            developing your skills.
                        </p>
                    </div>

                    <Link to="/courses" className="btn">
                        Explore Courses →
                    </Link>

                </section>

                <div className="profileBack">
                    <Link to="/dashboard" className="textLink">
                        ← Back to Dashboard
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default Profile;
