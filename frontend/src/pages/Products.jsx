import React, { useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import "../professional.css";

const initialProducts = [
  {
    id: 1,
    name: "Apple MacBook Pro 14",
    sku: "MBP-14-2026",
    category: "Laptops",
    price: 185000,
    quantity: 12,
    reorderLevel: 5,
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=400",
  },
  {
    id: 2,
    name: "Logitech MX Master 3S",
    sku: "LOG-MX3S",
    category: "Accessories",
    price: 9500,
    quantity: 38,
    reorderLevel: 10,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
  },
  {
    id: 3,
    name: "Samsung 27 Inch Monitor",
    sku: "SAM-MON-27",
    category: "Monitors",
    price: 24500,
    quantity: 4,
    reorderLevel: 6,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
  },
];

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category || "Uncategorized"))],
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const search = `${p.name} ${p.sku} ${p.category || ""}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return (
          search &&
          (category === "All" || (p.category || "Uncategorized") === category)
        );
      }),
    [products, query, category]
  );

  const remove = (id) => {
    if (!window.confirm("Delete this product?")) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setMessage("Product deleted successfully.");
  };

  const exportCsv = () => {
    const rows = [
      ["Name", "SKU", "Category", "Price", "Quantity", "Reorder level"],
      ...filtered.map((p) => [
        p.name,
        p.sku,
        p.category || "",
        p.price,
        p.quantity,
        p.reorderLevel,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));

    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory-products.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <section className="page-section">
        <div className="page-header">
          <div>
            <h1>Products</h1>
            <p>Manage your inventory products, stock levels, and categories.</p>
          </div>

          <button className="primary-btn">+ Add Product</button>
        </div>

        {(message) && <div className="notice success">{message}</div>}

        <div className="toolbar-card">
          <div className="toolbar-left">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search name, SKU or category"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button className="secondary-btn" onClick={exportCsv}>
            Export CSV
          </button>
        </div>

        <div className="table-card">
          <div className="table-head">
            <h3>All Products</h3>
            <span>
              {filtered.length} of {products.length} products
            </span>
          </div>

          <div className="table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="product-cell">
                        <img src={p.image} alt={p.name} />

                        <div>
                          <strong>{p.name}</strong>
                          <small>Premium inventory item</small>
                        </div>
                      </div>
                    </td>

                    <td>{p.sku}</td>
                    <td>{p.category}</td>
                    <td>{money.format(p.price)}</td>
                    <td>{p.quantity}</td>

                    <td>
                      <span
                        className={
                          p.quantity <= p.reorderLevel
                            ? "badge danger"
                            : "badge success"
                        }
                      >
                        {p.quantity <= p.reorderLevel ? "Low Stock" : "In Stock"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button className="table-btn edit">Edit</button>
                        <button
                          className="table-btn delete"
                          onClick={() => remove(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!filtered.length && (
                  <tr>
                    <td colSpan="7" className="empty">
                      No matching products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}