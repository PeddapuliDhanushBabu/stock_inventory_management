import { FiBox, FiGrid, FiLayers, FiShoppingBag, FiTrendingUp, FiUsers, FiTruck, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigation } from '../../navigation';

const menu = [['Overview', FiGrid], ['Products', FiBox], ['Inventory', FiLayers], ['Orders', FiShoppingBag], ['Sales', FiTrendingUp], ['Customers', FiUsers], ['Suppliers', FiTruck], ['Analytics', FiBarChart2], ['Settings', FiSettings]];

export default function Sidebar() {
  const { page, navigate } = useNavigation();
  return <aside className="sidebar"><div><div className="brand"><div className="brand-mark"><i /><i /><i /></div><span>stoq<span className="brand-dot">.</span></span></div><div className="workspace-switcher"><span className="workspace-icon">M</span><div><b>Meridian Store</b><small>Production workspace</small></div><span className="switcher-chev">⌄</span></div><p className="nav-caption">WORKSPACE</p><nav className="menu">{menu.map(([name, Icon]) => <button key={name} onClick={() => navigate(name)} className={`menu-item ${page === name ? 'active' : ''}`}><Icon /><span>{name}</span>{name === 'Orders' && <em>8</em>}</button>)}</nav></div><div className="side-bottom"><div className="upgrade-card"><span>✦</span><b>Unlock more insights</b><small>Try Stoq Pro for free.</small><button>Upgrade <span>→</span></button></div><div className="sidebar-footer"><div className="avatar">DS</div><div><strong>Dhanush S.</strong><p>Administrator</p></div><FiLogOut /></div></div></aside>;
}
