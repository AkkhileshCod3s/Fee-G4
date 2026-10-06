export function About() {
    return (
        <section className="h95" style={{ background: "var(--bg-base)", padding: "2rem" }}>
            <div style={{ maxWidth: "600px" }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>About Us</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
                    This is a React learning demo application built by the FEE-G4 group at Chitkara University.
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                    It showcases React Router, state management, localStorage persistence, 
                    protected routes, and component-based architecture.
                </p>

                <div style={{
                    marginTop: "2rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.5rem",
                }}>
                    <h3 style={{ color: "var(--accent)", marginBottom: "0.75rem", fontWeight: 600 }}>Tech Stack</h3>
                    <div className="fx fwrap gap2">
                        {["React 19", "React Router v7", "Vite 8", "LocalStorage API"].map(tech => (
                            <span key={tech} className="badge badge-blue" style={{ padding: "5px 14px", fontSize: "0.8rem" }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}