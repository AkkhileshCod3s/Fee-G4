import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const STORAGE_KEY = "g4_inventory";

const EMPTY_FORM = { id: "", category: "", brand: "", price: "" };

export function Inventory() {
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const [form, setForm]     = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);
    const [error, setError]   = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError("");
    }

    function handleAdd() {
        if (!form.id.trim() || !form.category.trim() || !form.brand.trim() || !form.price.trim()) {
            setError("All fields are required.");
            return;
        }
        if (editId !== null) {
            setProducts(prev =>
                prev.map(p => p._key === editId ? { ...form, _key: editId } : p)
            );
            setEditId(null);
        } else {
            setProducts(prev => [...prev, { ...form, _key: Date.now() }]);
        }
        setForm(EMPTY_FORM);
        setError("");
    }

    function handleEdit(product) {
        setForm({ id: product.id, category: product.category, brand: product.brand, price: product.price });
        setEditId(product._key);
        setError("");
    }

    function handleDelete(key) {
        setProducts(prev => prev.filter(p => p._key !== key));
        if (editId === key) { setForm(EMPTY_FORM); setEditId(null); }
    }

    return (
        <div style={{ minHeight: "calc(100dvh - 5rem)", background: "var(--bg-base)", padding: "1.5rem" }}>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>

                {/* ── Left: Add Product Form ── */}
                <div style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "1.5rem",
                    minWidth: "220px",
                    width: "260px",
                    flexShrink: 0,
                }}>
                    <h3 style={{ color: "var(--text-primary)", fontWeight: 600, marginBottom: "1rem", fontSize: "1rem" }}>
                        {editId ? "Edit Product" : "Add Product"}
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        <input
                            name="id"
                            value={form.id}
                            onChange={handleChange}
                            placeholder="Id"
                            disabled={editId !== null}
                            style={inputStyle}
                        />
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Category"
                            style={inputStyle}
                        />
                        <input
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            placeholder="Brand"
                            style={inputStyle}
                        />
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            style={inputStyle}
                        />

                        {error && <p style={{ color: "#f66", fontSize: "0.78rem", margin: 0 }}>{error}</p>}

                        <button
                            onClick={handleAdd}
                            style={{
                                marginTop: "0.3rem",
                                background: "hsl(140, 60%, 35%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "7px 22px",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                width: "fit-content",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={e => e.target.style.background = "hsl(140,60%,28%)"}
                            onMouseLeave={e => e.target.style.background = "hsl(140,60%,35%)"}
                        >
                            {editId ? "Update" : "Add"}
                        </button>
                    </div>
                </div>

                {/* ── Right: List of Products ── */}
                <div style={{
                    flex: 1,
                    minWidth: "300px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}>
                    <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
                        <h3 style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1rem" }}>
                            List of Products ({products.length})
                        </h3>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                {["id", "Category", "Brand", "Price/-", ""].map((h, i) => (
                                    <th key={i} style={{
                                        padding: "9px 14px",
                                        textAlign: "left",
                                        color: "var(--text-secondary)",
                                        fontWeight: 600,
                                        fontSize: "0.8rem",
                                        background: "var(--bg-surface)",
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                                        No products yet. Add your first product.
                                    </td>
                                </tr>
                            ) : (
                                products.map((p, idx) => (
                                    <tr key={p._key} style={{ borderBottom: "1px solid var(--border)" }}
                                        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                    >
                                        <td style={{ padding: "9px 14px", color: "var(--text-muted)", width: "2.5rem" }}>{idx + 1}</td>
                                        <td style={{ padding: "9px 14px", color: "var(--text-primary)" }}>{p.category}</td>
                                        <td style={{ padding: "9px 14px", color: "var(--text-primary)" }}>{p.brand}</td>
                                        <td style={{ padding: "9px 14px", color: "var(--text-primary)" }}>Rs. {p.price}/-</td>
                                        <td style={{ padding: "9px 14px" }}>
                                            <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                                                <button
                                                    title="Edit"
                                                    onClick={() => handleEdit(p)}
                                                    style={iconBtnStyle("hsl(215,80%,55%)")}
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => handleDelete(p._key)}
                                                    style={iconBtnStyle("hsl(0,75%,55%)")}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    height: "34px",
    padding: "4px 10px",
    background: "hsl(225,20%,12%)",
    border: "1.5px solid hsl(140,50%,35%)",
    borderRadius: "5px",
    color: "#e0e0f0",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    outline: "none",
};

function iconBtnStyle(color) {
    return {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        background: color + "22",
        color: color,
        fontSize: "1rem",
        transition: "background 0.15s",
    };
}
