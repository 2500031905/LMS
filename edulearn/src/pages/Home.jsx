
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="homePage">

            {/* NAVIGATION */}
            <nav className="topbar">
                <Link to="/" className="brand">
                    EduLearn
                </Link>

                <div className="toplinks">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register" className="btn small">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="hero">

                <div className="heroText">
                    <span className="eyebrow">
                        YOUR LEARNING JOURNEY STARTS HERE
                    </span>

                    <h1>
                        Learn Today.
                        <br />
                        <span>Grow Tomorrow.</span>
                    </h1>

                    <p>
                        Discover new skills, explore exciting courses
                        and build the knowledge you need to achieve
                        your goals.
                    </p>

                    <div className="heroActions">
                        <Link to="/register" className="btn">
                            Get Started
                        </Link>

                        <Link to="/login" className="btn light">
                            Sign In
                        </Link>
                    </div>

                    <div className="heroStats">
                        <div>
                            <strong>Learn</strong>
                            <span>At your own pace</span>
                        </div>

                        <div>
                            <strong>Explore</strong>
                            <span>New opportunities</span>
                        </div>

                        <div>
                            <strong>Grow</strong>
                            <span>Every single day</span>
                        </div>
                    </div>
                </div>

                {/* BOOK ICON ILLUSTRATION */}
                <div className="heroArt">
                    <div className="artCircle">

                        <div className="bookIcon">
                            📚
                        </div>

                        <div className="artCard cardOne">
                            📖 Keep Learning
                        </div>

                        <div className="artCard cardTwo">
                            🌱 Keep Growing
                        </div>

                        <div className="artCard cardThree">
                            ✨ Achieve More
                        </div>

                    </div>
                </div>

            </section>

            {/* FEATURES SECTION */}
            <section className="homeCourses">

                <div className="sectionHeading">
                    <div>
                        <span className="eyebrow">
                            WHY EDULEARN
                        </span>

                        <h2>A Better Way to Learn</h2>

                        <p className="muted">
                            Everything you need to make learning
                            simple and effective.
                        </p>
                    </div>
                </div>

                <div className="courseGrid">

                    <div className="courseCard">
                        <div className="courseIcon">01</div>

                        <h3>Explore Courses</h3>

                        <p>
                            Discover courses across different
                            subjects and areas of interest.
                        </p>
                    </div>

                    <div className="courseCard">
                        <div className="courseIcon icon1">02</div>

                        <h3>Learn at Your Pace</h3>

                        <p>
                            Access your enrolled courses and
                            learn whenever you are ready.
                        </p>
                    </div>

                    <div className="courseCard">
                        <div className="courseIcon icon2">03</div>

                        <h3>Track Your Progress</h3>

                        <p>
                            Keep track of your learning journey
                            and work towards your goals.
                        </p>
                    </div>

                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="detailHero homeCTA">

                <h1>Ready to Start Learning?</h1>

                <p>
                    Take the first step towards learning something
                    new. Join EduLearn and begin your journey today.
                </p>

                <Link to="/register" className="btn">
                    Create Your Account
                </Link>

            </section>

            {/* FOOTER */}
            <footer className="homeFooter">

                <h2 className="brand">EduLearn</h2>

                <p>Learn. Grow. Achieve.</p>

                <span>
                    © 2026 EduLearn. All rights reserved.
                </span>

            </footer>

        </div>
    );
}

export default Home;
