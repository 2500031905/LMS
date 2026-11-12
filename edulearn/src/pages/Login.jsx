
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        const users = JSON.parse(
            localStorage.getItem("eduLearnUsers") || "[]"
        );

        const user = users.find(
            item =>
                item.email === email &&
                item.password === password
        );

        if (!user) {
            alert("Invalid email or password!");
            return;
        }

        localStorage.setItem(
            "eduLearnCurrentUser",
            JSON.stringify(user)
        );

        if (user.role?.toLowerCase() === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
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
                        YOUR LEARNING JOURNEY
                    </span>

                    <h1>
                        Welcome Back!
                    </h1>

                    <p>
                        Continue where you left off.
                        Discover new opportunities, develop
                        your skills and achieve your goals
                        with EduLearn.
                    </p>

                    <div className="authIllustration">
                        <div className="authBook">📚</div>
                        <div className="authFloating">
                            ✨ Keep Growing
                        </div>
                    </div>

                    <h3>Learn. Grow. Achieve.</h3>

                    <p className="authSmallText">
                        Your future starts with what you
                        learn today.
                    </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="authFormSection">

                    <div className="authFormHeader">
                        <h2>Login to EduLearn</h2>

                        <p>
                            Enter your details to access
                            your account.
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="btn authButton"
                        >
                            Login to Account
                        </button>

                    </form>

                    <p className="authRegister">
                        Don't have an account?
                        {" "}
                        <Link to="/register">
                            Create Account
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

export default Login;
