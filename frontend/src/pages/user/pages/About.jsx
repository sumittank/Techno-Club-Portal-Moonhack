import React from 'react';

function About() {
  return (
    // <div className="container mt-5">
    //   {/* Section Title */}
    //   <h1 className="text-center mb-4">About Techno Clubs Portal</h1>

    //   {/* Introduction Section */}
    //   <section className="mb-5">
    //     <h3>🌟 Our Mission</h3>
    //     <p>
    //       The **Techno Clubs Portal** is designed to **revolutionize** student-led 
    //       tech communities by creating a **unified digital ecosystem**. Whether you're a 
    //       student, a club admin, or a system administrator, our platform **simplifies club 
    //       management, enhances collaboration, and ensures transparency** in operations.
    //     </p>
    //   </section>

    //   {/* Core Features */}
    //   <section className="mb-5">
    //     <h3>🚀 Key Features</h3>
    //     <ul>
    //       <li><strong>📌 Unified Membership Hub:</strong> Manage multi-club enrollments with ease.</li>
    //       <li><strong>📅 Event Lifecycle Automation:</strong> Plan, execute, and analyze events effortlessly.</li>
    //       <li><strong>🧠 AI-Powered Credit System:</strong> Track student participation and contributions automatically.</li>
    //       <li><strong>🔐 Secured Resource Governance:</strong> Manage club assets and documentation securely.</li>
    //       <li><strong>📊 Intelligent Documentation:</strong> Auto-generate reports, minutes, and archives.</li>
    //       <li><strong>💬 Community Forum:</strong> Foster discussions and collaborations among tech enthusiasts.</li>
    //     </ul>
    //   </section>

    //   {/* Why It Matters */}
    //   <section className="mb-5">
    //     <h3>💡 Why It Matters</h3>
    //     <p>
    //       Many tech clubs **struggle with fragmented communication, inefficient event logistics, 
    //       and outdated management processes**. Our platform eliminates these issues by integrating 
    //       **automation, AI, and real-time analytics** into one seamless experience.
    //     </p>
    //   </section>

    //   {/* Call to Action */}
    //   <section className="text-center">
    //     <h3>🔗 Get Started Today!</h3>
    //     <p>Join the revolution in student-led tech communities. <strong>Sign up now</strong> and transform your club experience!</p>
    //     <a href="/register" className="btn btn-primary">Join Now</a>
    //   </section>
    // </div>
    <div className="container my-5 py-5 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-lg">
            {/* 📌 Section Title */}
            <h1 className="text-center mb-4 text-dark fw-bold">About Techno Clubs Portal</h1>

            {/* 🌟 Introduction Section */}
            <section className="mb-5">
                <h3 className="text-primary fw-bold">🌟 Our Mission</h3>
                <p className="text-dark fs-5">
                    The <strong>Techno Clubs Portal</strong> is designed to 
                    <strong> revolutionize</strong> student-led tech communities by creating a 
                    <strong> unified digital ecosystem</strong>. Whether you're a student, 
                    a club admin, or a system administrator, our platform 
                    <strong> simplifies club management, enhances collaboration, and ensures transparency</strong> in operations.
                </p>
            </section>

            {/* 🚀 Core Features */}
            <section className="mb-5">
                <h3 className="text-primary fw-bold">🚀 Key Features</h3>
                <ul className="list-group">
                    <li className="list-group-item border-0">
                        <strong>📌 Unified Membership Hub:</strong> Manage multi-club enrollments with ease.
                    </li>
                    <li className="list-group-item border-0">
                        <strong>📅 Event Lifecycle Automation:</strong> Plan, execute, and analyze events effortlessly.
                    </li>
                    <li className="list-group-item border-0">
                        <strong>🧠 AI-Powered Credit System:</strong> Track student participation and contributions automatically.
                    </li>
                    <li className="list-group-item border-0">
                        <strong>🔐 Secured Resource Governance:</strong> Manage club assets and documentation securely.
                    </li>
                    <li className="list-group-item border-0">
                        <strong>📊 Intelligent Documentation:</strong> Auto-generate reports, minutes, and archives.
                    </li>
                    <li className="list-group-item border-0">
                        <strong>💬 Community Forum:</strong> Foster discussions and collaborations among tech enthusiasts.
                    </li>
                </ul>
            </section>

            {/* 💡 Why It Matters */}
            <section className="mb-5">
                <h3 className="text-primary fw-bold">💡 Why It Matters</h3>
                <p className="text-dark fs-5">
                    Many tech clubs <strong>struggle with fragmented communication, inefficient event logistics, 
                    and outdated management processes</strong>. Our platform eliminates these issues by integrating 
                    <strong> automation, AI, and real-time analytics</strong> into one seamless experience.
                </p>
            </section>

            {/* 🔗 Call to Action */}
            <section className="text-center">
                <h3 className="text-primary fw-bold">🔗 Get Started Today!</h3>
                <p className="text-dark fs-5">
                    Join the revolution in student-led tech communities. <strong>Sign up now</strong> and transform your club experience!
                </p>
                <a href="/register" className="btn btn-primary fw-bold px-4 py-2">Join Now</a>
            </section>
        </div>
  );
}

export default About;
