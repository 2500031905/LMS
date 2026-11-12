
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");

    function handleRegister(e) {
        e.preventDefault();

        const users = JSON.parse(
            localStorage.getItem("eduLearnUsers") || "[]"
        );

        const exists = users.find(
            user => user.email === email
        );

        if (exists) {
            alert("Email already registered!");
            return;
        }

        const newUser = {
            name,
            email,
            password,
            role
        };

        users.push(newUser);

        localStorage.setItem(
            "eduLearnUsers",
            JSON.stringify(users)
        );

        alert("Registration successful! Please login.");
        navigate("/login");
    }

    return (
        <div className="authPage">

            <Link to="/" className="authBrand">
                EduLearn<span>.</span>
            </Link>

            <div className="authContainer">

                {/* LEFT SIDE */}
                <div className="authWelcome">

                    <span className="eyebrow">
                        START YOUR JOURNEY
                    </span>

                    <h1>
                        Join EduLearn!
                    </h1>

                    <p>
                        Create your account and take the
                        first step towards discovering
                        new skills and opportunities.
                    </p>

                    <div className="authIllustration">
                        <div className="authBook">🌱</div>

                        <div className="authFloating">
                            ✨ Start Learning
                        </div>
                    </div>

                    <h3>Your Future Begins Here.</h3>

                    <p className="authSmallText">
                        Learn at your own pace.
                        Grow with every lesson.
                    </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="authFormSection">

                    <div className="authFormHeader">
                        <h2>Create Your Account</h2>

                        <p>
                            Fill in your details to get started.
                        </p>
                    </div>

                    <form onSubmit={handleRegister}>

                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <label>Register As</label>

                        <select
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                        </select>

                        <button
                            type="submit"
                            className="btn authButton"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="authRegister">
                        Already have an account?
                        {" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                    <Link to="/" className="authBack">
                        ← Back to Home
                    </Link>

                </div>

            </div>

            <p className="authFooter">
                © 2026 EduLearn. Learn something new every day.
            </p>

        </div>
    );
}

export default Register;
