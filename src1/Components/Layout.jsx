import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MdInventory2 } from "react-icons/md";

export function Layout() {
    const navigate = useNavigate();

    return (
        <nav className="app-nav">
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.8rem", color: "gold", lineHeight: 1 }}>&#9812;</span>
                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "0.02em" }}>
                    FEE<span style={{ color: "var(--accent)" }}>-G4</span>
                </span>
            </div>

            {/* Nav links */}
            <div className="fx gap1" style={{ alignItems: "center" }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/inventory">
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <MdInventory2 /> Inventory
                    </span>
                </NavLink>
            </div>

            {/* Logout */}
            <button
                className="btn4"
                title="Logout"
                onClick={() => navigate("/login")}
                style={{ color: "var(--text-secondary)", fontSize: "1.3rem" }}
            >
                <IoMdLogOut />
            </button>
        </nav>
    );
}