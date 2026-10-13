import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import SalesPage from './pages/SalesPage';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { NavigationContext } from './navigation';

export default function App() {
  const [page, setPage] = useState('Overview');
  const screens = { Overview: Dashboard, Products, Inventory, Orders, Sales: SalesPage, Customers, Suppliers, Analytics: Reports, Settings };
  const Screen = screens[page] || Dashboard;
  return <NavigationContext.Provider value={{ page, navigate: setPage }}><Screen /></NavigationContext.Provider>;
}
