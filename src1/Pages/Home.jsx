import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    return (
        <section className="h95 fyc" style={{ background: "var(--bg-base)", padding: "2rem" }}>
            <div style={{ textAlign: "center", maxWidth: "560px" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>&#9812;</div>
                <h1 style={{
                    fontSize: "2.8rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                    marginBottom: "1rem"
                }}>
                    Welcome to{" "}
                    <span style={{ color: "var(--accent)" }}>FEE-G4</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                    A React-powered inventory &amp; routing demo. Explore products, manage your inventory, and learn React concepts.
                </p>
                <div className="fx fxc gap2" style={{ flexWrap: "wrap" }}>
                    <button className="btn-primary btn2" onClick={() => navigate("/inventory")}>
                        Manage Inventory
                    </button>
                    <button className="btn2" onClick={() => navigate("/products")}>
                        View Products
                    </button>
                </div>
            </div>
        </section>
    );
}
