import React, { useMemo, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../professional.css';

const initialSuppliers = [
  {
    id: 1,
    name: 'TechSource India',
    contact: 'Rahul Sharma',
    email: 'rahul@techsource.in',
    phone: '+91 9876543210',
    category: 'Electronics',
    status: 'Active',
    city: 'Hyderabad',
  },
  {
    id: 2,
    name: 'Vision Displays',
    contact: 'Priya Verma',
    email: 'priya@visiondisplays.in',
    phone: '+91 9123456780',
    category: 'Monitors',
    status: 'Active',
    city: 'Bengaluru',
  },
  {
    id: 3,
    name: 'OfficeGear Wholesale',
    contact: 'Amit Kumar',
    email: 'amit@officegear.in',
    phone: '+91 9988776655',
    category: 'Accessories',
    status: 'Inactive',
    city: 'Chennai',
  },
];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [message, setMessage] = useState('');

  const filtered = useMemo(() => {
    return suppliers.filter((s) => {
      const search = `${s.name} ${s.contact} ${s.city}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return search && (status === 'All' || s.status === status);
    });
  }, [suppliers, query, status]);

  const removeSupplier = (id) => {
    if (!window.confirm('Delete this supplier?')) return;

    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    setMessage('Supplier removed successfully.');
  };

  return (
    <DashboardLayout>
      <section className="page-section">
        <div className="page-header">
          <div>
            <h1>Suppliers</h1>
            <p>Manage vendors, suppliers, and procurement contacts.</p>
          </div>

          <button className="primary-btn">+ Add Supplier</button>
        </div>

        {message && <div className="notice success">{message}</div>}

        <div className="toolbar-card">
          <div className="toolbar-left">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search supplier, contact or city"
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
            <h3>Supplier Directory</h3>
            <span>{filtered.length} suppliers</span>
          </div>

          <div className="table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="product-cell">
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: '#22C55E',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          {s.name[0]}
                        </div>

                        <div>
                          <strong>{s.name}</strong>
                          <small>Preferred vendor</small>
                        </div>
                      </div>
                    </td>

                    <td>{s.contact}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>{s.category}</td>
                    <td>{s.city}</td>

                    <td>
                      <span
                        className={
                          s.status === 'Active'
                            ? 'badge success'
                            : 'badge danger'
                        }
                      >
                        {s.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button className="table-btn edit">View</button>
                        <button className="table-btn edit">Edit</button>
                        <button
                          className="table-btn delete"
                          onClick={() => removeSupplier(s.id)}
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
                      No suppliers found.
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