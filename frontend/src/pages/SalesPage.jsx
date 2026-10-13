import React, { useMemo, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../sales.css';

const initialProducts = [
  { id: 1, name: 'Apple MacBook Pro 14', price: 185000, quantity: 12 },
  { id: 2, name: 'Logitech MX Master 3S', price: 9500, quantity: 38 },
  { id: 3, name: 'Samsung 27 Inch Monitor', price: 24500, quantity: 4 },
];

const money = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function SalesPage() {
  const [products, setProducts] = useState(initialProducts);

  const [sales, setSales] = useState([
    {
      id: 1,
      productId: 2,
      productName: 'Logitech MX Master 3S',
      quantity: 2,
      unitPrice: 9500,
      totalAmount: 19000,
      note: 'Invoice #1001',
      soldAt: new Date().toISOString(),
    },
  ]);

  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0),
    [sales]
  );

  const submit = (event) => {
    event.preventDefault();

    const product = products.find((p) => p.id === Number(productId));

    if (!product) {
      setMessage('Please select a product.');
      return;
    }

    if (Number(quantity) > product.quantity) {
      setMessage('Insufficient stock available.');
      return;
    }

    const sale = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      quantity: Number(quantity),
      unitPrice: product.price,
      totalAmount: product.price * Number(quantity),
      note,
      soldAt: new Date().toISOString(),
    };

    setSales((prev) => [sale, ...prev]);

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? { ...p, quantity: p.quantity - Number(quantity) }
          : p
      )
    );

    setMessage('Sale recorded successfully.');
    setProductId('');
    setQuantity(1);
    setNote('');
  };

  return (
    <DashboardLayout>
      <section className="sales-page">
        <div className="page-header">
          <div>
            <h1>Sales Management</h1>
            <p>Record sales and monitor revenue.</p>
          </div>
        </div>

        <div className="sales-grid">
          <form className="sale-form-card" onSubmit={submit}>
            <div className="card-header">
              <h2>Record a Sale</h2>
              <p>Stock will reduce automatically.</p>
            </div>

            {message && <div className="notice success">{message}</div>}

            <label>
              Product
              <select
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — {product.quantity} in stock
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quantity Sold
              <input
                required
                min="1"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>

            <label>
              Customer / Invoice
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Customer name or invoice number"
              />
            </label>

            <button type="submit" className="primary-btn full-width">
              Record Sale
            </button>
          </form>

          <div className="summary-card">
            <h3>Today's Summary</h3>

            <div className="summary-item">
              <span>Total Sales</span>
              <strong>{sales.length}</strong>
            </div>

            <div className="summary-item">
              <span>Revenue</span>
              <strong>{money.format(totalRevenue)}</strong>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}