import { Link, Outlet } from 'react-router-dom';

function SidebarLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Πλοήγηση</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/customers" className="hover:text-blue-400">Πελάτες</Link>
          <Link to="/items" className="hover:text-blue-400">Είδη</Link>
          <Link to="/orders" className="hover:text-blue-400">Παραγγελίες</Link>
          <Link to="/payments" className="hover:text-blue-400">Πληρωμές</Link>
          <Link to="/customers/new" className="hover:text-blue-400">➕ Νέος Πελάτης</Link>
          <Link to="/items/new" className="hover:text-blue-400 ml-2 text-sm">➕ Νέο Είδος</Link>
          <Link to="/orders/new" className="hover:text-blue-400 ml-2 text-sm">➕ Νέα Παραγγελία</Link>
          <Link to="/payments/new" className="hover:text-blue-400 ml-2 text-sm">➕ Νέα Πληρωμή</Link>
          <Link to="/customers/search" className="hover:text-blue-400 ml-2 text-sm">🔍 Αναζήτηση Πελατών</Link>
          <Link to="/orders/list" className="hover:text-blue-400 ml-2 text-sm">🔍 Αναζήτηση Παραγγελιών</Link>
          <Link to="/payments/list" className="hover:text-blue-400 ml-2 text-sm"> 💳 Αναζήτηση Πληρωμών</Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default SidebarLayout;
