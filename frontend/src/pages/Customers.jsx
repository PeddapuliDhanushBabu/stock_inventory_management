import React, { useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import "../professional.css";

const initialCustomers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 9876543210",
    city: "Delhi",
    orders: 12,
    totalSpent: 145000,
    status: "Active",
  },
  {
    id: 2,
    name: "Diya Nair",
    email: "diya.nair@example.com",
    phone: "+91 9123456780",
    city: "Bengaluru",
    orders: 9,
    totalSpent: 98000,
    status: "Active",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "+91 9988776655",
    city: "Mumbai",
    orders: 5,
    totalSpent: 54000,
    status: "Inactive",
  },
];

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    return customers.filter((customer) => {
      const search = `${customer.name} ${customer.email} ${customer.city}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return search && (status === "All" || customer.status === status);
    });
  }, [customers, query, status]);

  const removeCustomer = (id) => {
    if (!window.confirm("Delete this customer?")) return;

    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    setMessage("Customer removed successfully.");
  };

  return (
    <DashboardLayout>
      <section className="page-section">
        <div className="page-header">
          <div>
            <h1>Customers</h1>
            <p>Track customer activity, purchase history, and account status.</p>
          </div>

          <button className="primary-btn">+ Add Customer</button>
        </div>

        {message && <div className="notice success">{message}</div>}

        <div className="toolbar-card">
          <div className="toolbar-left">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search customer, email or city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-card">
          <div className="table-head">
            <h3>Customer Directory</h3>
            <span>{filtered.length} customers</span>
          </div>

          <div className="table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="product-cell">
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: "#6366F1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {customer.name[0]}
                        </div>

                        <div>
                          <strong>{customer.name}</strong>
                          <small>Valued customer</small>
                        </div>
                      </div>
                    </td>

                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td>{customer.orders}</td>
                    <td>{money.format(customer.totalSpent)}</td>

                    <td>
                      <span
                        className={
                          customer.status === "Active" ? "badge success" : "badge danger"
                        }
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button className="table-btn edit">View</button>
                        <button className="table-btn edit">Edit</button>
                        <button
                          className="table-btn delete"
                          onClick={() => removeCustomer(customer.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!filtered.length && (
                  <tr>
                    <td colSpan="8" className="empty">
                      No customers found.
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
