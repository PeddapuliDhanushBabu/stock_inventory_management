import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../professional.css';

export default function Settings() {
  const [company, setCompany] = useState('Dhanush Enterprises');
  const [email, setEmail] = useState('admin@dhanushenterprises.com');
  const [phone, setPhone] = useState('+91 9391930238');
  const [address, setAddress] = useState('Hyderabad, Telangana');
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState('');

  const saveSettings = (e) => {
    e.preventDefault();
    setMessage('Settings saved successfully.');
  };

  return (
    <DashboardLayout>
      <section className="page-section">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Manage company information, preferences, and notifications.</p>
          </div>
        </div>

        {message && <div className="notice success">{message}</div>}

        <form className="settings-grid" onSubmit={saveSettings}>
          <div className="settings-card">
            <h3>Company Information</h3>

            <label>
              Company Name
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Phone Number
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label>
              Address
              <textarea
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>

          <div className="settings-card">
            <h3>Application Preferences</h3>

            <label>
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </label>

            <label>
              Theme
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </label>

            <div className="toggle-row">
              <div>
                <strong>Email Notifications</strong>
                <p>Receive low stock and sales alerts</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-card full-width">
            <h3>Security</h3>

            <div className="security-actions">
              <button type="button" className="secondary-btn">
                Change Password
              </button>

              <button type="button" className="secondary-btn">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>

          <div className="settings-actions full-width">
            <button type="submit" className="primary-btn">
              Save Settings
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}